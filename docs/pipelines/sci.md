---
sidebar-position: 3
---

# Software Carbon Intensity (SCI)

The [software carbon intensity (SCI)](https://greensoftware.foundation/articles/software-carbon-intensity-sci-specification-project) score is perhaps the most important value that can be generated using Impact Framework. 

SCI is an ISO-recognized standard for reporting the carbon costs of running software. This tutorial demonstrates how to organize a pipeline of Impact framework plugins to calculate SCI scores from some simple observations of the CPU utilization of a software application running in the cloud.

## Prerequisites

This tutorial builds on top of the [Teads curve](./teads.md) pipeline tutorial. That tutorial demonstrates how to organize a pipeline that converts CPOU utilization observations into CPU energy. This tutorial uses the same pipeline but goes several steps further, including converting the CPU energy estimates into carbon, adding the embodied carbon associated with the hardware being used and calculating the SCI score.

## Step 1: Pasting in the Teads pipeline

You can start by copying the manifest you created in the Teads curve tutorial into a new file called `sci.yml`. You can use that manifest as a template and build off of it here. Here's a reminder of what the file should look like:

```yaml
name: carbon-intensity plugin demo
description: 
tags:
initialize:
  plugins:
    interpolate:
      method: Interpolation
      path: 'builtin'
      global-config:
        method: linear
        x: [0, 10, 50, 100]
        y: [0.12, 0.32, 0.75, 1.02]
        input-parameter: 'cpu/utilization'
        output-parameter: 'cpu-factor'
    cpu-factor-to-wattage:
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["cpu-factor", "cpu/thermal-design-power"]
        output-parameter: "cpu-wattage"
    wattage-times-duration:
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["cpu-wattage", "duration"]
        output-parameter: "cpu-wattage-times-duration"
    wattage-to-energy-kwh:
      method: Divide
      path: "builtin"
      global-config:
        numerator: cpu-wattage-times-duration
        denominator: 3600000
        output: cpu-energy-raw
    calculate-vcpu-ratio:
      method: Divide
      path: "builtin"
      global-config:
        numerator: vcpus-total
        denominator: vcpus-allocated
        output: vcpu-ratio
    correct-cpu-energy-for-vcpu-ratio:
      method: Divide
      path: "builtin"
      global-config:
        numerator: cpu-energy-raw
        denominator: vcpu-ratio
        output: cpu-energy-kwh
tree:
  children:
    child:
      pipeline:
        - interpolate
        - cpu-factor-to-wattage
        - wattage-times-duration
        - wattage-to-energy-kwh
        - calculate-vcpu-ratio
        - correct-cpu-energy-for-vcpu-ratio
      defaults:
        cpu/thermal-design-power: 100
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
```


## Step 2: Adding a network/energy component

Your Teads curve manifest only accounted for CPU energy, but this SCI manifest will also consider the energy consumed during data ingress and egress, collectively known as "network energy". This can be calculated from data ingress and egress observations, but in this example, we will shortcut it by adding the `network/energy` value, measured in kWh, directly to the input data. You can do this by adding `network/energy` and a value to each element in the `inputs` array. This is just an example, so you can create dummy values. In a real example, these data would come from observations of a real system.

The SCI score will take into account all the energy used by the application, which in this case includes CPU energy and network energy. Therefore, you need to add a plugin that sums these components of energy together and adds the result to the `inputs` array. The `Sum` plugin exists for precisely this purpose. There are going to be multiple instances of the `Sum` plugin in your SCI pipeline, so you should choose a descriptive name for it so that you can easily invoke it in the right position in your pipeline.

Add the following to your `initialize: plugins: ` block:

```yaml
    sum-energy-components:
      path: "builtin"
      method: Sum
      global-config:
        input-parameters:
          - cpu/energy
          - network/energy
        output-parameter: energy
```

This will create an instance of `Sum` called `sum-energy-components`, and it will sum `cpu/energy` and `network/energy` and append the result to `inputs` as `energy`.



## Step 3: Account for embodied carbon

Embodied carbon is the carbon emitted during the production and disposal of the hardware used to run an application. The total embodied carbon for a unit of hardware is scaled down by the proportion of its expected lifespan used up by an application. This is all handled by another IF `builtin` called `SciEmbodied`. The result is `embodied-carbon` in units of `gCO2eq`. You can simply create an instance of it and add it to your pipeline. It requires no global configuration.

```yaml
embodied-carbon:
  path: "builtin"
  method: SciEmbodied
```


`embodied-carbon` does expect some specific values to be available in the `inputs` array. These include:

```yaml
device/emissions-embodied: # the embodied emissions for the entire component
time-reserved: # time the component is used by the application
device/expected-lifespan: # lifespan of the component in seconds
resources-reserved: # proportion of the total component being allocated
resources-total: # size of the component
```
Most of these values can be found in manufacturer documentation for specific processors and other hardware. In the present case, you can again provide some default values for a hypothetical system. You can assume the resource is a processor being used in a cloud virtual machine. In this case, the `resources-total` can be the total number of VCPUs for the processor and the `resources-allocated` can be the number of VCPUs actually being used by your application. Remembering back to the Teads curve example, you already have that information available to you in the form of the `vcpus-total` and `vcpus-allocated` fields, which you can pass by name as values to `resources-total and ` resources-reserved`.

Add the following to your `defaults` section:

```yaml
device/emissions-embodied: 1533.120 # gCO2eq
time-reserved: 3600 # 1hr in seconds
device/expected-lifespan: 94608000 # 3 years in seconds
resources-reserved: vcpus-allocated
resources-total: vcpus-total
```

## Step 4: Calculate operational carbon

So far, you have calculated the *embodied* carbon for your application, but your usage values are still expressed as units of energy. To calculate the `carbon` emissions that result from that energy consumption, you need to multiply your total energy by the carbon intensity of the electricity you consume. This value is known as the `operational-carbon`. In a real example, the grid carbon intensity could be a time-varying value that also depends on your physical location. However, here you will hardcode it for simplicity.

```yaml
grid/carbon-intensity
```

Now create an instance of `Multiply` that will calculate the product of `energy` and `grid/carbon-intensity`:

```yaml
    "operational-carbon":
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["energy", "grid/carbon-intensity"]
        output-parameter: "carbon-operational"
```


## Step 5: Sum carbon components

At this stage you have two separate sources of carbon emissions treated separately in your `inputs`: `embodied-carbon` anf `operational-carbon`. To account for the total carbon emissions for your application, you need to add these two sources together.

Add the following instance of the `Sum` plugin to your `initialize: plugins:` block. It will sum `carbon-operational` and `carbon-embodied` and append the result to `inputs` as `carbon`.

```yaml
sum-carbon:
    path: "builtin"
    method: Sum
    global-config:
    input-parameters:
        - carbon-operational
        - carbon-embodied
    output-parameter: carbon
```

## Step 6: Calculate SCI

Now you have calculated the total carbon emissions due to your application, you can move to the final step which is calculating your SCI score. This is simply the total carbon expressed in terms of some functional unit. Functional units can be measured values such as `requests`, `visits`, `users` or whatever else you want to express your carbon emissions in terms of. In this case, you will simply express your SCI in terms of the entire application, in which case you can just set the functional unit to 1.

Add an instance of the SCI plugin to your `initialize: plugins:` block as follows:


```yaml
"sci":
    path: "builtin"
    method: Sci
    global-config:
    functional-unit: "component"
```

SCI will look in each element in the `inputs` array for the `component` key. To ensure it is there, we can add it to `defaults` as follows:

```yaml
component: 1
```

Note that in a real system, you probably don't want to use `defaults` to define your functional unit unless you are sure it is constant over time. More likely, you'll have observations of some system metric in eachg timestep to use as a functional unit.

## Step 7: Create the pipeline

Now you have initialized all the plugins you will need to compute the SCI score, add them in sequence to your execution pipeline, as follows:

```yaml
pipeline:
  - interpolate
  - cpu-factor-to-wattage
  - wattage-times-duration
  - wattage-to-energy-kwh
  - calculate-vcpu-ratio
  - correct-cpu-energy-for-vcpu-ratio
  - sum-energy-components
  - embodied-carbon
  - operational-carbon
  - sum-carbon
  - sci
```

Congratulations, now you have completed your manifest and can calculate your SCI score!

## Step 8: Run your manifest

Assuming your manifest is saved as `sci/yml` you can run it using the following command:

```sh
if-run -m sci.yml
```

You will see the following data displayed in the console:

```yaml
name: sci
description: >-
  a full pipeline seeded with some hardcoded input data and yielding an SCI
  score
tags: null
initialize:
  plugins:
    interpolate:
      path: builtin
      method: Interpolation
      global-config:
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
      global-config:
        input-parameters:
          - cpu-factor
          - cpu/thermal-design-power
        output-parameter: cpu-wattage
    wattage-times-duration:
      path: builtin
      method: Multiply
      global-config:
        input-parameters:
          - cpu-wattage
          - duration
        output-parameter: cpu-wattage-times-duration
    wattage-to-energy-kwh:
      path: builtin
      method: Divide
      global-config:
        numerator: cpu-wattage-times-duration
        denominator: 3600000
        output: cpu-energy-raw
    calculate-vcpu-ratio:
      path: builtin
      method: Divide
      global-config:
        numerator: vcpus-total
        denominator: vcpus-allocated
        output: vcpu-ratio
    correct-cpu-energy-for-vcpu-ratio:
      path: builtin
      method: Divide
      global-config:
        numerator: cpu-energy-raw
        denominator: vcpu-ratio
        output: cpu/energy
    sum-energy-components:
      path: builtin
      method: Sum
      global-config:
        input-parameters:
          - cpu/energy
          - network/energy
        output-parameter: energy
    embodied-carbon:
      path: builtin
      method: SciEmbodied
    operational-carbon:
      path: builtin
      method: Multiply
      global-config:
        input-parameters:
          - energy
          - grid/carbon-intensity
        output-parameter: carbon-operational
    sum-carbon:
      path: builtin
      method: Sum
      global-config:
        input-parameters:
          - carbon-operational
          - carbon-embodied
        output-parameter: carbon
    sci:
      path: builtin
      method: Sci
      global-config:
        functional-unit: component
    time-sync:
      path: builtin
      method: TimeSync
      global-config:
        start-time: '2023-12-12T00:00:00.000Z'
        end-time: '2023-12-12T00:01:00.000Z'
        interval: 5
        allow-padding: true
execution:
  command: >-
    /home/user/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /home/user/Code/if/src/index.ts -m manifests/examples/sci.yml -o
    manifests/outputs/test
  environment:
    if-version: 0.3.3-beta.0
    os: linux
    os-version: 5.15.0-107-generic
    node-version: 21.4.0
    date-time: 2024-06-10T09:14:42.383Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
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
    child-1:
      pipeline:
        - interpolate
        - cpu-factor-to-wattage
        - wattage-times-duration
        - wattage-to-energy-kwh
        - calculate-vcpu-ratio
        - correct-cpu-energy-for-vcpu-ratio
        - sum-energy-components
        - embodied-carbon
        - operational-carbon
        - sum-carbon
        - sci
      config: null
      defaults:
        cpu/thermal-design-power: 100
        vcpus-total: 8
        vcpus-allocated: 2
        grid/carbon-intensity: 800
        device/emissions-embodied: 1533.12
        time-reserved: 3600
        device/expected-lifespan: 94608000
        resources-reserved: vcpus-allocated
        resources-total: vcpus-total
        component: 1
      inputs:
        - timestamp: '2023-12-12T00:00:00.000Z'
          cloud/instance-type: A1
          cloud/region: uk-west
          duration: 1
          cpu/utilization: 50
          network/energy: 0.000001
        - timestamp: '2023-12-12T00:00:01.000Z'
          duration: 5
          cpu/utilization: 20
          cloud/instance-type: A1
          cloud/region: uk-west
          network/energy: 0.000001
        - timestamp: '2023-12-12T00:00:06.000Z'
          duration: 7
          cpu/utilization: 15
          cloud/instance-type: A1
          cloud/region: uk-west
          network/energy: 0.000001
        - timestamp: '2023-12-12T00:00:13.000Z'
          duration: 30
          cloud/instance-type: A1
          cloud/region: uk-west
          cpu/utilization: 15
          network/energy: 0.000001
      outputs:
        - timestamp: '2023-12-12T00:00:00.000Z'
          cloud/instance-type: A1
          cloud/region: uk-west
          duration: 1
          cpu/utilization: 50
          network/energy: 0.000001
          cpu/thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          grid/carbon-intensity: 800
          device/emissions-embodied: 1533.12
          time-reserved: 3600
          device/expected-lifespan: 94608000
          resources-reserved: vcpus-allocated
          resources-total: vcpus-total
          component: 1
          cpu-factor: 0.75
          cpu-wattage: 75
          cpu-wattage-times-duration: 75
          cpu-energy-raw: 0.000020833333333333333
          vcpu-ratio: 4
          cpu/energy: 0.000005208333333333333
          energy: 0.000006208333333333333
          carbon-embodied: 0.000004051243023845763
          carbon-operational: 0.004966666666666666
          carbon: 0.004970717909690512
          sci: 0.004970717909690512
        - timestamp: '2023-12-12T00:00:01.000Z'
          duration: 5
          cpu/utilization: 20
          cloud/instance-type: A1
          cloud/region: uk-west
          network/energy: 0.000001
          cpu/thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          grid/carbon-intensity: 800
          device/emissions-embodied: 1533.12
          time-reserved: 3600
          device/expected-lifespan: 94608000
          resources-reserved: vcpus-allocated
          resources-total: vcpus-total
          component: 1
          cpu-factor: 0.4275
          cpu-wattage: 42.75
          cpu-wattage-times-duration: 213.75
          cpu-energy-raw: 0.000059375
          vcpu-ratio: 4
          cpu/energy: 0.00001484375
          energy: 0.00001584375
          carbon-embodied: 0.000020256215119228814
          carbon-operational: 0.012674999999999999
          carbon: 0.012695256215119228
          sci: 0.012695256215119228
        - timestamp: '2023-12-12T00:00:06.000Z'
          duration: 7
          cpu/utilization: 15
          cloud/instance-type: A1
          cloud/region: uk-west
          network/energy: 0.000001
          cpu/thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          grid/carbon-intensity: 800
          device/emissions-embodied: 1533.12
          time-reserved: 3600
          device/expected-lifespan: 94608000
          resources-reserved: vcpus-allocated
          resources-total: vcpus-total
          component: 1
          cpu-factor: 0.37375
          cpu-wattage: 37.375
          cpu-wattage-times-duration: 261.625
          cpu-energy-raw: 0.00007267361111111111
          vcpu-ratio: 4
          cpu/energy: 0.000018168402777777778
          energy: 0.000019168402777777778
          carbon-embodied: 0.00002835870116692034
          carbon-operational: 0.015334722222222222
          carbon: 0.015363080923389142
          sci: 0.015363080923389142
        - timestamp: '2023-12-12T00:00:13.000Z'
          duration: 30
          cloud/instance-type: A1
          cloud/region: uk-west
          cpu/utilization: 15
          network/energy: 0.000001
          cpu/thermal-design-power: 100
          vcpus-total: 8
          vcpus-allocated: 2
          grid/carbon-intensity: 800
          device/emissions-embodied: 1533.12
          time-reserved: 3600
          device/expected-lifespan: 94608000
          resources-reserved: vcpus-allocated
          resources-total: vcpus-total
          component: 1
          cpu-factor: 0.37375
          cpu-wattage: 37.375
          cpu-wattage-times-duration: 1121.25
          cpu-energy-raw: 0.00031145833333333335
          vcpu-ratio: 4
          cpu/energy: 0.00007786458333333334
          energy: 0.00007886458333333333
          carbon-embodied: 0.0001215372907153729
          carbon-operational: 0.06309166666666667
          carbon: 0.06321320395738204
          sci: 0.06321320395738204

```


## What next?

Now you have a basic SCI pipeline, you can use it as a base for more advanced IF runs. Try experimenting with:

- aggregating the individual SCI scores over time using our [aggregate](../major-concepts/aggregation.md) feature
- using [mock observations](../reference/plugins.md#built-in) to generate dummy input data
- using a third-party plugin to grab real grid carbon intensity data
- grabbing real metadata for your processor using [csv-lookup](./instance-metadata.md)
