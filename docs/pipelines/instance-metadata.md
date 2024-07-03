---
sidebar-position: 1
---

# Instance metadata pipeline

The instance metadata pipeline simply looks up a metadata for a given virtual machine instance name using the `csv-lookup` plugin from the IF standard library. However, the target dataset can return multiple processor names for a given VM instance where there are multiple possibilitiers. This means we need to create a pipeline that includes the `regex` plugin so parse out just one of the possible values.

For this demo we'll just extract the first value if there are m,ultiple available for the `processor-name`.

Start by creating a manifest and adding the following boilerplate code:

```yaml
name: metadata-demo
description:
tags:
initialize:
  plugins:
tree:
  children:
    child:
      pipeline:
      inputs:
```

## Step 1: grab metadata using csv-lookup

There is a cloud instance metadata file in the `if-data` Github repository. You can use the `csv-lookup` plugin to grab data from that file. You do not need to have a local copy of the file, you can simply provide the URL of the remote file.

You can create an instance of `CSVLookup` and name it `cloud-instance-metadata` and add it to the `initialize` block in your manifest file. 

The lookup query is configured in `global-config`. You provide the parameters you want to use as selectors, and the selector value is a field from your `inputs` array. You also provide the target columns you want to return data from (we'll use a wildcard and grab everything).

You want to retrieve all available data where `instance-class` is equal to `Standard_A1_v2`. So you need to make sure that `Standard_A1_v2` is available in your `inputs` array - we'll put it there with the key `cloud/instance-type`.

Add the following data to your `inputs` array:

```yaml
- timestamp: 2023-08-06T00:00
    duration: 3600
    cpu/energy: 0.001
    cloud/instance-type: Standard_A1_v2
```

Now, add the `CSVLookup` instance to your `initialize` block. Configure your query so that you select your row based on the value in the `instance-class` column. The value should be `cloud/instance-type`. You want data from all the other rows, so `output` can be a wildcard `"*"`.


```yaml
name: csv-demo
description:
tags:
initialize:
  plugins:
    cloud-instance-metadata:
      method: CSVLookup
      path: "builtin"
      global-config:
        filepath: https://raw.githubusercontent.com/Green-Software-Foundation/if-data/main/cloud-metdata-azure-instances.csv
        query:
          instance-class: "cloud/instance-type"
        output: "*"
```

The CSV lookup can return multiple values for the processor name, because the same instance can use different processors in different circumstances. Multiple values are returned as a single string, separated using commas. Therefore, you can easily parse out the first individual value by selecting the entire string up to the first comma. This is a simple regex task.

Create an instance of your `regex` plugin, and select all characters up to the first comma, by adding the following to your `initialize` block:

```
extract-processor-name:
    method: Regex
    path: "builtin"
    global-config:
    parameter: cpu-model-name
    match: /^([^,])+/g
    output: cpu/name
```

That's it! 

## Run the manifest

Here's the complete manifest:

```yaml
name: instance-metadata
description:
tags:
initialize:
  plugins:
    cloud-instance-metadata:
      method: CSVLookup
      path: "builtin"
      global-config:
        filepath: https://raw.githubusercontent.com/Green-Software-Foundation/if-data/main/cloud-metdata-azure-instances.csv
        query:
          instance-class: "cloud/instance-type"
        output: "*"
    extract-processor-name:
      method: Regex
      path: "builtin"
      global-config:
        parameter: cpu-model-name
        match: /^([^,])+/g
        output: cpu/name
tree:
  children:
    child:
      pipeline:
        - cloud-instance-metadata
        - extract-processor-name
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          cloud/provider: gcp
          cloud/region: asia-east
          cloud/instance-type: Standard_A1_v2
```

Now you can run this manifest using:

```sh
if-run -m instance-metadata.yml -o output.yml
```

Your new `output.yml` file will contain the following:


```yaml
name: csv-demo
description: null
tags: null
initialize:
  plugins:
    cloud-instance-metadata:
      path: builtin
      method: CSVLookup
      global-config:
        filepath: >-
          https://raw.githubusercontent.com/Green-Software-Foundation/if-data/main/cloud-metdata-azure-instances.csv
        query:
          instance-class: cloud/instance-type
        output: '*'
    extract-processor-name:
      path: builtin
      method: Regex
      global-config:
        parameter: cpu-model-name
        match: /^([^,])+/g
        output: cpu/name
execution:
  command: >-
    /home/user/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /home/user/Code/if/src/index.ts -m manifests/examples/instance-metadata.yml
  environment:
    if-version: 0.3.3-beta.0
    os: linux
    os-version: 5.15.0-107-generic
    node-version: 21.4.0
    date-time: 2024-06-06T15:21:50.108Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
      - '@grnsft/if-unofficial-plugins@v0.3.1'
      - '@jest/globals@29.7.0'
      - '@types/jest@29.5.8'
      - '@types/js-yaml@4.0.9'
      - '@types/luxon@3.4.2'
      - '@types/node@20.9.0'
      - axios-mock-adapter@1.22.0
      - axios@1.7.2
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
        - cloud-instance-metadata
        - extract-processor-name
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          cloud/provider: gcp
          cloud/region: asia-east
          cloud/instance-type: Standard_A1_v2
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          cloud/provider: gcp
          cloud/region: asia-east
          cloud/instance-type: Standard_A1_v2
          cpu-cores-available: 52
          cpu-cores-utilized: 1
          cpu-manufacturer: Intel
          cpu-model-name: >-
            Intel® Xeon® Platinum 8272CL,Intel® Xeon® 8171M 2.1 GHz,Intel® Xeon®
            E5-2673 v4 2.3 GHz,Intel® Xeon® E5-2673 v3 2.4 GHz
          cpu-tdp: 205
          gpu-count: nan
          gpu-model-name: nan
          gpu-tdp: nan
          memory-available: 2
          cpu/name: Intel® Xeon® Platinum 8272CL
```
