---
sidebar-position: 7
---
# FAQs

## How can I contribute to Impact framework?

We welcome all kinds of contributions to Impact Framework, from bug reports to work on core features or documentation. For detailed instructions on how to start and what to expect when you contribute, please visit our [contributions guidelines](https://github.com/Green-Software-Foundation/if/blob/main/CONTRIBUTING.md). There you will find guidance on how to raise bug reports, how to contribute code and what processes we have in place for handling your issues and PRs.

To contribute to these docs, you can raise pull requests against our [Github repository](https://github.com/Green-Software-Foundation/if-docs).


## Is there any way to auto-generate manifest files? 

You have to create your basic structure but it's expected that your input data will be filled using an importer plugin (we have one for Azure VMs and there will be more after the hackathon). For testing and experimenting we also have a MockObservations plugin that can autofill manifests with dummy data

## What is your vision for the IF?

The vision is to be a protocol that enables you to use IF for any and all of those use cases, and more. 

Right now we focus on software applications running in the cloud, but we have people using it on-premise and even for supply chain modeling. The idea is that we provide the minimal infrastructure required for you to build up different use cases using plugins.


## Is there a way to generate an audit/report along with a csv/yaml output?

No - we see the manifest file and associated manifest as a new type of "executable audit". The IF itself does not generate any other form of report, although there is nothing stopping others from building out this functionality on top of IF.


## The manifest approach makes things transparent, but you can still manipulate the data you put as inputs in the manifest. How to fight again this?

We can't really stop people providing fake data into a manifest file. But we're very interested in ways we can verify that the computation was done correctly and provide public proofs. Don't expect anything imminently, but we are thinking along these lines for the future.

## Is it planned to make the IF more user-friendly or also more usable for less technical people?

IF is a low-level infrastructure project. the core team focuses on building out solid foundations for others to build UIs, apps etc on top. There is no official IF UX tooling.

## Does it only calculate emissions for CPU usage or does it also work with other meters like storage/bandwidth?

We do have basic models for memory and network usage in addition to CPU. You can create plugins for anything you can observe and model.

## Is the cloud-metadata only for public cloud providers?

Yes it is - it's based on a database we maintain as part of the IF repository. You could extend it by adding the same data for your on-premise resource.

## Have you compared the results to the carbon reports that cloud providers are producing for their customers?

No we haven't - we've been focussing on capturing impacts of individual applications over relatively short periods so far. It's difficult to find the underlying data to build the comparisons.

## Are there plans to include other pieces of cloud metadata beyond servers e.g. for PaaS services?

We don't have immediate specific plans to build this as the IF core team, but we're enthusiastic about teams building plugins for this to support more use cases

## Is there a cloud-metadata for VMware and/or Openstack ?

No there isn't! It would be a nice addition.

