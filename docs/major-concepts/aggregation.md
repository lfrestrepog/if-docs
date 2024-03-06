---
sidebar_position: 5
---

# Aggregation

Aggregation is the process of summarizing a set of metrics. 

Two types of aggregation can be executed in IF. The first takes a time series and condenses it down into a single number representing an entire observation period, for example, if your time series contains three timesteps, the value of the metric being aggregated is `1` in each timestep and the aggregate is being computed as a sum, the aggregated value for the whole observation period is `3`. We refer to this as "time series aggregation" or "horizontal aggregation".

The second type of aggregation happens across components in a tree. Where time series exist for multiple child nodes under a parent, their time series are aggregated together into one summary time series that is pushed to the parent node. For example, in the following tree, each child has a time series with three timesteps. At each timestep, the metric value is `1` for both children:

```
         parent
        /      \
       /        \
child-1          child-2
data: [1,1,1]    data: [1,1,1]
```

Assuming the aggregation method is `sum`, the parent would receive an aggregated time series [2,2,2], representing the aggregated values from both children. We refer to this as "tree aggregation" or "vertical aggregation".

## Configuration

`Aggregate` is a built-in feature of the IF. This means you do not need to initialize it along with the plugins you are using in your pipeline. All you need to do is to add a small piece of config to your manifest file.

The `aggregate` config looks as follows:

```yaml
aggregation:
  metrics:
    - "carbon"
    - "energy"
  type: "both"
```

There are two fields: `metrics` and `type`.

`metrics` is an array of metrics that you want to aggregate. You can provide any value here, but they must match a key that exists in your output data (i.e. if you tell IF to aggregate `carbon` but `carbon` is not in your outputs you will receive an error message and aggregation will fail). You can provide any number of metrics. In the example above, the aggregation feature will operate on the `carbon` and `energy` values.

`type` determines which kind of aggregation you want to perform. The choices are `horizontal` (time-series aggregation only), `vertical` (tree aggregation only) or `both` (both kinds of aggregation will be performed). In the example above, both types of aggregation will be performed over the two selected metrics.

## Aggregation methods

Aggregation can happen in several ways. In the example above, both of the selected metrics are absolute values measured in gCO2eq (carbon) and kWh (energy). To aggregate, it makes sense to add the values in each timestep for time-series aggregation and element-wise across components for tree aggregation. However, summing the values is not always the right way to aggregate. 

For example, some values are constants that apply to every timestep - these should simply be copied into the aggregated metric and not summed. For example, if you are using a hard-coded value for grid carbon intensity that applies globally, then you simply want to persist that value into the aggregate - adding them together would provide a misleading result. 

Similarly, some values are proportions or percentages. In these cases, the right way to aggregate is usually to take an average rather than summing over a set of values. 

The decisions about how to aggregate are made on a case-by-case basis for each individual parameter. We track the aggregation method for each parameter in our `params.ts` file, which contains the canonical set of parameters, their units and aggregation methods. You can append to the parameters in this file by providing `params` data in your manifest file, or you can override our recommended set of parameters entirely by providing a new file to the `--override-params` command in the CLI. In either case, you need to provide an `aggregation` method with your parameters so that IF can look up the right way to aggregate the values.

## Aggregation outputs

The aggregation process adds new output data to your manifest file. The two types of aggregation add different outputs. The horizontal (time-series) aggregation adds a new field called `aggregate` to each node whose time series has been aggregated. In the `aggregate` block, you will find the aggregated value for each of the aggregation metrics defined in the aggregation config.

The vertical aggregation adds a new array of output observations. These are simply named `outputs` and they always contain a timestamp and duration along with the aggregated metrics for each timestep. 

The example below shows the result of running both kinds of aggregation for a single component:

```yaml
   "outputs": [
      {
        "carbon": 0.04846481793320214,
        "energy": 0.00030285447154471535,
        "timestamp": "2023-12-12T00:00:00.000Z"
      },
      {
        "carbon": 0.037777724630840566,
        "energy": 0.00023606013840495548,
        "timestamp": "2023-12-12T00:00:05.000Z"
      },
      {
        "carbon": 0.03630388278027921,
        "energy": 0.000226848626838947,
        "timestamp": "2023-12-12T00:00:10.000Z"
      },
      {
        "carbon": 0.0360935970659935,
        "energy": 0.0002255343411246613,
        "timestamp": "2023-12-12T00:00:15.000Z"
      },
      {
        "carbon": 0.0360935970659935,
        "energy": 0.0002255343411246613,
        "timestamp": "2023-12-12T00:00:20.000Z"
      },
      {
        "carbon": 0.0360935970659935,
        "energy": 0.0002255343411246613,
        "timestamp": "2023-12-12T00:00:25.000Z"
      },
      {
        "carbon": 0.0360935970659935,
        "energy": 0.0002255343411246613,
        "timestamp": "2023-12-12T00:00:30.000Z"
      },
      {
        "carbon": 0.0360935970659935,
        "energy": 0.0002255343411246613,
        "timestamp": "2023-12-12T00:00:35.000Z"
      },
    ],
    "aggregated": {
      "carbon": 0.3246705689138855,
      "energy": 0.0020287555470867216
    }
```
