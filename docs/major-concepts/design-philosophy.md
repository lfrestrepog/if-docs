---
sidebar-position: 1
---

# Design philosophy

## Transparency

The manifest file is the lifeblood of Impact Framework. It defines all the context for an environmental imapct calculation, defining the architectire of an application, the observation period, the pipeline of calculations and transformations to execute, and the environmental impacts to track. This document can then be *executed* to generate impact values. This gives unparalleled transaprency to an environmental audit, all in a standard, easy to read format that anyone can read or re-execute.


## Verifiability

An Impact Framework manifets file is powerful because anyoen can re-execute it and verify an organization's impact calculation. You can even experiment by swapping out different plugins. The critical concept is that *everything* you need to calculate an imapct is provided in the manifest file and *anyone* can re-run a calculation with the manifest file and the lightweight Impact Framework command line tool.


## Modularity

Impact Framework is the minimal set of features that enable a manifest file to be processed according to some agreed principles. We provide a tool for processing manifest files and a set of standards and norms. This allows builders to create plugins that do some specific task, such as grabbing data from a particular cloud provider, or applying some calculation over some particular data.

Anyone can build a plugin and share them with the world, meaning Impact Framework development can be bottom-up and community driven. It also means that if you are not satisfied with how some calculation was done, you can easily fork it and replace it with your own.

What we provide is a minimal set of rules and guardrails for model builders to conform to to ensure compatibility with Impact Framework.


## Neutrality

Impact Framework aims to support maximally decentralized plugin development. We want anyone to be able to build plugins and use them to calculate their environmental impacts. We do not want to gatekeep what people can measaure and monitor - we want to encourage people to build freely and experiment on Impact Framework rails! 

At the same time, we want to provide the helpers and guardrails that make impact calculations as friction free as possible. This means we focus on providing the minimal *protocol* required to support community plugin development and make it as safe as possible from unit errors and other footguns. We want to see the universe of Impact Framework plugins grow organically and permissionlessly in ways we can't even imagine today!

To this end, what we are really building is a protocol. Impact Framework is just a Typescript implementation of the protocol. The protocol itself is a set of fundamental principles that define how a manifest file should be processed, such that any implementation in any language will yield the same result from a given manifest file. 

The Impact Protocol is the result of countless discussions, experiments, conversations with industry partners, academics, researchers and developers, and represents a community consensus for how certain actions should be executed, for example, how should a series of observations be aggregated, what standard units should be used, how should a manifest file be structured, etc.

Ths means we can be neutral about what can be built with IF while also providing a set of canonical processes and standards.
