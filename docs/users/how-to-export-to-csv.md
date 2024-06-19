---
sidebar_position: 5
---

# How to export to CSV

IF supports exporting data to CSV files. This provides users with a data format that enables visualization and data analysis using standard data analysis tools.

## Manifest config

To export your data to a CSV file, you have to provide a small piece of config data to your manifest file:

```yaml
initialize:
  outputs:
    - csv
```

You can also add `- yaml` if you want to export to both `yaml` and `csv` simultaneously.

## CLI command

Then, you must select the metric you want to export to CSV. The name of that metric must be added to the savepath provided to the `--output` command in the CLI, after a hashtag.

For example, to export the `carbon` data from your tree to a CSV file:

```sh
if-run --manifest example.yml --output example#carbon
```

This will save a CSV file called `example.csv`. The contents will look similar to the following:

|                                                |                  |                              |                              |                              |
| ---------------------------------------------- | ---------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| **Path**                                       | **Aggregated**   | **2024-03-05T00:00:00.000Z** | **2024-03-05T00:05:00.000Z** | **2024-03-05T00:10:00.000Z** |
| tree.carbon                                    | 425.289232008725 | 17.9269877157543             | 8.9024388783018              | 45.6021901509012             |
| tree.children.westus3.carbon                   | 104.696836722878 | 3.59973803197887             | 3.47438149032372             | 6.91318436533634             |
| tree.children.westus3.children.server-1.carbon | 104.696836722878 | 3.59973803197887             | 3.47438149032372             | 6.91318436533634             |
| tree.children.france.carbon                    | 320.592395285847 | 14.3272496837754             | 5.42805738797808             | 38.6890057855649             |
| tree.children.france.children.server-2.carbon  | 320.592395285847 | 14.3272496837754             | 5.42805738797808             | 38.6890057855649             |


## Comparing CSV to Yaml

The CSV above is generated from the following yaml. The `carbon` metric is extracted and added to the CSV. Otherwise,the CSV is an exact representation of the following yaml tree. You can see that the CSV reepresentation is *much* easier to understand than the full yaml tree:

