---
sidebar_position: 8
---

# Pipelines

Pipelines are chains of plugins that operate in sequence over the input data in your manifest file.

Your input data is fed through your pipeline of plugins, with each plugin adding a key-value pair to the `inputs` array or updating the value of an existing entry.

Each plugin does some specific operation. The idea is that individual plugins are simple - they do one specific thing only - but they act like Impact Legos, building up into complex logic operating on your manifest file.

## Prebuilt pipelines

We have designed our "standard library" of builtins to cover many generic operations such as file i/o, arithetic, queries etc so that in any cases you can build up complex pipelines without having to install any third party dependencies. One of the downsides of this is that logic that could be abstracted away into plugin code has to be implemented inside your manifest. We think this is great for transparency, auditability and reproducibility, but it does come with a moderate learning curve. For this reason, we have provided prebuilt pipelines for several of our common operations, such as implementing the Teads curve for estimating cpu energy consumption from CPU utilization, looking up metadata for given cloud instance types and calculating software carbon intensity (SCI) scores.

We recommend looking at the manifests in the `manifests/examples` folder that comes bundled with IF.

We also have a set of pipeline walkthroughs on this website, including:

- [Teads curve](../pipelines/teads.md): calculate CPU energy from CPU utilization and the thermal design power of your processor
- [Cloud-instance metadata](../pipelines/instance-metadata.md): lookup information about your cloud instance froma CSV file
- [SCI](../pipelines/sci.md): calculate a software carbon intensiy score

These pipelines can be modified or chained together with other pipelines to make larger pipelines. Just as each plugin is a building block, pipelines themselves can be building blocks too.
