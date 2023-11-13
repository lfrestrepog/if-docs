---
description: Describes Observations in the context of a Graph.
---

# Observations

`Observations` are a core component of a [Graph](graph.md) (graph), and they form the primary `inputs` and `outputs` of an [Model Plugin](model-plugin.md) (model).

An **Observation** is for a specific time and duration and contains a collection of **Model Parameters**.

 A **Model Parameter** is something singular you measure regarding a component in your software system. For example, an parameter about a server might be CPU utilization.

An array of **Input Observations** are passed into a Model which generates an array of **Output Observations**.

Different models require different kinds of **model parameters** as input. If a model converts billing data to carbon emissions, the inputs must include a model parameter which describesbilling information. Model parameters can be varied, billing data, utilization, number of users over time, responses from a survey, they can be anything at all.

- Every `observation` is a dictionary containing a **timestamp**, **duration** and one or more **model parameters**.
- When we use the plural, `observations`, we are refering to a time-series of individual observation dictionaries.
- Models take as input an array of **input observations**.
- Modesl output an arry of **output observations**.

In a [Manifest File](Impl%20(Impact%20YAML).md), a set of **input observations** are expressed like so:

```yaml
  inputs:      
	- timestamp: 2023-07-06T00:00
	  duration: 5
	  cpu: 0.34
	- timestamp: 2023-07-06T00:05
	  duration: 5
	  cpu: 0.23
	- timestamp: 2023-07-06T00:05
	  duration: 5
	  cpu: 0.11
```

Each block of data is what we call an **observation**, like so:

```yaml
	- timestamp: 2023-07-06T00:00
	  duration: 5
	  cpu: 0.34
```

Each individual entry in the dictionary we call a **model parameter**, like so:
```yaml
	  cpu: 0.34
```


Manifest files when computed also contain **output observations** which look like so:

```yaml
  outputs:      
	- timestamp: 2023-07-06T00:00
	  duration: 5
	  cpu: 0.34
	  energy: 1.2
	- timestamp: 2023-07-06T00:05
	  duration: 5
	  cpu: 0.23
	  energy: 0.8
	- timestamp: 2023-07-06T00:05
	  duration: 5
	  cpu: 0.11
	  energy: 0.9
```

But observations can also be stored in CSV files like so:

| Timestamp           | Duration | CPU | Mem | Disk |
| ------------------- | -------- | --- | --- | ---- |
| 2023-07-26T13:00:00 | 15       | 23  | 87  | 2    |
| 2023-07-26T13:00:15 | 15       | 26  | 86  | 4    |
| 2023-07-26T13:00:30 | 15       | 46  | 76  | 6    |
| 2023-07-26T13:00:45 | 15       | 2   | 60  | 10   |
| 2023-07-26T13:01:00 | 15       | 4   | 55  | 1    |

## Standardised Units and Terms

Each type of **Model Parameter** has a **default unit** and **default name**. For example, if you observe a CPU utilization, the name of the parameter is `cpu-util`, and the unit is as a `percentage` and the aggregation method is `avg`. 

:::caution Names and units are standardised

Models expect parameters to be passed in using the standard name and are expressed in the standard units. The [units.yaml](https://github.com/Green-Software-Foundation/if/blob/dev/src/config/units.yaml) contains the list of standardised names and units. Submit a pull request to add a new name.

:::

| Name | Unit                      |
| --------- | ------------------------- |
| CPU       | Percentage Utilized       |
| MEM       | Percentage Full           |
| Disk      | Total Read/Writes         |
| Duration  | Seconds                   |
| Timestamp | ISO8601/RFC3339 Timestamp |



## Observation synchronization

Each component in your graph needs input observations; we need inputs to compute outputs.

A helpful feature of the Impact Framework is that you don't need to synchronize all your input observations for all your components with each other. You can provide input observations at different intervals for every component in the graph. 

![](../../static/img/72efce519e8c2264406864148a8a3151.png)


### How does an Observation differ from Telemetry in the context of IF?

Telemetry is the automatic recording and transmission of very fine-grain data about a software system from remote sources. You can gather an observation from anything, **including human judgment**, assumptions, other models, survey data, and spreadsheets. Observations tend to be at a higher grain, with durations more likely in the range of 5 mins to an hour. Observations and telemetry work hand in hand; Observations will usually be collected by querying a system that has collected Telemetry to create a time series, for example, Prometheus.

### Observations drive temporal granularity

As discussed in the [Granularity](granularity.md) design document, an essential feature of the [Impact Framework](impact-framework.md) is to provide a granular analysis of the impacts of a software system.

One dimension of granularity is time, and observations are how we provide that temporal granularity.

You can provide one single input observation for a long duration for every component in a [Graph](graph.md); however, this won't give you a view of how the impacts changed over time. 

This is why observations are a time series; the more observations you can provide about components over time, the more the Impact Framework can surface impacts over time.

Another reason to provide multiple observations is to gain a much more accurate emissions estimate. Many of the models used to translate input observations into output observations are non-linear. This means just providing an average value over time will give you a less accurate value than providing more data points over time.