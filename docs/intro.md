---
sidebar_position: 1
---

# Introduction

<br />

## Impact Framework

Impact Framework (IF) aims to make the environmental impacts of software easier to calculate **and** share.

IF allows you to calculate the environmental impacts, such as carbon, of your software applications without writing any code. All you have to do is write a simple **manifest file** and IF handles the rest.

The project is entirely open source and composability is a core design principle - we want you to be able to create your own plugins and plug them in to our framework, or pick from a broad universe of open source plugins created by others.


## Motivation 

If you can't measure, you can't improve. Software has many negative environmental **impacts** which we need to optimize, carbon, water, and energy, to name just a few.

Unfortunately, measuring software impact metrics like carbon, water, and energy is complex and nuanced. 

Modern applications are composed of many smaller pieces of software (components) running on different environments, for example, private cloud, public cloud, bare-metal, virtualized, containerized, mobile, laptops, desktops, embedded, and IoT. Many components that make up a typical software application are run on something other than resources you own or control, which makes including the impact of managed services in your measurement especially hard.  

The impacts of software components also vary over time, so as well as understanding **which** components contribute most to the overall impacts, there is also a question of **when** they contribute the most.

Only through a granular analysis of the impacts of your software system can investments in reducing its impact be prioritized and verified. Measurement is the first and most crucial step in greening a software system, and the first step in that process with the Impact Framework is to create a tree.


## Background

This project has evolved over the two years of the GSF's existence. 

During the development of the [SCI](https://github.com/Green-Software-Foundation/sci/blob/dev/SPEC.md), we acknowledged that the biggest blocker to adoption was data regarding the emissions of software components on different platforms and runtimes.

We then launched the sci-data project to help create the data sets required to calculate an SCI score.

After some investigation, the original sci-data team quickly realized that there were several existing data sources, and many more were in development, free open source or private commercial. The future challenge wouldn't be to source them, it would be knowing which data set to use for which use case, how data sets differed in their methodology and interface and when to use one over the other, the pros/cons, and trade-offs.

The project evolved into the [sci-guide](https://sci-guide.greensoftware.foundation/) to document existing data sets, providing guidance for when to use one over another and how to use it to create your own software measurement reports.

Finally, we had enough information, and [SCI case studies](https://sci-guide.greensoftware.foundation/CaseStudies) started to be written. This was a milestone moment.

But now we are in the next evolution, to have software measurement be a mainstream activity. For this to be an industry with thousands of professionals working to decarbonize software, for businesses to grow and thrive in a commercial software measurement ecosystem, we need to formalize software measurement into a discipline with standards and tooling. The SCI Specification is the standard, and the [Impact Framework](./06-specification/impact-framework.md) is the tooling.


## Project Structure

The **IF source code** can be found in the [IF Github repository](https://github.com/Green-Software-Foundation/if). The code there covers the framework, which includes all the infrastructure for reading and writing input and output yamls, invoking plugins, running the command line tool and associated helper functions. However, it does not include the actual plugins themselves. Part of the IF design philosophy is that all plugins should be plugins, so that the IF is as composable and configurable as possible. Therefore, to use IF, you have to either create your own plugins or find some prebuilt ones and install them yourself. This also implies that you take responsibility for the plugins you choose to install.

We do provide a **standard library of plugins** built and maintained by the IF core team. These can be found in the [`if-plugins` Github repository](https://github.com/Green-Software-Foundation/if-plugins). You can install these into `if` by running `npm install https://github.com/Green-Software-Foundation/if-plugins` from the `if` project directory.

There is also a second repository for **plugins we expect community members to maintain**. These can be found in the [`if-unofficial-plugins` Github repository](https://github.com/Green-Software-Foundation/if-unofficial-plugins). You can install these into `if` by running `npm install https://github.com/Green-Software-Foundation/if-unofficial-plugins` from the `if` project directory.

Finally, the **source code for this documentation** website is available at the [`if-docs` Github repository](https://github.com/Green-Software-Foundation/if-docs).


## Navigating these docs

The lefthand sidebar contains links to all the information you need to understand Impact Framework. 

You can explore the key ideas underpinning Impact Framework in the [Major Concepts section](./major-concepts/).

Users can read our [guides](./users/) explaining how to use IF, including installation, using the CLI and loading plugins.

We also have [developer documentation](./developers/) to help you get started building with IF.

You will find documentation for the individual built-in plugin implementations in [`plugins`](./reference/plugins.md).
