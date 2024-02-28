---
sidebar_position: 6
---

# Glossary

### Impact

**aka:** *impact metric*

An impact is some environmental metric that you would like to measure, for example carbon, water, energy.

### Subject

This is the *thing* an we are measuring the environmental impact of, for example a software application, a user journey, a campaign.

### Tree 

Is a tree of nodes that defines an ontology we want to model, for example an application, a campaign, a user journey. 


### Plugin

Is a software package/module external to the Impact Framework exposing a function conforming tothe `PluginInterface`. It's code you download and install which let's you interact with a Model using an open source standard interface.


### Plugin Pipeline

Since plugins all expose the same interface and use standardised parameters they can be joined together and work in a pipeline. Just like a unix pipeline can join multiple smaller commands together to form a more complex function, you can join multiple plugins together to form a complex computation pipeline.

###  Node

**aka**: *tree node*,

A Tree is made up of nodes, each node represents either a [Grouping](#Grouping) or a [Component](#Component). 

### Component

**aka**: *component node*

A component is something that creates environmental impacts, for example a server, network traffic. If it creates an environmental impact it's called a component. They effectively form the leaf nodes of a Tree. Each component has at least one plugin configured as well as some input observations. We pass the observations to the plugin which calculates the output observations for this component.

### Grouping

**aka**: *component grouping*, *grouping node*

This is a node in the tree used to group multiple components and/or other groupings together. It doesn't generates it's own outputs however it's child node outputs are aggregated up to itself. It's used to define useful structure to the tree for analysis.

### Observation

**aka**: *Input fields*

An **Observation** is a collection of [Model Params](#modelparams) regarding a [Component](#component) in your [Subject](#subject) for a particular time and for a particular duration (a time span)

### ModelParams

ModelParams are parameters passed to a model. Some are inputs, some are observations, some may have other meanings. They all conform to a defined [Type](https://github.com/Green-Software-Foundation/if/blob/29280ff9cd9c9a843ab1842c728751aafdf21756/src/types/impl.ts#L14). An [Observation](#observation) is composed of a collection of ModelParams.

### Duration

Every [Observation](#observation) is for a particular time and **duration**. The duration of an observation determines the granularity of the output timeseries.

### Computation

**aka**: ~

Is the act of calculating the output of a manifest by passing inputs to plugins.

### Computation Pipeline

**aka**: *computation pipeline*

Computing an entire Tree involves several phases, the pipeline describes those phases.
