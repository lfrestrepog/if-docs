---
sidebar_position: 4
---

# How to write a manifest file

The Impact Framework receives all its configuration and input data in the form of a manifest file known as an `impl` (input-yaml). To use the framework, you will need to write an `impl` file and pass its path to the command line tool. This guide will help you to understand how to construct one of these files and use it to measure the energy and carbon usage of your app.

## Structure of an `impl`

The basic structure of an `impl` is as follows: 

```yaml
name: 
description: 
tags: 
initialize:
  models:
    - name: 
      model:
      path: 
graph:
  children:
    child:
      pipeline:
        - 
      config:
      inputs:

```
### Project metadata

The file starts with some metadata about the project. There are no strict specfications for what to put in these fields, they are for you to keep track of your manifest files and to help other users to understand your use case.

```yaml
name:
description:
tags:
```

### Initialize

The `initialize` fields are where you specify each individual model that will be initialized in your pipeline. The models can be initialized in any order, but can only be invoked elsewhere in the `impl` if they have been initialized first here. In each case, you will need to provide the name, path and model:

```yaml
initialize:
    - name: sci-m
      path: ''
      model:
```


- The `name` is the exact model name as recognized by Impact Framework. You can check all the valid model names [here](../src/util/models-universe.ts).
- The `path` defines where IF should look for the installed model. For example, for our standard library of models you would specify `"@grnsft/if-models"`, as this is the name of the directory they are installed into in `node_modules`.
- For the `model` field, you should provide the name of the class your model instantiates. For example, for the `sci-e` model, the correct value is `SciEModel`.

### Graph

The `graph` fields are where you define the various components of your application. Each component is defined as `children`, where each `child`'s output is summed to give the overall impact. Each `child` can have its own model pipeline and its own configuration, but when none is provided, it is inherited from the graph-level configuration.

In the following example, there is only one component but the model pipeline contains two models; `teads-curve` and `sci-m`. Neither requires any `config` data, but certain information is required in `inputs`.

```yaml
graph:
  children:
    child:
      pipeline:
        - teads-curve
        - sci-m
      config:
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

You now have a simple `impl` file that will use the model config and input data to run the `teads-curve` and `sci-m` models. The output data will be appended to the `impl` under a new `outputs` field and saved as an `ompl` file.

## More complex `impls`

### Complex pipelines

Whilst the `impl` file we looked at above works perfectly well, it will only return the most basic output data. Most users will want to calculate an SCI score, which implies a number of additional steps:
- `operational-carbon` and `embodied-carbon` must appear as inputs.
- This means that `sci` will need to be preceded by `sci-m` and `sci-o` in the model pipeline.
- In most cases, `sci-o` will have to be preceded by `sci-e` to ensure `energy` is available to be piped to `sci-o`.
- The inputs to `sci-e` will most likely be coming from a model such as `teads-curve`.
- The `sci` model also requires `functional-unit` information so it can convert the estimated `carbon` into a useful unit.
- You may also wish to grab your `input` data by querying a metrics API on a virtual machine. 

The example below gives you the full pipeline implemented in an `impl` (if you have an Azure virtual machine and put your credentials into a `.env` file, you can run this `impl` to retrieve your SCI score).


```yaml
name: if-demo
description: demo pipeline
tags:
initialize:
  models:
    - name: azure-importer
      model: AzureImporterModel
      path: "@grnsft/"@grnsft/"@grnsft/if-models"""
    - name: cloud-instance-metadata
      model: CloudInstanceMetadataModel
      path: if-models
    - name: teads-curve
      model: TeadsCurveModel
      path: if-unofficial-models
    - name: sci-e
      model: SciEModel
      path: if-models
    - name: sci-o
      model: SciOModel
      path: "@grnsft/if-models"
    - name: sci-e
      model: SciEModel
      path: "@grnsft/if-models"
    - name: sci-m
      model: SciMModel
      path: "@grnsft/if-models"
    - name: sci
      model: SciModel
      path: "@grnsft/if-models"
