---
sidebar_position: 4
---

# How to write a manifest file

The Impact Framework receives all its configuration and input data in the form of a manifest file known as an manifest. To use the framework, you will need to write a manifest file and pass its path to the command line tool. This guide will help you to understand how to construct one of these files and use it to measure the energy and carbon usage of your app.

## Structure of a manifest

The basic structure of a manifest is as follows: 

```yaml
name: 
description: 
tags: 
initialize:
  plugins:
    <PLUGIN-NAME-HERE>: 
      method:
      path: 
tree:
  children:
    child:
      pipeline:
        - 
      config:
      defaults:
      inputs:

```
### Project metadata

The file starts with some metadata about the project. There are no strict specifications for what to put in these fields, they are for you to keep track of your manifest files and to help other users to understand your use case.

```yaml
name:
description:
tags:
```

### Initialize

The `initialize` fields are where you specify each individual plugin that will be initialized in your pipeline. The plugins can be initialized in any order, but can only be invoked elsewhere in the manifest if they have been initialized first here. In each case, you will need to provide the `name`, `path` and `method` (and `global-config` if your plugin requires it):

```yaml
initialize:
  plugins:
    sci-m:
      path: ''
      method:
```


- The `name` is the name you want this plugin instance to be recognized as by Impact Framework.
- The `path` defines where IF should look for the installed plugin. For example, for our standard library of plugins you would specify `builtin`, for other installed plugins you use the name of the directory they are installed into in `node_modules`.
- For the `method` field, you should provide the name of the function exported by your plugin. For example, for the `sum` plugin, the correct value is `Sum`.

### Tree

The `tree` fields are where you define the various components of your application. Each component is defined as `children`, where each `child`'s output is summed to give the overall impact. Each `child` can have its own plugin pipeline and its own configuration, but when none is provided, it is inherited from the tree-level configuration.

In the following example, there is only one component but the plugin pipeline contains two plugins; `teads-curve` and `sci-m`. Neither requires any `config` data, but certain information is required in `inputs`.

```yaml
tree:
  children:
    child:
      pipeline:
        - teads-curve
        - sci-m
      config:
      defaults:
      inputs:
        - timestamp: '2023-11-02T10:35:31.820Z'
          duration: 3600
          total-embodied-emissions: 1533.12
          time-reserved: 1
          expected-lifespan: 3
          resources-reserved: 1
          total-resources: 8

```

### Inputs

The most granular level of the manifest file are the `inputs`. This is where you can add specific data for each `child`. Inputs must always include a `timestamp` and a `duration`.

```yaml
inputs:
  - timestamp: 2023-07-06T00:00
    duration: 3600
    cpu-util: 45
```

You now have a simple manifest file that will use the plugin config and input data to run the `teads-curve` and `sci-m` plugins. The output data will be appended to the manifest under a new `outputs` field and saved as an output file.

## More complex manifests

### Complex pipelines

Whilst the manifest file we looked at above works perfectly well, it will only return the most basic output data. Most users will want to calculate an SCI score, which implies a number of additional steps:

- `operational-carbon` and `embodied-carbon` must appear as inputs.
- This means that `sci` will need to be preceded by `sci-m` and `sci-o` in the plugin pipeline.
- In most cases, `sci-o` will have to be preceded by `sci-e` to ensure `energy` is available to be piped to `sci-o`.
- The inputs to `sci-e` will most likely be coming from a plugin such as `teads-curve` or `boavizta`.
- The `sci` plugin also requires `functional-unit` information so it can convert the estimated `carbon` into a useful unit.
- You may also wish to grab your `input` data by querying a metrics API on a virtual machine. 

The example below gives you the full pipeline implemented in a manifest. There are also several other executable example manifests in `if/manifests/examples` that you can run for yourself.


