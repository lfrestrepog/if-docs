---
sidebar-position: 4
---

# Impact engine

## Introduction

The `impact-engine` is a command line tool that computes [manifest files](manifest-file.md). 

## Quickstart

```
impact 
-impl [path to the input impl file]
-ompl [path to the output impl file]
-format [yaml|csv] (not yet implemented)
-verbose (not yet implemented)
-help  (not yet implemented)
```

- `impl`: path to an input IMPL file
- `ompl`: path to the output IMPL file where the results as saved. If none is provided, it prints to stdout.
- `format`: the output file format. Defaults to yaml, but if csv is specified then it formats the outputs as a csv file for loading into another program.
- `verbose`: how much information to output about the calculation to aid investigation and debugging.
- `help`: prints out the above help file.


To use Impact, you must first configure an impl, then simply pass the path to the impl to Impact on the command line. You can also pass a path where you would like to save the output file to. For example, the following command, run from the project root, loads the `mst-eshoppen.yml` impl file from the examples directory, executes all the models defined in the impl, and saves the output to `examples/ompls/e-shoppen.yml`:

```sh
npx ts-node impact-engine.ts --impl ./examples/impls/msft-eshoppen.yaml --ompl ./examples/ompls/e-shoppen.yml
```


## Design ideology

The state of an impact computation is stored in a `graph` object.

