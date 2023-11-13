# Terminology

### Impact

**aka:** *impact metric*

An impact is some environmental metric that you would like to measure, for example carbon, water, energy.

### Subject

This is the *thing* an we are measuring the environmental impact of, for example a software application, a user journey, a campaign.

### Graph 

Is a graph of nodes that defines an ontology we want to model, for example an application, a campaign, a user journey. 

### Model

Is a model that given some *Inputs* returns some *Outputs*. For example, if you input some CPU utilization, it might be a model that translate that into an estimate of energy consumed.

### Model Plugin

Is a software package/module external to the [Impact Framework](./04-specification/impact-framework.md) exposing a class implementing the [Model Plugin Interface](./04-specification/model-plugin.md). It's code you download and install which let's you interact with a Model using an open source standard interface.

### Model Plugin Interface

**aka**: *model interface*

Is a common class interface that every [Model Plugin](./04-specification/model-plugin.md) needs to extend and implement. Every model might be very different from each other, but through a [Model Plugin](./04-specification/model-plugin.md) that implements the same interface we can easily compare, swap, use one plugin to replace another since they all expose the same interface.

### Model Pipeline

Since models all expose the same [interface](#model-plugin-interface) and use standardised parameters they can be joined together and work in a pipeline. Just like a unix pipeline can join multiple smaller commands together to form a more complex function, you can join multiple models together to form a complex computation pipeline, this is called the [Model Pipeline](./04-specification/model-pipeline.md).

### Graph Node

**aka**: *graph node*, *node*

A [Graph](/04-specification/graph.md) is made up of nodes, each node represents either a [Grouping](#Grouping) or a [Component](#Component). 

### Component

**aka**: *component node*

A component is something that creates environmental impacts, for example a server, network traffic. If it creates an environmental impact it's called a component. They effectively form the leaf nodes of a [Graph](./04-specification/graph.md). Each component has at least one [Model Plugin](./04-specification/model-plugin.md) configured as well as some [Input Observations](./04-specification/observations.md). We pass the observations to the model plugin which interacts with a model to calculate the output observations for this component.

### Grouping

**aka**: *component grouping*, *grouping node*

This is a node in the graph used to group multiple components and/or other groupings together. It doesn't generates it's own outputs however it's child node outputs are aggregated up to itself. It's used to define useful structure to the graph for analysis.

### Observation

**aka**: *Input fields*

An **Observation** is a collection of [Model Params](#modelparams) regarding a [Component](#component) in your [Subject](#subject) for a particular time and for a particular duration (a time span)

### ModelParams

ModelParams are parameters passed to a model. Some are inputs, some are observations, some may have other meanings. They all conform to a defined [Type](https://github.com/Green-Software-Foundation/if/blob/29280ff9cd9c9a843ab1842c728751aafdf21756/src/types/impl.ts#L14). An [Observation](#observation) is composed of a collection of ModelParams.

### Graph Duration

**aka**: ~
Every [Graph](/04-specification/graph.md) represents a duration of time for which observations have been gathered about it's components. By default the graph duration will be the time from the earliest observations to the latest observation for all of it's components.

### Observation Duration

**aka**: ~

Every [Observation](#observation) is for a particular time and **duration**. The duration of an observation determines the granularity of the output timeseries. If the observation duration is equal to the graph duration then only one metric will be computed for the whole graph. If the observation duration is less than the graph duration then multiple metrics might be computed.


### Computation

**aka**: ~

Is the act of calculating the output of a [Graph](/04-specification/graph.md).

### Computation Pipeline

**aka**: *computation pipeline*

Computing an entire [Graph](/04-specification/graph.md) involves several phases, the pipeline describes those phases.  pipeline is not to be confused with the model pipeline which is 

