---
sidebar-position: 7
---
# FAQs

## How can I contribute to Impact framework?

We welcome all kinds of contributions to Impact Framework, from bug reports to work on core features or documentation. For detailed instructions on how to start and what to expect when you contribute, please visit our [contributions guidelines](https://github.com/Green-Software-Foundation/if/blob/main/CONTRIBUTING.md). There you will find guidance on how to raise bug reports, how to contribute code and what processes we have in place for handling your issues and PRs.

To contribute to these docs, you can raise pull requests against our [Github repository](https://github.com/Green-Software-Foundation/if-docs).

In general, you can consider any ticket on our [issue board](https://github.com/Green-Software-Foundation/if/issues) open for community contributions if it *does not* have the `core-only` tag. We tag suitable introductory issues as `good-first-issue` - these are great places to get started.

## Is there any way to auto-generate manifest files? 

Not really. We provide a command line tool called `if-env` which will generate a template manifest for you if you run it in an empty folder. We also provide a built-in feature called `mockObservations` that will autogenerate some input data for you (designed to generate dummy data for experimenting or scenario testing). There are also `importer` plugins that will pull data from files or APIs into IF manifests. However, we do not currently provide any tooling that will generate a full manifest file for you - we think humans in the loop are important for ensuring the nuances of your system are captured in the manifest and in general, we'd prefer not to automate that away. That said, there is potential for tooling that helps abstract out the more repetitive tasks associated with building large manifest files.

## Where do I get the data for my manifest file?

This is up to you! One of the strengths of the IF is that you can build manifests your way. We expect input data to come from an external file or an API in most cases, although you can manually add input data into your manifest too. People have built importer plugins for Azure's monitor API, Prometheus databases, CSV files, Datadog, and others. These importer plugins can be found on the [Explorer website](https://explorer.if.greensoftware.foundation).

## What is your vision for the IF?

The vision is to build a protocol that enables you to calculate the appropriate environmental impact for your application, whatever it is. We want to be an open communication standard - our dream is that an IF manifest is the primary way that people share the environmental impacts of their systems.

Right now we consider our core functionality to be calculating software carbon intensity scores for software applications running in the cloud, but we have people using IF on-premise and even for supply chain modeling and other non-software applications. The idea is that we provide the minimal infrastructure required for you to build up different use cases using plugins.

## Is there a way to generate an audit/report along with a csv/yaml output?

No - we see the manifest file and associated manifest as a new type of "executable audit". The IF itself does not generate any other form of report, although there is nothing stopping others from building out this functionality on top of IF.

## IF makes things transparent, but how can you fight against users inputting incorrect or misleading data?

We can't really stop people providing fake data into a manifest file. We're very interested in ways we can verify that the computation was done correctly and provide public proofs, but without direct access to a user's systems we can never guarantee they are providing truthful data. This is not unique to IF - fraud is a problem across all industries.

## Is it planned to make the IF more user-friendly or also more usable for less technical people?

IF is a low-level infrastructure project. The core team focuses on building out solid foundations for others to build UIs, apps etc on top. There is no official IF UI.

## Does it only calculate emissions for CPU usage or does it also work with other meters like storage/bandwidth?

We do have basic models for memory and network usage in addition to CPU. You can create plugins for anything you can observe and model.

## Have you compared the results to the carbon reports that cloud providers are producing for their customers?

No we haven't - we've been focussing on capturing impacts of individual applications over relatively short periods so far. It's difficult to find the underlying data to build the comparisons.

## Are you planning to support e.g. for PaaS, IaaS, alternative cloud providers...etc?

We are focused on building out the low-level core infrastructure so that users can apply IF to any use case. We do not currently intend to build out support for any specific service. We want users to build plugins and publish them to the [Explorer](https://explorer.if.greensoftware.foundation) and share manifests to support individual use cases.


## What is on your roadmap?

You can check what's coming up for IF core development by checking our [Github discussion board](https://github.com/Green-Software-Foundation/if/discussions). We publish our plans in advance of incorporating them into our development sprints so that the community can comment, ask for more information and report any potential impact for their specific use cases.