There are a series of functions defined in the [lifecycle](#Lifecycle) section which the `graph` objects as input and mutates it somehow. A processed graph is then serialized back out to the end user for them to use the data.

## Lifecycle

Every `impact-engine` execution goes through a lifecycle; a set of distinct steps which process the graph in stages.

Currently the lifecycle is fixed but in the future this maybe be configurable via plugins.

```mermaid
flowchart TB
ExpandShorthand --> NamespaceConfig --> InitializeModels --> Compute --> Aggregate --> Export
```

### Expand shorthand

There is a shorthand and longhand way of defining an impl file. The first stage of the lifecycle is to expand out the shorthand format to make the graph object easier to parse for subsequent stages.
You would need to analyze the impl structure and, if you can convert the shorthand components to longhand, the graph object is restructured.

### Auto children

Some nodes leave out the `children` node for brevity if it's obvious all the other parameters of that node are `children`.

Pseudo Code: If there is no parameter called `children`, add one and then add all the existing parameters as children of that parameter.

**Shorthand notation:**

```yaml
graph:
  grouping-node-1:
    grouping-node-2:
      component-node-1:
        pipeline: ~
        config: ~
        inputs: ~
```

**Longhand notation:**

```yaml
graph:
  children:
    grouping-node-1:
      children:
        grouping-node-2:
          children:
            component-node-1:
              pipeline: ~
              config: ~
              inputs: ~
```

### Mirror pipeline to component

For simplicity, a common pipeline may be expressed in a higher grouping node rather than in every component node:

```yaml
graph:
  grouping-node-1:
    pipeline:
      - model-1
      - model-2
    grouping-node-2:
      component-node-1:
        pipeline: ~
        config: ~
        inputs: ~
      component-node-2:
        config: ~
        inputs: ~        
```

If a component doesn't have a defined pipeline, you can copy it from the higher scope. In the following example, `component-node-2` didn't have a pipeline defined, so we used the pipeline defined on the `grouping-node-1`:

```yaml
graph:
  grouping-node-1:
    pipeline:
      - model-1
      - model-2
    grouping-node-2:
      component-node-1:
        pipeline: ~
        config: ~
        inputs: ~
      component-node-2:
        pipeline:
          - model-1
          - model-2      
        config: ~
        inputs: ~        
```

## Namespace config

The configuration on all levels of the graph is both merged into an input and also namespaced so that the config for different models do not conflict with each other:

```yaml
graph:
  config:
    model-1:
      key-1: value-1
      key-2: value-2
  children:
    grouping-node-1:
      children:
        grouping-node-2:
          config:
            model-1:
              key-2: value-2a
              key-3: value-3        
          children:
            component-node-1:
              pipeline: ~
              config: ~
              inputs: ~
```

Continuing to the next lifecycle step, the graph object turns into the following:

```yaml
graph:
  config:
    model-1:
      key-1: value-1
      key-2: value-2
  children:
    grouping-node-1:
      children:
        grouping-node-2:
          config:
            model-1:
              key-2: value-2a
              key-3: value-3        
          children:
            component-node-1:
              pipeline: ~
              config: ~
              inputs:
                - timestamp: xxxxx
                  key-1::model-1: value-1
                  key-2::model-1: value-2a
                  key-3::model-1: value-3
```

## Initialize models

This step in the lifecycle loads any configured models, initializes them, and makes them available from a global service.

```yaml
.
.
initialize:
  models:
    - name: <model-name>
      kind: [builtin|plugin|shell]
      path: <path-model>
      config:
	       <key>: <value>   
.
.
graph: ~
```


For every model defined in the initialize -> models configuration;

If the model is `built-in`
- import it
- create an instance of it
- call `configure` with any provided config.

If the model is a `plugin`
- dynamically load it from the path provided
- create an instance of it
- call `configure` with any provided config.

If the model is a `shell`
- create an instance of `ShellCommandImp` which allows you to interact with the shell command as if it was any other type of Imp. NOTE: This launches a sub-process which you have to communicate with using STDIN/OUT.

Make every model available from a global `ModelService` object which returns an instance of the model for a given name.

## Compute

After all these steps in the lifecycle, every component node should have all the information needed to compute itself.

- Loop through the nodes in the tree.
- For every component node:
  - For every model in the pipeline for the component code:
    - Pass the inputs through the model.
    - Store the results as sibling to `inputs` called `outputs` on the same component node.

:::note 

Each input is for a time and duration, and each output impact is for the same time and duration. As such, we should link an impact to the exact input used to generate it.

:::

Represented as [manifest file](manifest-file.md), the calculation phase would compute every component node in the tree with the following inputs:

```yaml
component:
  inputs: 
      - timestamp: 2023-07-06T00:00
        duration: 15 
        cpu-util: 33
      - timestamp: 2023-07-06T00:05
        duration: 5
        cpu-util: 23
      - timestamp: 2023-07-06T00:05
        duration: 5
        cpu-util: 11
```

These inputs would then produce the following outputs:

```yaml
component:
  outputs:
      - timestamp: 2023-07-06T00:00
        duration: 15 
        energy: 23 mWh
        cpu-util: 33
      - timestamp: 2023-07-06T15:00
        duration: 5
        cpu-util: 23
        energy: 20 mWh
      - timestamp: 2023-07-06T20:00
        duration: 5
        cpu-util: 11
        energy: 18 mWh  
  inputs: 
      - timestamp: 2023-07-06T00:00
        duration: 15 
        cpu-util: 33
      - timestamp: 2023-07-06T15:00
        duration: 5
        cpu-util: 23
      - timestamp: 2023-07-06T20:00
        duration: 5
        cpu-util: 11
```

## Aggregate (Not yet implemented)

Once all the component nodes have been computed, the next step is to aggregate all the values.

:::note Time syncing

This step only makes sense if the nodes have been time-synced. That is to say, every impact timestamp and duration snaps to a globally defined grid. If that's true then aggregation is a simple matter, if it's not true then aggregation might not be appropriate. 

:::

## Export (TBD)

> It is curently only possible to export data as an `ompl` (output yaml). Other export options will be implemented soon.

The final step is to export the graph into a format that has been requested by the end user.

If a file param has been provided via `-ompl` then we export as a YAML file. For now, this also means we'll be exporting the longhand notation of the IMPL files rather than shorthand. If no `-ompl` was provided, then we print the results to stdout.

:::note 

Exporting as a CSV file only makes sense of the nodes have been time-synced. That is to say, every impact timestamp and duration snaps to a globally defined grid. If that's true then exporting as a CSV is a simple matter, if it's not true then exporting as a CSV might not be appropriate. 

:::

If `-format csv` was specified, then instead of outputting a YAML file we output a CSV file, with each row being an impact metric for a node in the tree and each column being a specific timestamp and duration.


## Verbosity (not yet implemented)

The `-verbose` settings in impact export a version of the graph after each step in the lifecycle process. This allows us to see how the lifecycle adjusts the graph and helps debug any issues.

For example, with the settings `-ompl path/to/my.yaml` and `-verbose`, the following files might be output instead:

- `my.yaml`
- `my.expand-shorthand.yaml`
- `my.normalize-config.yaml`
- `my.initialize-models.yaml`
- `my.compute.yaml`
- `my.aggregate.yaml`
- `my.export.yaml`
