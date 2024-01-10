---
sidebar_position: 1
---

# Overview

## Hackathon!

![](imgs/../../src/imgs/hack-banner.png)

----------------------------
From March 18 to  April 8, 2024, participants will compete to showcase their best application of IF in measuring the environmental impacts of software. 
 
Carbon Hack is a dynamic competition that combines healthy rivalry with collaborative innovation. Hackers will push the limits of the framework, uncover potential weaknesses, and create innovations to enhance the tool.

CarbonHack is open to all, including software practitioners and those with a passion for Green Software.
Find out more about CarbonHack 2024 on the [CarbonHack website](https://grnsft.org/hack/github)

**Registration opens 22nd January!**

----------------------------

<br />

## Impact Framework

Impact Framework (IF) aims to make the environmental impacts of software easier to calculate **and** share.

IF allows you to calculate the environmental impacts, such as carbon, of your software applications without writing any code. All you have to do is write a simple **manifest file**, known as an `impl` and IF handles the rest.

The project is entirely open source and composability is a core design principle - we want you to be able to create your own models and plug them in to our framework, or pick from a broad universe of open source models created by others.


## Motivation 

If you can't measure, you can't improve. Software has many negative environmental **impacts** which we need to optimize, carbon, water, and energy, to name just a few.

Unfortunately, measuring software impact metrics like carbon, water, and energy is complex and nuanced. 

Modern applications are composed of many smaller pieces of software (components) running on different environments, for example, private cloud, public cloud, bare-metal, virtualized, containerized, mobile, laptops, desktops, embedded, and IoT. Many components that make up a typical software application are run on something other than resources you own or control, which makes including the impact of managed services in your measurement especially hard.  

The impacts of software components also vary over time, so as well as understanding **which** components contribute most to the overall impacts, there is also a question of **when** they contribute the most.

Only through a granular analysis of the impacts of your software system can investments in reducing its impact be prioritized and verified. Measurement is the first and most crucial step in greening a software system, and the first step in that process with the [Impact Framework](./06-specification/impact-framework.md) is to create a [Graph](./06-specification/graph.md).

## Project Structure

The **IF source code** can be found in the [IF Github repository](https://github.com/Green-Software-Foundation/if). The code there covers the framework, which includes all the infrastructure for reading and writing input and output yamls, invoking models, running the command line tool and associated helper functions. However, it does not include the actual models themselves. Part of the IF design philosophy is that all models should be plugins, so that the IF is as composable and configurable as possible. Therefore, to use IF, you have to either create your own models or find some prebuilt ones and install them yourself. This also implies that you take responsibility for the models you choose to install.

We do provide a **standard library of models** built and maintained by the IF core team. These can be found in the [`if-models` Github repository](https://github.com/Green-Software-Foundation/if-models). You can install these into `if` by running `npm install https://github.com/Green-Software-Foundation/if-models` from the `if` project directory.

There is also a second repository for **models we expect community members to maintain**. These can be found in the [`if-unofficial-models` Github repository](https://github.com/Green-Software-Foundation/if-unofficial-models). You can install these into `if` by running `npm install https://github.com/Green-Software-Foundation/if-unofficial-models` from the `if` project directory.

Finally, the **source code for this documentation** website is available at the [`if-docs` Github repository](https://github.com/Green-Software-Foundation/if-docs).


## Navigating these docs

The lefthand sidebar contains links to all the information you need to understand Impact Framework. 

You can find specification pages for individual components of the framework in [`specification`](./specification/). 

In [`tutorials`](./tutorials) you will find walkthrough guides and tutorials explaining how to achieve specific tasks, such as writing an `impl`, running the model and creating new plugins. 

You will find documentation for the individual built-in model implementations in [`models`](./models/).

