---
sidebar_position: 6
---


## Exporting CSV file with `if-csv`

IF includes a command line tool called `if-csv` which is designed to export CSV files based on a specified manifest file and metric.



## Example:
Let's execute this manifest file. This manifest simply sums two components, `cpu/energy` and `network/energy` and assigns the result to `energy` in the outputs array.

```yaml
name: sum
description: successful path
tags:
initialize:
  plugins:
    sum:
      method: Sum
      path: "builtin"
      global-config:
        input-parameters: ["cpu/energy", "network/energy"]
        output-parameter: "energy"
tree:
  children:
    child:
      pipeline:
        - sum
      config:
        sum:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          network/energy: 0.001
```

To generate a CSV file in the provided path, run the following command:

```sh
if-csv -m ./manifest.yaml -p energy -o ./output-manifest
```


To print data in the console, you need to run:
```sh
if-csv -m ./manifest.yaml -p energy
```

The output will be:
```sh
Path,2023-07-06T00:00
tree.children.child.cpu-cores-utilized,
```

Alternatively, you can pipe the result from `if-run`. 
```sh
if-run -m ./manifest.yaml | if-csv -p energy
```
