---
sidebar_position: 1
---

# Quick start

This page will provide the basic instructions for getting up and running with Impact Framework.

## 1: Install Impact Framework

Install the Impact Framework globally using npm.

```sh
npm install -g @grnsft/if
```

Read our detailed guide to [installing IF](./how-to-install-if.md).

## 2: Install some plugins

Install some of the plugins you want to include in your pipeline. The following commands will install both the official and unofficial IF model packages.

```sh
npm install -g @grnsft/if-models
npm install -g @grnsft/if-unofficial-models
```

Read our detailed guide to [loading plugins](./how-to-import-plugins.md).

## 3: Create a manifest file

A manifest file contains all the configuration and input data required to measure your application's energy and carbon impacts and should have a `.yml` extension. 

Open the file, add your data and save the file. The simple example below runs a single snapshot observation through a single plugin.

```yaml
name: sci-e-demo
description:
tags:
initialize:
  models:
    - name: sci-e
      kind: plugin
      verbose: false
      model: SciEModel
      path: "@grnsft/if-models"
graph:
  children:
    child:
      pipeline:
        - sci-e
      config:
        sci-e:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          energy-cpu: 0.001
```

Read our detailed guide to [writing manifest files](./how-to-write-impls.md).

## 4: Compute your manifest file

Run the pipeline by passing the path to your manifest file to the `impact-engine` command line tool:

```sh
impact-engine --impl <path-to-your-impl>
```

:tada:**Congratulations** :tada:! You have just used the Impact Framework to compute the energy consumed by an application! 

## Next steps

Now you know how to use the `impact-engine` you can start building more complex pipelines of plugins and more complicated manifest files. Your overall aim is to create a manifest file that accurately represents a real software application, and a plugin pipeline that yields an environmental metric that's important to you (e.g. `carbon`).

Experiment by adding more plugins to the pipeline, for example add `sci-o` to convert energy into `operational-carbon`. Your output data will be displayed in your console. 

You can also configure `impact-framework` to save your output data to another `yaml` file. To do this, add the `--ompl` flag and the path to save the file to:

```sh
impact-engine --impl <path-to-your-impl> --ompl <save-path>
```

Your output data will look like this:

```yaml
name: sci-e-demo
description: null
tags: null
initialize:
  models:
    - name: sci-e
      kind: builtin
graph:
  children:
    child:
      pipeline:
        - sci-e
      config:
        sci-e: null
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          energy-cpu: 0.001
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          energy-cpu: 0.001
          energy: 0.00107

```

Explore our user documentation for walkthrough guides to common Impact Framework tasks:

- [How to install Impact Framework](./how-to-install-if.md)
- [How to load plugins](./how-to-import-plugins.md)
- [How to write manifest files](./how-to-write-impls.md)
