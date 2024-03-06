---
sidebar-position: 7
---

# Group-by

Groupby is an IF plugin that reorganizes a tree according to keys provided by the user. This allows users to regroup their observations according to various properties of their application. For example, the following manifest file contains a flat array of observations. This is how you might expect data to arrive from an importer plugin, maybe one that hits a metrics API for a cloud service.


```yaml
name: if-demo
description: demo pipeline
graph:
  children:
    my-app:
      pipeline:     
        - group-by
        - teads-curve
      config:
        group-by:
          - cloud-region
          - instance-type
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

However, each observation contains an `instance-type` field that varies between observations. There are two instance types being represented in this array of observations. This means there are duplicate entries for the same timestamp in this array. This is the problem that `group-by` solves. You provide `instance-type` as a key to the `group-by` plugin and it extracts the data belonging to the different instances and separates them into independent arrays. The above example would be restructured so that instance types `A1` and `B1` have their own data, as follows:


```yaml
graph:
  children:
    my-app:
      pipeline:
        # - group-by
        - teads-curve
      config:
        group-by:
          groups:
            - cloud-region
            - instance-type
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

## Using `group-by`

To use `group-by`, you have to initialize it as a plugin and invoke it in a pipeline.

The initialization looks as follows:

```yaml
initialize:
plugins:
group-by: 
    path: 'builtin'
    method: GroupBy
```

You then have to provide config defining which keys to group by in each component. This is done at the component level (i.e. not global config).
For example:


```yaml
tree:
  children:
    my-app:
      pipeline:     
        - group-by
      config:
        group-by:
          group:
            - region
            - instance-type
```

In the example above, the plugin would regroup the input data for the specific component by `region` and by `instance-type`.

Assuming the values `A1` and `B1` are found for `instance-type` and the values `uk-east` and `uk-west` are found for `region`, the result of `group-by` would look similar to the following:


```yaml
tree:
  children:
    my-app:
      pipeline:
        - group-by
      config:
        group-by:
          groups:
            - region
            - instance-type
      children:
        uk-west:
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
        uk-east:
          children:
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

This reorganized data can then be used to feed the rest of a computation pipeline.
