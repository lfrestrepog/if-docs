---
sidebar_position: 9
---

# Exhaust scripts

Exhaust scripts are scripts that can run independently of IF itself that take an executed manifest file (one with `outputs`) as an input, parse the yaml data and reformat it into some other representation. We provide `if-csv` bundled with IF, but if you want other data formats, you'll have to create an exhaust script yourself.

## if-run

`if-run` isn't really an exhaust script, because it also grabs input data, regroups data, computes the pipeline and aggregates. However, we're mentioning it here because it does have some built-in exhaust functionality. Specifically, `if-run` outputs yaml data. `if-run` can _only_ output yaml data. This yaml data can be dumped to the console or saved to a yaml file.

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
      config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
          - sum
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

The [`if-csv`](../users/how-to-export-csv-file-with-if-csv.md) script allows users to pass in `yaml` and `yml` files created using `if-run` and save the output in `csv` format. Yopu have to define the parameters you want to export from the yaml file, e.g. `energy` or `carbon`.

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
