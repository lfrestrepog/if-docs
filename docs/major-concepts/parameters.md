---
sidebar-position: 8
---

# Parameters

Parameters are handled carefully in IF because of the risk of errors propagating through plugin pipelines. We have a set of canonical parameters that are stored in a file called `params.ts` in the IF repository. 

Each entry in `params.ts` has the following structure:

```ts
name: {
description: 
unit: 
aggregation:
}
```
The `name` is the accepted name for a particular parameter. For example, IF has a parameter, `carbon` that represents carbon in gCO2eq. Anywhere `carbon` exists as a parameter anywhere across the iF and its plugins, the name `carbon` is reserved for carbon with this specific unit. 

The `description` is a short sentence describing the parameter. 

The `unit` is the unit the parameter is expected to be expressed in. Prescribing this here is important because it allows everyone to know what units to expect from a plugin that returns this parameter, protecting against unit errors in pipelines.

The `aggregation` parameter can accept `sum`, `avg` or `none`. This is the method IF should use to aggregate values over time or across a tree. Some values should be summed to aggregate them over time, such as `carbon` or `energy` - it makes sense to add these up as they are absolute values that can be added up over time or across components. However, it does not make sense to aggregate metrics expressed as percentages or proportions - these cases are better aggregated by averaging their values. Some other values should not be manipulated when they are aggregated and instead they are treated as constants that should simply be copied into the aggregate, such as names.


## Adding parameters

The canonical set of parameters protects users against introducing unit errors into plugin pipelines by asserting the units and aggregation methods associated with a specific named parameter. However, this also means that if you create a new plugin that deals with a parameter not currently available in `params.ts`, IF with throw an error. To handle this, you can add your plugin's new parameters to a block of config in the manifest file, and they will be added to the canonical set of parameters at runtime. This effectively gives you read-only access to `params.ts` via the manifest file.

Here's an example of the config block that could be added to a manifest to enable a plugin that uses the `dummy` parameter:

```yaml
params:
  - name: 
    description:
    unit:
    aggregaton:
```

Later, you could raise a pull request to IF to add your parameters to the canonical set in `params.ts`, where it would be discussed and agreed among the community. Eventually, we would like to move the governance of `params.ts` to a separate repository with independent custodians and a dedicated discussion forum.

## Overriding parameters

If you want to, you can also reject our canonical set of parameters and use your own instead. We do not recommend this, but we do make it possible via a CLI command, `override-params`. In this case, you can provide the path to a new file, structured the same way as `params.ts` that will be used instead of ours. For example:

```sh
ie --manifest <manifest> --override-params my-params.ts
```

The file must parse as JSON or a Javascript object.
