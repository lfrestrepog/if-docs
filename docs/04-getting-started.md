# Getting started

This page will provide the basic instructions for getting up and running with Impact Framework.

## 0: Set up your environment

To run Impact Framework you need `node` installed on your computer. Node v18.17.1 is currently recommended. You can use `yarn` or `npm` to manage packages.

You can create a local project directory, say `if-project`.

```
mkdir if-project
```

Navigate to that directory and initialize a yarn project

```
cd if-project && yarn init
```


## 1: Install Impact Framework

Install the Impact Framework. This includes the `impact-engine` command line tool.

```sh
yarn add @grnsft/if
```

## 2: Install some model plugins

Install some of the models you want to include in your model pipeline. The pair of commands below will install both the official and unofficial IF model packages.

```sh
yarn add @grnsft/if-models
yarn add @grnsft/if-unofficial-models
```

## 3: Create a manifest file

A manifest file contains all the configuration and input data required to measure your application's enegry and carbon impacts. It should have a `.yml` extension. Open the file and add your data. You can see a simple example below. The example manifets file runs a pipeline of four models for a simple single-component application.

```yaml
name: example
description: a simple example manifest
tags:
initialize:
  models:
    - name: teads-curve
      model: TeadsCurveModel
      path: "@grnsft/if-unofficial-models"
    - name: sci-e
      model: SciEModel
      path: "@grnsft/if-models"
    - name: sci-m
      path: "@grnsft/if-models"
      model: SciMModel
    - name: sci-o
      model: SciOModel
      path: "@grnsft/if-models"
    - name: sci
      model: SciModel
      path: "@grnsft/if-models"
graph:
  children:
    child: # an advanced grouping node
      pipeline:
        - teads-curve
        - sci-e
        - sci-m
        - sci-o
        - sci
      config:
        teads-curve:
          thermal-design-power: 65
        sci-m:
          total-embodied-emissions: 251000 # gCO2eq
          time-reserved: 3600 # 1 hour in s
          expected-lifespan: 126144000 # 4 years in seconds    
          resources-reserved: 1 
          total-resources: 1 
        sci-o:
          grid-carbon-intensity: 457 # gCO2/kwh
        sci:
          functional-unit-duration: 1 
          functional-duration-time: ''
          functional-unit: requests # factor to convert per time to per f.unit
      children:
        inputs:
        - timestamp: '2023-07-06T00:00'
            duration: 10
            cpu-util: 50
            e-net: 0.000811 #kwh     
            requests: 380
```

Save the file.

## 4: Compute your manifest file

Run the pipeline by passing the path to your manifest file to the `impact-engine` command line tool:

```sh
impact-engine --impl <path-to-your-impl>
```



:tada:**Congratulations** :tada:! You have just used the Impact Framework to compute a software carbon intensity score!
