---
sidebar_position: 5
---

# Exporting CSV file with `if-csv`

IF includes a command line tool called `if-csv` which is designed to export CSV files based on a specified manifest file and metric.

## Example:

Let's execute this manifest file. This manifest simply sums two components, `cpu/energy` and `network/energy` and assigns the result to `energy` in the outputs array.

```yaml
name: sum
description: successful path
tags: null
initialize:
  plugins:
    sum:
      path: builtin
      method: Sum
      config:
        input-parameters:
          - cpu/energy
          - network/energy
        output-parameter: energy
  outputs:
    - yaml
execution:
  command: >-
    /Users/manushak/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /Users/manushak/Documents/Projects/Green-Software/if/src/if-run/index.ts -m
    ./manifests/test.yaml -o ./manifests/re-test
  environment:
    if-version: 0.5.0
    os: macOS
    os-version: 13.6.7
    node-version: 18.20.0
    date-time: 2024-07-09T16:00:58.218Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
      - '@grnsft/if-core@0.0.10'
      - '@grnsft/if-plugins@v0.3.2 extraneous -> file:../../../if-models'
      - >-
        @grnsft/if-unofficial-plugins@v0.3.0 extraneous ->
        file:../../../if-unofficial-models
      - '@jest/globals@29.7.0'
      - '@types/jest@29.5.8'
      - '@types/js-yaml@4.0.9'
      - '@types/luxon@3.4.2'
      - '@types/node@20.9.0'
      - axios-mock-adapter@1.22.0
      - axios@1.7.2
      - cross-env@7.0.3
      - csv-parse@5.5.6
      - csv-stringify@6.4.6
      - fixpack@4.0.0
      - gts@5.2.0
      - husky@8.0.3
      - jest@29.7.0
      - js-yaml@4.1.0
      - lint-staged@15.2.2
      - luxon@3.4.4
      - release-it@16.3.0
      - rimraf@5.0.5
      - ts-command-line-args@2.5.1
      - ts-jest@29.1.1
      - typescript-cubic-spline@1.0.1
      - typescript@5.2.2
      - winston@3.11.0
      - zod@3.22.4
  status: success
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
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          network/energy: 0.001
          energy: 0.002
```

To generate a CSV file in the provided path, run the following command:

```sh
if-csv -m ./sum.yaml -p energy -o ./output-sum
```

To print data in the console, you need to run:

```sh
if-csv -m ./sum.yaml -p energy
```

The output will be:

```sh
Path,2023-08-06T00:00
tree.children.child.energy,0.002
```

Alternatively, you can pipe the result from `if-run`.

```sh
if-run -m ./sum.yaml | if-csv -p energy
```