graph:
  children:
    child:
      pipeline:
        - azure-importer
        - cloud-instance-metadata
        - teads-curve
        - sci-e
        - sci-o
        - sci-m
        - sci
      config:
        sci-o:
          grid-carbon-intensity: 951
        sci:
          functional-unit: ''
          functional-unit-time: hour
          functional-unit-duration: 1
      inputs:
          - timestamp: '2023-11-02T10:35:31.820Z'
            duration: 3600
            azure-observation-window: 5 min # value and unit must be space separated 
            azure-observation-aggregation: 'average'
            azure-subscription-id: 9ed7b18c-8a28-5b73-9451-45fc74e7d0d3
            azure-resource-group: vm1_group
            azure-vm-name: vm1
            total-embodied-emissions: 1533.12
            time-reserved: 300
            expected-lifespan: 94348800 # 3 yrs in seconds
            resources-reserved: 1
            total-resources: 64

```

### Complex applications

The `impl` examples provided so far have only had a single component. However, Impact Framework can handle any number of nested `children`.
The following example shows you how to nest multiple subcomponents. 

```yaml
name: nesting-demo
description:
tags:
  kind: web
  complexity: moderate
  category: on-premise
initialize:
  models:
    - name: teads-curve
      model: TeadsCurveModel
      path: "@grnsft/if-unofficial-models"
    - name: sci-e
      model: SciEModel
      path: "@grnsft/if-models"
    - name: sci-m
      path: "@grnsft/if-models"
      model: SciMModel
    - name: sci-o
      model: SciOModel
      path: "@grnsft/if-models"
    - name: sci
      model: SciModel
      path: "@grnsft/if-models"
graph:
  children:
    server: # an advanced grouping node
      pipeline:
        - teads-curve
        - sci-e
        - sci-m
        - sci-o
        - sci
      config:
        sci:
          functional_unit_duration: 1 
          functional_duration_time: ''
          functional_unit: requests # factor to convert per time to per f.unit
      children:
        nested-1:
          inputs:
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 50
              thermal-design-power: 65
              e-net: 0.000811 #kwh     
              requests: 380
              total-embodied-emissions: 251000 # gCO2eq
              time-reserved: 3600 # 1 hour in s
              expected-lifespan: 126144000 # 4 years in seconds    
              resources-reserved: 1 
              total-resources: 1
              grid-carbon-intensity: 451
        nested-2:
          inputs: 
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 33
              thermal-design-poiwer: 65
              e-net: 0.000811 #kwh     
              requests: 380
              total-embodied-emissions: 251000 # gCO2eq
              time-reserved: 3600 # 1 hour in s
              expected-lifespan: 126144000 # 4 years in seconds    
              resources-reserved: 1 
              total-resources: 1
              grid-carbon-intensity: 451

```

In this way, you can combine complex model pipelines and application architectures to calculate the energy and carbon outputs of complicated systems.

## Choosing which models to run

The models are designed to be composable, but they each have specific input requirements that must be met in order for the models to run correctly. For example, the `teads-curve` model requires `tdp` to be available in the `impl`. If it is not there, the model cannot use it to calculate `e-cpu`.

It is also possible to leapfrog some models if you have access to high-level data. For example, perhaps you already know the energy being used by your CPU. In this case, there is no need to run `teads-curve`, you can simply provide `e-cpu` as an `input` and omit `teads-curve` from the model pipeline.

We have deliberately made the models modular and composable so that you can be creative in developing new plugins to replace those provided as part of IF.

## Running an `impl`

You run an `impl` by providing its path to our command line tool and a path to save the results file to. You can run an `impl` named `my-impl.yml` using the following command:

```sh
npx ts-node scripts/impact.ts --impl ./examples/impls/my-impl.yml --ompl ./examples/ompls/my-ompl.yml
```
