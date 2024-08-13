---
sidebar_position: 2
---

# Teads CPU pipeline

The Teads CPU power curve CPU utilization (as a percentage) against a scaling factor that can be applied to the CPUs thermal design power to estimate the power drawn by the CPU in Watts.

The research underpinning the curve was summarized in a pair of blog posts:

[TEADS Engineering: Buildiong an AWS EC2 Carbon Emissions Dataset](https://medium.com/teads-engineering/building-an-aws-ec2-carbon-emissions-dataset-3f0fd76c98ac)
[Teads Engineering: Estimating AWS EC2 Instances Power Consumption](https://medium.com/teads-engineering/estimating-aws-ec2-instances-power-consumption-c9745e347959)

The curve has become very widely used as a general purpose utilization-to-wattage converter for CPUs, despite the fact that it does not geenralize well.

The wattage can be transformed into energy by doing the following:

1. Measure your CPU utilization
2. Determine the thermal design power of your processor
3. Determine the scaling factor for your CPU utilization by interpolating the Teads curve
4. Determine the power drawn by your CPU by multiplying your scaling factor by the CPU's thermal design power
5. Perform a unit conversion to convert power in Watts to energy in kwH
6. Scale the energy estimated for the entire chip to the portion of the chip that is actually in use.

These steps can be executed in IF using just three plugins:

- `Interpolate`
- `Multiply`
- `Divide`

We'll go through each step in the energy estimate and examine how to implement it in a manifest file using IF's standard library of `builtin`s.

## Impact Framework implementation

First, create a manifest file and add this following boilerplate code:

```yaml
name: carbon-intensity plugin demo
description:
tags:
initialize:
  plugins:
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
      defaults:
      inputs:
```

If this structure looks unfamiliar to you, you can go back to our [manifests page](../major-concepts/manifest-file.md).

### Step 1: measure CPU utilization

The first step was to measure your CPU utilization. In real use cases you would typoically do this using an importer plugin that grabs data from a monitor API or similar. However, for this example we will just manually create some dummy data. Add some timestamps, durations and cpu/utilization data to your `inputs` array, as follows:

```yaml
name: teads demo
description:
tags:
initialize:
  plugins:
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
      defaults:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 360
          cpu/utilization: 1
          carbon: 30
        - timestamp: 2023-09-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 10
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 50
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 100
```

### Step 2: Determine the thermal design power of your processor

Typically determinign the TDP of your processor would be done using a CSV lookup. We have a pipeline example for [tdp-finder](./tdp-finder.md) in these docs - combining this pipeline with the `tdp-finder` pipeline would eb a great follow on exercise after you have finished this tutorial. Foir now, we will just hartd code some TDP data into your manifest so we can focus on the CPU utilization to energy calculations. Add `thermal-design-power` to `defaults` - this is a shortcut to providing it in every timestep in your `inputs` array.

```yaml
default:
  thermal-design-power: 100
```

### Step 3: Interpolate the Teads curve

The Teads curve has CPU utilization ont he `x` axis and a scaling factor on the `y` axis. There are only four points on the published curve. Your task is to get the scaling factor for your specific CPU utilization values by interpolating between the known points. Luckily, we have a `builtin` for that purpose!

Add the `Interpolation` plugin to your list of plugins in the `initialize` block.

```yaml
initialize:
  plugins:
    interpolate:
      method Interpolation
      path: builtin
```

The details about the interpolation you want to do and the values to return are configured in the `config` whoch is also added int he `initialize block`. Specifically, you have to provide the known points of the curve you want to interpolate, the `input-parameter` (which is the `x` value whose correspondiong `y` value you want to find out, i.e. your CPU utilization value) and the `output-parameter` (the name you want to give to your retrieved `y` value).

You want to interpolate the Teads curve, so you can provide the `x` and `y` values obtained from the articles linked in the introduction section above:

```
x: [0, 10, 50, 100]
y: [0.12, 0.32, 0.75, 1.02]
```

Your `input-parameter` is your `cpu/utilization` and we'll name give the `output-parameter` the name `cpu-factor`.

Your compelted `initialize` block for `interpolate` should look as follows:

```yaml
interpolate:
  method: Interpolation
  path: 'builtin'
  config:
    method: linear
    x: [0, 10, 50, 100]
    y: [0.12, 0.32, 0.75, 1.02]
    input-parameter: 'cpu/utilization'
    output-parameter: 'cpu-factor'
```

### Step 4: Convert CPU factor to power

The interpoaltion only gave use the scaling factor; we need to apply that scaling factor to the processor's TDP to get the power drawn by the CPU at your specific CPU utilization.

To do this, we can use the `Multiply` plugin in the IF standard library. We'll give the instance of `Multiply` the name `cpu-factor-to-wattage` and int he `config` we'll define `cpu-factor` and `thermal-design-power` as the two elements in our `inputs` array that we want to multiply together. Then we'll name the result `cpu-wattage`:

```yaml
cpu-factor-to-wattage:
  method: Multiply
  path: builtin
  config:
    input-parameters: ['cpu-factor', 'thermal-design-power']
    output-parameter: 'cpu-wattage'
```

Add this to your `initialize` block.

### Step 5: Convert wattage to energy

Next we have to perform some unit conversions. Wattage is a measure of power (energy over time). To convert to energy, we can first multiply by the number of seconds our observation covers (`duration`) to yield energy in joules. Then, convert to kWh by applying a scaling factor that takes seconds to hours and watts to kilowatts.

You can do this in two steps: the first uses another instance of `Multiply` an the second uses `Divide`:

To do the initial multiplication of the CPU wattage and the observation duration, add the following config to your `initialize` block:

```yaml
wattage-times-duration:
  method: Multiply
  path: builtin
  config:
    input-parameters: ['cpu-wattage', 'duration']
    output-parameter: 'cpu-wattage-times-duration'
```

next, use the `Divide` plugin to do the unit conversion:

```yaml
wattage-to-energy-kwh:
  method: Divide
  path: 'builtin'
  config:
    numerator: cpu-wattage-times-duration
    denominator: 3600000
    output: cpu-energy-raw
```

### Step 6: Scale the energy by the allocated CPUs

The `cpu-energy-raw` value you just configured is for the entire chip. But your application probably doesn't use the entire chip. Chances are you have some number of VCPUs allocated to you that is less than the total available. So you can scale your energy estimate by the ratio of VCPUs allocated to VCPUS available.

Let's assume you know the number of VCPUs allocated and available in advance and that they are the same in every timestep. In this case, you can just add the values to `defaults` so they become available in every timestep, just as you did with `thermal-design-power`.

```yaml
defaults:
  thermal-design-power: 100
  vcpus-total: 8
  vcpus-allocated: 2
```

You need one instance of `Divide` to calculate the `vcpu-ratio` and another to apply that `vcpu-ratio` to your `cpu-energy-raw` value and yield your final result: `cpu-energy-kwh`. Add the following to your `initialize` block to achieve those steps:

```yaml
calculate-vcpu-ratio:
  method: Divide
  path: 'builtin'
  config:
    numerator: vcpus-total
    denominator: vcpus-allocated
    output: vcpu-ratio
correct-cpu-energy-for-vcpu-ratio:
  method: Divide
  path: 'builtin'
  config:
    numerator: cpu-energy-raw
    denominator: vcpu-ratio
    output: cpu-energy-kwh
```

### Step 7: Define your pipeline

Now you have configured all your plugins, covering all the stages of the calculation, you can simple define them in order in the `pipeline` section of your manifest, as follows:

```yaml
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
          - interpolate
          - cpu-factor-to-wattage
          - wattage-times-duration
          - wattage-to-energy-kwh
          - calculate-vcpu-ratio
          - correct-cpu-energy-for-vcpu-ratio
```

You also need to add some input data that your pipeline can operate over.

You can see the full manifest in the [IF repository](https://github.com/Green-Software-Foundation/if/blob/main/manifests/examples/teads-curve.yml).

That's it! Your manifest is ready to run!

## Running the manifest

Having saved your manifest as `teads-curve.yaml` you can run it using IF:

```sh
if-run -m teads-curve.yml -o teads-output.yml
```

This will yield the following output file:

```yaml
name: teads curve demo
description: null
tags: null
initialize:
  plugins:
    interpolate:
      path: builtin
      method: Interpolation
      config:
        method: linear
        x:
          - 0
          - 10
          - 50
          - 100
        'y':
          - 0.12
          - 0.32
          - 0.75
          - 1.02
        input-parameter: cpu/utilization
        output-parameter: cpu-factor
    cpu-factor-to-wattage:
      path: builtin
      method: Multiply
      config:
        input-parameters:
          - cpu-factor
          - thermal-design-power
        output-parameter: cpu-wattage
    wattage-times-duration:
      path: builtin
      method: Multiply
      config:
        input-parameters:
          - cpu-wattage
          - duration
        output-parameter: cpu-wattage-times-duration
    wattage-to-energy-kwh:
      path: builtin
      method: Divide
      config:
        numerator: cpu-wattage-times-duration
        denominator: 3600000
        output: cpu-energy-raw
    calculate-vcpu-ratio:
      path: builtin
      method: Divide
      config:
        numerator: vcpus-total
        denominator: vcpus-allocated
        output: vcpu-ratio
    correct-cpu-energy-for-vcpu-ratio:
      path: builtin
      method: Divide
      config:
        numerator: cpu-energy-raw
        denominator: vcpu-ratio
        output: cpu-energy-kwh
execution:
  command: >-
    /home/user/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /home/user/if/src/index.ts -m manifests/examples/teads-curve.yml
  environment:
    if-version: 0.3.3-beta.0
    os: linux
    os-version: 5.15.0-107-generic
    node-version: 21.4.0
    date-time: 2024-06-06T14:33:25.188Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
      - '@grnsft/if-unofficial-plugins@v0.3.1'
      - '@jest/globals@29.7.0'
      - '@types/jest@29.5.8'
      - '@types/js-yaml@4.0.9'
      - '@types/luxon@3.4.2'
      - '@types/node@20.9.0'
      - axios-mock-adapter@1.22.0
      - axios@1.7.2
      - csv-parse@5.5.6
      - csv-stringify@6.4.6
      - fixpack@4.0.0
      - gts@5.2.0
      - husky@8.0.3
      - jest@29.7.0
      - js-yaml@4.1.0
      - lint-staged@15.2.2
      - luxon@3.4.4
      - release-it@16.3.0
      - rimraf@5.0.5
      - ts-command-line-args@2.5.1
      - ts-jest@29.1.1
      - typescript-cubic-spline@1.0.1
      - typescript@5.2.2
      - winston@3.11.0
      - zod@3.22.4
  status: success
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
          - interpolate
          - cpu-factor-to-wattage
          - wattage-times-duration
          - wattage-to-energy-kwh
          - calculate-vcpu-ratio
          - correct-cpu-energy-for-vcpu-ratio
      defaults:
        thermal-design-power: 100
        vcpus-total: 8
        vcpus-allocated: 2
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 360
          cpu/utilization: 1
          carbon: 30
        - timestamp: 2023-09-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 10
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 50
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 100
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 360
          cpu/utilization: 1
          carbon: 30
          thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          cpu-factor: 0.13999999999999999
          cpu-wattage: 13.999999999999998
          cpu-wattage-times-duration: 5039.999999999999
          cpu-energy-raw: 0.0013999999999999998
          vcpu-ratio: 4
          cpu-energy-kwh: 0.00034999999999999994
        - timestamp: 2023-09-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 10
          thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          cpu-factor: 0.32
          cpu-wattage: 32
          cpu-wattage-times-duration: 11520
          cpu-energy-raw: 0.0032
          vcpu-ratio: 4
          cpu-energy-kwh: 0.0008
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 50
          thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          cpu-factor: 0.75
          cpu-wattage: 75
          cpu-wattage-times-duration: 27000
          cpu-energy-raw: 0.0075
          vcpu-ratio: 4
          cpu-energy-kwh: 0.001875
        - timestamp: 2023-10-06T00:00
          duration: 360
          carbon: 30
          cpu/utilization: 100
          thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          cpu-factor: 1.02
          cpu-wattage: 102
          cpu-wattage-times-duration: 36720
          cpu-energy-raw: 0.0102
          vcpu-ratio: 4
          cpu-energy-kwh: 0.00255
```
