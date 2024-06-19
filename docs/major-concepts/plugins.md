---
sidebar-position: 4
---
# Plugins

Plugins are self-contained units of code that do one thing. They can be loaded into IF and chained together in a pipeline so that simple individual plugins can form a complicated procedure for computing a manifest file.

## What are plugins?

A plugin is a small, reuseable unit of code that can either observe some usage metric, grab some data from a file or API, or execute some transformation or calculation over some existing input data, for example, some plugins convert an input of CPU utilization into an output of energy.

The set of available plugins is growing; however, no single plugin can cover all impacts, scenarios, environments, contexts, and use cases. To calculate the end-to-end impact of a software application, you need to stitch together many different plugins. Plugins differ in fundamental ways in the inputs inputs they accept, their interface, their calculation methodology, their outputs, their granularity, and their coverage. 
	
We expect the choice of which plugin to use for which software component to come down to an expert decision by a green software professional.

## Why do we need to standardize the interface to plugins?

Currently, suppose you want to consume a plugin in your measurement application. In that case, you must craft custom code to interact with a custom interface since every plugin has its unique interface. Swapping one plugin for another requires code changes, and comparing plugins or validating their accuracy/precision is challenging. 

If every plugin **exposes the same interface**, then those plugins can easily be plugged into different applications, swapped in and out, upgraded, and compared. 

**Our thesis is simple: if we want a large, vibrant ecosystem of people and tooling around measurement, we need a standard, common interface for all plugins.**

> Ecosystems grow and thrive through standards.

You can explore more in the [plugins reference docs](../reference/plugins.md) or our [plugin building tutorial](../developers/how-to-build-plugins.md).

## Finding community plugins

Anyone can build IF plugins. To make them discoverable, we host the [IF Explorer](https://explorer.if.greensoftware.foundation) website. There you can search for plugins that you need for your specific use-case.

You can also add your own plugins to the explorer. Simply fill in the [submission form](https://wiki.greensoftware.foundation/how-to-add-plugins).