```yaml
name: pipeline-with-aggregate
description: a full pipeline with the aggregate feature enabled
tags:
aggregation:
  metrics:
    - "carbon"
  type: "both"
initialize:
  plugins:
    "interpolate":
      method: Interpolation
      path: 'builtin'
      global-config:
        method: linear
        x: [0, 10, 50, 100]
        y: [0.12, 0.32, 0.75, 1.02]
        input-parameter: 'cpu/utilization'
        output-parameter: 'cpu-factor'
    "cpu-factor-to-wattage":
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["cpu-factor", "cpu/thermal-design-power"]
        output-parameter: "cpu-wattage"
    "wattage-times-duration":
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["cpu-wattage", "duration"]
        output-parameter: "cpu-wattage-times-duration"
    "wattage-to-energy-kwh":
      method: Divide
      path: "builtin"
      global-config:
        numerator: cpu-wattage-times-duration
        denominator: 3600000
        output: cpu-energy-raw
    "calculate-vcpu-ratio":
      method: Divide
      path: "builtin"
      global-config:
        numerator: vcpus-total
        denominator: vcpus-allocated
        output: vcpu-ratio
    "correct-cpu-energy-for-vcpu-ratio":
      method: Divide
      path: "builtin"
      global-config:
        numerator: cpu-energy-raw
        denominator: vcpu-ratio
        output: cpu-energy-kwh
    "sci-embodied":
      path: "builtin"
      method: SciEmbodied
    "operational-carbon":
      method: Multiply
      path: builtin
      global-config:
        input-parameters: ["cpu-energy-kwh", "grid/carbon-intensity"]
        output-parameter: "carbon-operational"
    "sci":
      path: "builtin"
      method: Sci
      global-config:
        functional-unit-time: 1 sec
        functional-unit: requests # factor to convert per time to per f.unit
    "sum-carbon":
      path: "builtin"
      method: Sum
      global-config:
        input-parameters:
          - carbon-operational
          - carbon-embodied
        output-parameter: carbon
    "time-sync":
      method: TimeSync
      path: "builtin"
      global-config:
        start-time: "2023-12-12T00:00:00.000Z"
        end-time: "2023-12-12T00:01:00.000Z"
        interval: 5
        allow-padding: true
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
        - sci-embodied
        - operational-carbon
        - sum-carbon
        - time-sync
        # - sci
      config:
        group-by:
          group:
            - cloud/region
            - cloud/instance-type
      defaults:
        cpu/thermal-design-power: 100
        grid/carbon-intensity: 800
        device/emissions-embodied: 1533.120 # gCO2eq
        time-reserved: 3600 # 1hr in seconds
        device/expected-lifespan: 94608000 # 3 years in seconds
        vcpus-total: 8
        vcpus-allocated: 1
      inputs:
        - timestamp: "2023-12-12T00:00:00.000Z"
          cloud/instance-type: A1
          cloud/region: uk-west
          duration: 1
          cpu/utilization: 10
          requests: 10
        - timestamp: "2023-12-12T00:00:01.000Z"
          duration: 5
          cpu/utilization: 20
          cloud/instance-type: A1
          cloud/region: uk-west
          requests: 5
        - timestamp: "2023-12-12T00:00:06.000Z"
          duration: 7
          cpu/utilization: 15
          cloud/instance-type: A1
          cloud/region: uk-west
          requests: 15
        - timestamp: "2023-12-12T00:00:13.000Z"
          duration: 30
          cloud/instance-type: A1
          cloud/region: uk-west
          cpu/utilization: 15
          requests: 30

```

### Complex applications

The manifest examples provided so far have only had a single component. However, Impact Framework can handle any number of nested `children`.

In this way, you can combine complex plugin pipelines and application architectures to calculate the energy and carbon outputs of complicated systems.

## Choosing which plugins to run

The plugins are designed to be composable, but they each have specific input requirements that must be met in order for the plugins to run correctly. For example, the `teads-curve` plugin requires `cpu/thermal-design-power` to be available in the manifest. If it is not there, the plugin cannot use it to calculate `cpu/energy`.

It is also possible to leapfrog some plugins if you have access to high-level data. For example, perhaps you already know the energy being used by your CPU. In this case, there is no need to run `teads-curve`, you can simply provide `cpu/energy` as an `input` and omit `teads-curve` from the plugin pipeline.

We have deliberately made the plugins modular and composable so that you can be creative in developing new plugins to replace those provided as part of IF.

## Adding real-life inputs

The examples above already include inputs for the components. However, you may want to input real-life data into the manifest file.

There is no one-size-fits-all solution for getting data into the manifest file. This is because there are so many possible sources for your input data, all of which have their own particular requirements related to authorization, API request syntax and return types. Therefore, the approach taken by IF is to have specific plugins for specific services.

The recommended method for integrating data is to use the plugin system of the Impact Framework. You can either use an existing specific importer plugin or write your own.

There are already some community plugins available, including plugins for fetching data from Kubernetes, GCP, and third-party data aggregators like Datadog.

If there is no fitting plugin available yet, we encourage you to write and add one for your specific use case. See [developer documentation](./developers/) for more information on how to build a plugin. There is a [Azure-Importer](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/azure-importer/README.md) you can as a prototype and starting point for your own development.
If you already have external scripts you might have a look at the [shell plugin](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/shell/README.md) to integrate them with the Impact Framework.

If you just need data for testing purposes, you can use the [mock-observation](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/mock-observations/README.md) plugin.

## Running a manifest

You run a manifest by providing its path to our command line tool and a path to save the results file to. You can run a manifest named `my-manifest.yml` using the following command:

```sh
if-run --manifest my-manifest.yml
```
