# Terminology

### Impact

**aka:** *impact*, *impact metric*
An impact is some environmental metric that you would like to measure, for example carbon, water, energy.

### Subject

**aka**: *subject*
This is the *thing* an we are measuring the environmental impact of, for example a software application, a user journey, a campaign.

### Graph 

**aka:** *graph*
Is a graph of nodes that defines an ontology we want to model, for example an application, a campaign, a user journey. 

### Model

**aka:** *model*
Is a model that given some  inputs returns some outputs. For example, if you input some CPU utilization, it might be a model that translate that into an estimate of energy consumed.

### Model Plugin

**aka**: *imp*, *model plugin*, *plugin*
Is a software package/module external to the [Impact Framework](./specification/impact-framework.md) exposing a class implementing the Model Plugin Interface. It's code you download and install which let's you interact with a Model Plugin in a standard way.

### Model Plugin Interface

**aka**: *model interface*
Is a common class interface that every [Impact Model Plugin](specification/model-plugin.md) needs to extend and implement. Every model might be very different from each other, but through a [Model Plugin](specification/model-plugin.md) that implements the same interface. By sharing that same interface we can easily compare, swap, use one plugin or another since they all expose the same interface.

### Graph Node

**aka**: *graph node*, *node*
A [Graph](specification/graph.md) is made up of nodes, each node represents either a [Grouping](#Grouping) or a [Component](#Component). 

### Component

**aka**: *component node*
A component is something that creates environmental impacts, for example a server, network traffic. If it creates and environmental impact it's called a component. They effectively form the leaf nodes of an [Impact Graph](specification/graph.md). Each component has at least one [Model Plugin](specification/model-plugin.md) configured as well as some [Inputs](inputs.md). We pass the observations to the model plugin which interacts with a model to calculate the [Impact](Impact) for this component.

### Grouping

**aka**: *component grouping*, *grouping node*
This is a node in the graph used to group multiple components and/or other groupings together. It doesn't generates it's own outputs however it's child node outputs are aggregated up to itself. It's used to define useful structure to the graph for analysis.

### Observation

**aka**: *inputs*
An **input** is something you measure regarding a component in your subject at a particular time and for a particular duration. For example, an input about a server might be CPU utilization.

### Graph Duration
**aka**: ~
Every [Graph](specification/graph.md) represents a duration of time for which observations have been gathered about it's components. By default the graph duration will be the time from the earliest observations to the latest observation for all of it's components.

### Impact Duration
**aka**: ~
Every Impact Metric is for a particular time and duration. The duration of a Metric determines the granularity of the output timeseries. If the impact duration is equal to the graph duration then only one Metric will be computed for the whole graph. If the impact duration is less than the graph duration then multiple Metrics might be computed.

### Input Duration
**aka**: ~
Every [input](input.md) is for a particular time and duration, this is called the input duration. There are usually multiple inputs provided as a time series, the input duration does not need to equal the impact duration which does not need to equal the graph duration.

### Computation
**aka**: ~
Is the act of calculating the impacts of an [Impact Graph](specification/graph.md).

### Computation Pipeline
**aka**: *computation pipeline*
Computing a [Graph](specification/graph.md) involves several phases, calculation, enrichment, normalization and aggregation, they are configurable to allow the framework to be used in multiple contexts, e.g. SCI and GHG. The pipeline describes those phases.

### Computation Pipeline
**aka**: ~
Is an external package/module which is used to customize one or more phases in the [Computation Pipeline](computation-pipeline.md).