```yaml
tree:
  pipeline:
    - mock-observations
    - group-by
    - cloud-metadata
    - time-sync
    - watttime
    - teads-curve
    - operational-carbon
  defaults:
    grid/carbon-intensity: 500
  config:
    group-by:
      group:
        - cloud/region
        - name
  children:
    westus3:
      children:
        server-1:
          inputs:
            - timestamp: '2024-03-05T00:00:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 66
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:05:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 4
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:10:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 54
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:15:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 19
              grid/carbon-intensity: 500
          outputs:
            - timestamp: '2024-03-05T00:00:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 65.78
              grid/carbon-intensity: 369.4947514218548
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: CAISO
              cloud/region-em-zone-id: US-CAL-CISO
              cloud/region-wt-id: CAISO_NORTH
              cloud/region-location: US West (N. California)
              cloud/region-geolocation: 34.0497,-118.1326
              geolocation: 34.0497,-118.1326
              cpu/energy: 0.018934842060004835
              carbon: 6.996324760173567
            - timestamp: '2024-03-05T00:05:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 3.986666666666667
              grid/carbon-intensity: 369.38452029076234
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: CAISO
              cloud/region-em-zone-id: US-CAL-CISO
              cloud/region-wt-id: CAISO_NORTH
              cloud/region-location: US West (N. California)
              cloud/region-geolocation: 34.0497,-118.1326
              geolocation: 34.0497,-118.1326
              cpu/energy: 0.004545546617763956
              carbon: 1.6790545568620359
            - timestamp: '2024-03-05T00:10:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 53.82
              grid/carbon-intensity: 372.58122309244305
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: CAISO
              cloud/region-em-zone-id: US-CAL-CISO
              cloud/region-wt-id: CAISO_NORTH
              cloud/region-location: US West (N. California)
              cloud/region-geolocation: 34.0497,-118.1326
              geolocation: 34.0497,-118.1326
              cpu/energy: 0.017357893372978016
              carbon: 6.467225143212361
            - timestamp: '2024-03-05T00:15:00.000Z'
              duration: 300
              name: server-1
              cloud/instance-type: Standard_E64_v3
              cloud/region: westus3
              cloud/vendor: azure
              cpu/utilization: 18.936666666666667
              grid/carbon-intensity: 434.20042537311633
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: CAISO
              cloud/region-em-zone-id: US-CAL-CISO
              cloud/region-wt-id: CAISO_NORTH
              cloud/region-location: US West (N. California)
              cloud/region-geolocation: 34.0497,-118.1326
              geolocation: 34.0497,-118.1326
              cpu/energy: 0.010385485956624245
              carbon: 4.5093824200727735
          aggregated:
            carbon: 19.651986880320734
      outputs:
        - carbon: 6.996324760173567
          timestamp: '2024-03-05T00:00:00.000Z'
          duration: 300
        - carbon: 1.6790545568620359
          timestamp: '2024-03-05T00:05:00.000Z'
          duration: 300
        - carbon: 6.467225143212361
          timestamp: '2024-03-05T00:10:00.000Z'
          duration: 300
        - carbon: 4.5093824200727735
          timestamp: '2024-03-05T00:15:00.000Z'
          duration: 300
      aggregated:
        carbon: 19.651986880320734
    france:
      children:
        server-2:
          inputs:
            - timestamp: '2024-03-05T00:00:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 15
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:05:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 78
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:10:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 16
              grid/carbon-intensity: 500
            - timestamp: '2024-03-05T00:15:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 6
              grid/carbon-intensity: 500
          outputs:
            - timestamp: '2024-03-05T00:00:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 14.95
              grid/carbon-intensity: 1719.1647205176753
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: France
              cloud/region-em-zone-id: FR
              cloud/region-wt-id: FR
              cloud/region-location: Paris
              cloud/region-geolocation: 48.8567,2.3522
              geolocation: 48.8567,2.3522
              cpu/energy: 0.00905914075141129
              carbon: 15.574155178030272
            - timestamp: '2024-03-05T00:05:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 77.74
              grid/carbon-intensity: 1719.0544893865829
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: France
              cloud/region-em-zone-id: FR
              cloud/region-wt-id: FR
              cloud/region-location: Paris
              cloud/region-geolocation: 48.8567,2.3522
              geolocation: 48.8567,2.3522
              cpu/energy: 0.020379266251888902
              carbon: 35.0330691407141
            - timestamp: '2024-03-05T00:10:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 15.946666666666667
              grid/carbon-intensity: 1718.8707708347622
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: France
              cloud/region-em-zone-id: FR
              cloud/region-wt-id: FR
              cloud/region-location: Paris
              cloud/region-geolocation: 48.8567,2.3522
              geolocation: 48.8567,2.3522
              cpu/energy: 0.009405866514354337
              carbon: 16.16746902589712
            - timestamp: '2024-03-05T00:15:00.000Z'
              duration: 300
              name: server-2
              cloud/instance-type: Standard_E64_v3
              cloud/region: france
              cloud/vendor: azure
              cpu/utilization: 5.98
              grid/carbon-intensity: 1718.6686804277592
              vcpus-allocated: 64
              vcpus-total: 64
              memory-available: 432
              physical-processor: >-
                Intel® Xeon® Platinum 8370C,Intel® Xeon® Platinum 8272CL,Intel®
                Xeon® 8171M 2.1 GHz,Intel® Xeon® E5-2673 v4 2.3 GHz
              cpu/thermal-design-power: 269.1
              cloud/region-cfe: France
              cloud/region-em-zone-id: FR
              cloud/region-wt-id: FR
              cloud/region-location: Paris
              cloud/region-geolocation: 48.8567,2.3522
              geolocation: 48.8567,2.3522
              cpu/energy: 0.0054492484351820105
              carbon: 9.365452617417297
          aggregated:
            carbon: 76.1401459620588
      outputs:
        - carbon: 15.574155178030272
          timestamp: '2024-03-05T00:00:00.000Z'
          duration: 300
        - carbon: 35.0330691407141
          timestamp: '2024-03-05T00:05:00.000Z'
          duration: 300
        - carbon: 16.16746902589712
          timestamp: '2024-03-05T00:10:00.000Z'
          duration: 300
        - carbon: 9.365452617417297
          timestamp: '2024-03-05T00:15:00.000Z'
          duration: 300
      aggregated:
        carbon: 76.1401459620588
  outputs:
    - carbon: 22.57047993820384
      timestamp: '2024-03-05T00:00:00.000Z'
      duration: 300
    - carbon: 36.71212369757613
      timestamp: '2024-03-05T00:05:00.000Z'
      duration: 300
    - carbon: 22.63469416910948
      timestamp: '2024-03-05T00:10:00.000Z'
      duration: 300
    - carbon: 13.87483503749007
      timestamp: '2024-03-05T00:15:00.000Z'
      duration: 300
  aggregated:
    carbon: 95.79213284237952
```

