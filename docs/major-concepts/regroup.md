---
sidebar-position: 7
---

# Regroup

Regroup is an IF feature that reorganizes a tree according to keys provided by the user. This allows users to regroup their observations according to various properties of their application. For example, the following manifest file contains a flat array of observations. This is how you might expect data to arrive from an importer plugin, maybe one that hits a metrics API for a cloud service.


```yaml
name: if-demo
description: demo pipeline
tree:
  children:
    my-app:
      pipeline:
        observe:
        regroup:
          - cloud-region
          - instance-type     
        compute:
          - teads-curve
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 300 
          instance-type: A1 
          region: uk-west
          cpu-util: 99
        - timestamp: 2023-07-06T05:00 
          duration: 300 
          instance-type: A1 
          region: uk-west
          cpu-util: 23	  
        - timestamp: 2023-07-06T10:00
          duration: 300
          instance-type: A1 
          region: uk-west
          cpu-util: 12
        - timestamp: 2023-07-06T00:00 # note this time restarts at the start timstamp
          duration: 300 
          instance-type: B1
          region: uk-west
          cpu-util: 11
        - timestamp: 2023-07-06T05:00 
          duration: 300 
          instance-type: B1
          region: uk-west
          cpu-util: 67
        - timestamp: 2023-07-06T10:00
          duration: 300 
          instance-type: B1
          region: uk-west
          cpu-util: 1	  
```

However, each observation contains an `instance-type` field that varies between observations. There are two instance types being represented in this array of observations. This means there are duplicate entries for the same timestamp in this array. This is the problem that `regroup` solves. You provide `instance-type` as a key in the `regroup` config and it extracts the data belonging to the different instances and separates them into independent arrays. The above example would be restructured so that instance types `A1` and `B1` have their own data, as follows:


```yaml
children:
  A1:
      inputs:
      - timestamp: 2023-07-06T00:00
          duration: 300
          instance-type: A1
          region: uk-west
          cpu-util: 99
      - timestamp: 2023-07-06T05:00
          duration: 300
          instance-type: A1
          region: uk-west
          cpu-util: 23
      - timestamp: 2023-07-06T10:00
          duration: 300
          instance-type: A1
          region: uk-west
          cpu-util: 12
  B1:
      inputs:
      - timestamp: 2023-07-06T00:00
          duration: 300
          instance-type: B1
          region: uk-east
          cpu-util: 11
      - timestamp: 2023-07-06T05:00
          duration: 300
          instance-type: B1
          region: uk-east
          cpu-util: 67
      - timestamp: 2023-07-06T10:00
          duration: 300
          instance-type: B1
          region: uk-east
          cpu-util: 1          
```

## Using `regroup`

To use `regroup`, you simply provide the keys you want to regroup by in the `regroup` pipeline. `regroup` is NOT a plugin, it is a core feature of IF that is executed when you run `if-run` or `if-run --regroup` if the config is available in the manifest file.

The config is provided at the node level, and it looks as follows:

```yaml
tree:
  children:
    my-app:
      pipeline:
        observe:
        regroup:
          - cloud-region
          - instance-type  
```

In the example above, the plugin would regroup the input data for the specific component by `cloud-region` and by `instance-type`.
