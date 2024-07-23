# IF features

This page simply lists the features of Impact Framework that are not plugins or CLI tools, along with a brief description, usage instruction and link to more detailed docs.

Typically these features are enabled using a piece of manifest config.

## Aggregate

Aggregate collects and summarizes data across time or across components in your tree.

### How to configure

Add the following config to your manifest (this example is for aggregating "cpu/utilization" values across both time and components):

```yaml
aggregation:
  metrics:
    "cpu/utilization":
  type: both
```

[Read more on aggregate](../major-concepts/aggregation.md)


## Explainer

The explainer lists out all the parameters, their units and aggregation method for each plugin instance created in a manifest.

### How to configure

You can toggle the `explainer` by adding the following config to your manifest:

```yaml
explainer: true
```

You can override the parameter metadata provided in a plugin's source code by adding it to the plugin's `initialize` block, as follows:

```yaml
plugins:
  "sum-carbon":
      path: "builtin"
      method: Sum
      global-config:
      input-parameters:
          - carbon-operational
          - carbon-embodied
      output-parameter: carbon
      parameter-metadata:
      inputs:
          carbon-operational:
          description: "carbon emitted due to an application's execution"
          unit: "gCO2eq"
          aggregation-method: 'sum',
          carbon-embodied:
          description: "carbon emitted during the production, distribution and disposal of a hardware component, scaled by the fraction of the component's lifespan being allocated to the application under investigation"
          unit: "gCO2eq"
          aggregation-method: 'sum'
```

Read more on [explainer](../users/how-to-use-the-explain-feature.md)
