---
sidebar_position: 10
---

# Exhaust scripts

Exhaust script is the major concept of the `if`, which provides two types of exhaust scripts: `if-run` and `if-csv`.

## if-run

The main script for exhaust operations is [`if-run`](./if.md). This script allows users to execute `yaml` and `yml` files.

### How to Use if-run

To use `if-run`, you need to provide a manifest file in `yaml` or `yml` foramt. The output will be in `yaml` format if you specify the output file path.

Here's a simple manifest file example. This manifest sums two components, `cpu/energy` and `network/energy` and assigns the result to `energy` in the outputs array.

```yaml
name: sum
description: successful path
tags:
initialize:
  plugins:
    sum:
      method: Sum
      path: 'builtin'
      global-config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
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

To execute this manifest with `if-run`, use the following command:

```sh
if-run -m sum.yaml -o output-sum
```

You will get the executed manifest in the `output-sum.yaml` file.

## if-csv

The [`if-csv`](../users/how-to-export-csv-file-with-if-csv.md) script allows users to execute `yaml` and `yml` files and save the output in `csv` format.

For the above example, you can get the following result:

```sh
Path,2023-08-06T00:00
tree.children.child.energy,0.002
```

by running:

```sh
if-csv -m sum.yaml -p energy -o output-sum
```

This command specifies the manifest file (`sum.yaml`), the parameter to export (`energy`), and the output file path (`output-sum`).
