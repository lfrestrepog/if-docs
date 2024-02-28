---
sidebar-position: 2
---

# Manifest File

Manifest files are absolutely fundamental to Impact Framework and they serve multiple important purposes, including:

- They contain all the necessary configuration for Impact Framework
- They define your application architecture
- They hold your input data
- They are shareable, portable and human readable
- They can be used as verifiable audits form your application

The manifest is a [yaml](https://circleci.com/blog/what-is-yaml-a-beginner-s-guide/) file with a particular structure. 
It can be thought of as an ***executable audit*** because the file itself can be shared with others and re-executed to verify your environmental impact calculations. 

It is a formal report detailing not just the end impact but all the assumptions, inputs, and plugins used in calculating the impact.

This is possible because *all the configuration and data required to run Impact Framework is contained in the manifest file*. 

Anyone can download Impact Framework and execute a manifest file to verify the results. 

## Stucture of a manifest file

### Overview

Manifest files can be simple or very intricate, depending on the plugin pipeline you want to use and the complexity of your application. However, all manifest files conform to a basic structure that looks as follows:

```yaml
name:
description:
tags:
initialize:
  plugins:
    - name: 
      method: 
      path: 
graph:
  children:
    child:
      pipeline:
      config:
      defaults:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
```

### Global metadata

The global metadata includes the `name`, `description` and `tags` that can be used to describe the nature of the manifest file. For example you might name the file `Carbon Jan 2024` or similar. A short description might briefly outline the scope of the manifest file, e.g. `company x's carbon emissions due to web serves from Jab 24 - July 24`. Tags can be used to group manifest files (we do not explicitly use this field for anything at the current time).

### Plugin initialization

The initialize section is where tyou define which plugins will be used in your manifest file and provide the global configuration for them. The required values are:

- `name`: the name used to refer to this specific mdoel across the manifest file
- `method`: the name of the function exported by the plugin.
- `path`: the path to the plugin code. For example, for a plugin from our standard library installed from npm, this value would be `@grnsft/if-plugins`

There is also an optional `global-config` field that can be used to set *global* configuration that is common to a plugin wherever it is invoked across the entire manifest file.

Impact Framework uses the `initialize` section to instantiate each plugin. A plugin cannot be invoked elsewhere in the manifest file unless it is included in this section.

### Tree

The `tree` section of a manifest file for defining the topology of all the components being measured. The shape of the `tree` defines the grouping of components. It describes the architecture of the application being studied and contains all the usage observations for each component. The graph is structured as a tree, with individual components as leaves, intermediate nodes representing groupings, and the top level being the root.

![](../../static/img/3f18767c1a55cee416e3de70314609e3.png)

For example, a web application could be organized as follows:

```
graph:
  children:
    front-end:
      build-pipeline:
        vercel:
        github-pages:
    backend-database:
      server1:
      server2:
      server3:
    front-end:
    networking:
```

This example has a relatively straightforward structure with a maximum of 3 levels of nesting. You can continue to nest components to any depth.

Each component has some configuration, some input data, and a plugin pipeline.

- `pipeline`: a list of plugins that should eb executed for a specific component
- `config`: contains configuration for each plugin that applies just inside this specific component.
- `defaults`: fallback values that IF defaults to if they are not present in an input observation.
- `inputs`: an array of `observation` data, with each `observation` containing usage data for a given timestep.


If a component *does not* include its own `pipeline`, `config` or `inputs` values, they are inherited from the closest parent.

Here's an example of a moderately complex graph:

```yaml
graph:
  children:
    child-0:
      pipeline:
        - sci-e
      children:
        child-0-1:
          pipeline:
            - sci-e
          config: null
          defaults: null
          inputs:
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 50
              energy-network: 0.000811
          outputs:
            - timestamp: 2023-07-06T00:00
              duration: 10
              cpu-util: 50
              energy-network: 0.000811
              energy: 0.000811
        child-0-2:
          children:
            child-0-2-1:
              pipeline:
                - sci-e
              config: null
              defaults: null
              inputs:
                - timestamp: 2023-07-06T00:00
                  duration: 10
                  cpu-util: 50
                  energy-network: 0.000811
              outputs:
                - timestamp: 2023-07-06T00:00
                  duration: 10
                  cpu-util: 50
                  energy-network: 0.000811
                  energy: 0.000811
```

### Inputs

Every component includes an `inputs` field that gets read into plugins as an array. `inputs` are divided into `observations`, each having a `timestamp` and a `duration`. Every `observation` refers to an element in `inputs` representing some snapshot in time.

Each plugin takes the `inputs` array and applies some calculation or transformation to each `observation` in the array.

Observations can inlude any type of data, including human judgment, assumptions, other plugins, APIs, survey data or telemetry.

The separation of timestamps in the `inputs` array determines the temporal granularity of your impact calculations. The more frequent your observations, the more accurate your imapct assessment.


## Computing a manifest file

Impact Framework computes manifest files. For each component in the graph, the `inputs` array is passed to each plugin in the pipeline in sequence. 

Each plugin *enriches* the `inputs` array in some specific way, typically by adding a new `key-value` pair to each observation in the array. For example, the `teads-curve` plugin takes in CPU utilization expressed as a percentage as an input and appends `cpu/energy` expressed in kWh. `cpu/energy` is then available to be passed as an input to, for example, the `sci-e` plugin.

This implies a sequence of plugins where the inputs for some plugin must either be present in the original manifest file or be outputs of the preceding plugins in the pipeline.

There are also plugins and built-in features that can synchronize time series of `observations` across an entire graph and aggregate data across time or across components.

## Outputs

When Impact Framework computes a manifest file, it appends new data to the manifest file and the final result is an enriched manifest that includes all the configuration and contextual data, the input data and the results of executing each plugin. This means the output file is compeltely auditable - the manifest file can be recovered simply by deleting the `outputs` section of the output file.

Here's an example output file:

```yaml
name: e-mem
description: null
tags: null
initialize:
  plugins:
    - name: e-mem
      path: "@grnsft/if-plugins"
      method: EMem
graph:
  children:
    child:
      pipeline:
        - e-mem
      config: null
      defaults:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          mem-util: 40
          total-memoryGB: 1
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          mem-util: 40
          total-memoryGB: 1
          coefficient: 0.38
          energy-memory: 0.15200000000000002
```