## CSV and aggregation

The CSV representation of the output data is helpful for intuiting how the aggregation procedure works. What we refer to as "horizontal" aggregation is really an aggregation of the *rows* of the CSV. You can replicate the IF aggregation function by summing the cells in each row of the CSV. Similarly, what we refer to as "vertical" aggregation can be replicatd by summing the *columns* in the CSV representation (this is not *exactly* accurate because you have to skip summing both parent nodes and their children, both of which are represented in the CSV, but it is true conceptually).


## Walkthrough

You can start with a demo yaml, such as the following (save this as `pipeline-demo.yml`):

```yaml
name: pipeline-demo
description:
tags:
initialize:
  outputs:
    - csv
  plugins:
    boavizta-cpu:
      method: BoaviztaCpuOutput
      path: "@grnsft/if-unofficial-plugins"
      global-config:
        allocation: LINEAR
        verbose: true
    "sum":
      path: "builtin"
      method: Sum
      global-config:
        input-parameters:
          - cpu/energy
          - network/energy
        output-parameter: energy
    "sci-embodied":
      path: "builtin"
      method: SciM
    "sci-o":
      path: "@grnsft/if-plugins"
      method: SciO
tree:
  children:
    child-1:
      pipeline:
        - boavizta-cpu
        - sum
        - sci-m
        - sci-o
      config:
      defaults:
        cpu/thermal-design-power: 100
        grid/carbon-intensity: 800
        device/emissions-embodied: 1533.120 # gCO2eq
        time-reserved: 3600 # 1hr in seconds
        device/expected-lifespan: 94608000 # 3 years in seconds
        resources-reserved: 1
        resources-total: 8
        cpu/number-cores: 24
        cpu/name: Intel® Core™ i7-1185G7
      inputs:
        - timestamp: "2023-12-12T00:00:00.000Z"
          cloud/instance-type: A1
          region: uk-west
          duration: 1
          cpu/utilization: 50
          network/energy: 0.000001
        - timestamp: "2023-12-12T00:00:01.000Z"
          duration: 5
          cpu/utilization: 20
          cloud/instance-type: A1
          region: uk-west
          network/energy: 0.000001
        - timestamp: "2023-12-12T00:00:06.000Z"
          duration: 7
          cpu/utilization: 15
          cloud/instance-type: A1
          region: uk-west
          network/energy: 0.000001
        - timestamp: "2023-12-12T00:00:13.000Z"
          duration: 30
          cloud/instance-type: A1
          region: uk-west
          cpu/utilization: 15
          network/energy: 0.000001
```

Run this using:

```sh
if-run --manifest pipeline-demo.yml --output pipeline-demo#carbon
```

This will save a csv file called `pipeline-demo.csv`. Inside, the data will look as follows:

|                              |                              |                              |                              |                       |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- | --------------------- |
| **Path **                    | **2023-12-12T00:00:00.000Z** | **2023-12-12T00:00:01.000Z** | **2023-12-12T00:00:06.000Z** | b                     |
| tree.children.child-1.energy | 0.00002877777777777778       | 0.00011211111111111111       | 0.0002787777777777778        | 0.0005565555555555556 |
