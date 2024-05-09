# Errors

IF defines a finite set of error classes. All error messages emitted by IF are attached to one of these classes. 

This page enumerates the error classes. For each error class, we list the messages associated with them along with the likely causes and possible remedies. This should help you to debug issues you are having with IF.


## IF errors

### `CliInputError`

Errors of this class are caused by invalid input arguments being passed to the [CLI](./cli.md).

#### Messages

| message                                            | cause                                                                                                                                                   | remedy                                                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Output path is required.`                         | Your manifest defines an output file type (e.g. `yaml`) but no savepath was provided to the CLI                                                         | add `-o <savepath>` to yor run command                                                                                      |
| `CSV export criteria is not found in output path.` | Your manifest defines the output type to be CSV, but you have not provided the [metrics to export](./cli.md#csv-export-identifiers) in your run command | Choose a metric to export to CSV (e.g. `carbon`) and append it to your output path with a hashtag, e.g. `-o my-file#carbon` |
|                                                    |

### `ManifestValidationError`

Errors of the `ManifestValidationError` class arise due to a problem in the manifest (yaml) file. Validation of the manifest is done using the [Zod](https://zod.dev/) library. 

The error message will be the error surfaced by Zod, and will include the name of the manifest element that is invalid. Since the set of error messages is very large and all conform to a simple schema, we do not list them exhaustively here, but instead demonstrate using the following example:

`ManifestValidationError: "initialize" parameter is required. Error code: invalid_type.`

You can infer from the error code that the issue is related to an invalid or missing value encountered during the manifest validation.
The message itself indicates that the problematic element is `initialize` and the problem is that it is missing.

The remedy for this issue is to add an `initialize` block into the manifest.

### `ModuleInitializationError`

Errors of the `ModuleInitializationError` class arise when a plugin cannot be initialized, usually because of mistakes in the plugin configuration in the `initialize` block in the manifest file. Typically, this could be an incorrect `path` or `method`.

#### Messages

| message                                               | cause                                                                                                | remedy                                                                                                                                         |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Provided module: '${path}' is invalid or not found.` | The `path` parameter is incorrect or missing                                                         | Provide a valid import path to your plugin. This should be the path to the installed plugin in your `node_modules`, e.g., `@grnsft/if-plugins` |
| `Invalid exhaust plugin: ${pluginName}.`              | The configured exhaust plugin does not exist (**Note**: exhaust plugins are not currently supported) | Check your output configuration. YExhaust plugins are not yet fully supported                                                                  |


### `InvalidAggregationParamError`

Errors of the `InvalidAggregationParamError` are caused by problems in the configuration of the `aggregation` feature. Typically, the aggregation method may be undefined or you have tried to aggregate a metric that IF cannot find in the input data.

#### Messages

| message                                                                   | cause                                                                    | remedy                                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Aggregation is not possible for given ${metric} since method is 'none'.` | You are trying to aggregate a metric whose method is set to `none`       | the aggregation method is defined either in `if/src/config/params.ts` or you defined it in a `params` block in your manifest. Either update the aggregation method, or choose a different metric to aggregate. |
| `Aggregation metric ${metric} is not found in inputs[${index}].`          | You are trying to aggegate a metric that doesn't exist in the input data | Check that your chosen metric is spelled correctly and that it exists in the input data by the time the `aggregate` feature executes.                                                                          |

### `InvalidGroupingError`

Errors of the `InvalidGroupingError` are only emitted by the `group-by` plugin. There is only one associated message; it is emitted when the requested groups do not exist in the tree.

| message                  | cause                                                                           | remedy                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `Invalid group ${type}.` | you are requested groupby to regroup the tree based on fields that do not exist | Check the spelling of the values passed to `groupby` and ensure the values exist in the tree |

### `PluginCredentialError`

Errors of the `PluginCredentialError` arise when the `path` or `method` fields are missing from a plugin's `initialize` block.

#### Messages

| message                                    | cause                                                                                  | remedy                                                                                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Initalization param 'method' is missing.` | The required `method` field is missing from the `initialize` block for a given plugin. | Ensure the `method` field is added to the `initialize` block for each plugin. The value should be the name of the function exported by the plugin.              |
| `Initalization param 'path' is missing.`   | The required `path` field is missing from the `initialize` block for a given plugin    | Ensure the `path` field is added to the `initialize` block for each plugin. The value should be the path to the directory in `if/node_modules` for your plugin. |

### `PluginInitalizationError`

Errors of the `PluginInitializationError` arise when a plugin is invoked in a pipeline without having been initialized in the `initialize` block of the manifest being executed.


| message                                                                                | cause                                             | remedy                                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Not initalized plugin: ${name}. Check if ${name} is in 'manifest.initalize.plugins'.` | a plugin invoked in a pipeline is not initialized | ensure all plugins that exist in pipelines across your manifest have been included in the manifest's `initialize` block |


### `WriteFileError`

Errors of the `WriteFileError` class are caused by problems writing output data to files.

#### Messages

| message                                          | cause                                    | remedy                                                                                                         |
| ------------------------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Failed to write CSV to ${outputPath}: ${error}` | There was a problem writing data to file | check that you have provided a valid output path and that you have valid permissions to write to that location |


## Plugin Errors

Plugins can emit their own custom error messages, but we still prefer those messages to be attached to one of a finite set of predefined error classes.
Those classes are listed in this section.

### `AuthorizationError`

Errors of the `AuthorizationError` class are caused by incorrect credentials being passed to an external API. This is only currently used in the `if-unofficial-plugins` because this is the only place third-party APIs are called.

`AuthorizationError` messages should have the following form:

`API name :: Problem description`

For example, here is a message emitted from the Watt-time plugin:

`WattTimeAPI: Missing token in response. Invalid credentials provided.'`

The remedy to messages of this type is to provide correct access credentials as defined by the API you are hitting.


### `APIRequestError`

Errors of the `APIRequestError` class are caused by a failing API request for any reason other than invalid credentials. This is only currently used in the `if-unofficial-plugins` because this is the only place third-party APIs are called.

The error message should have the following form:

`API name:: Problem description :: API error message`

For example, here is a message emitted from our Watt-time plugin:

`WattTimeGridEmissions: WattTime API supports up to 32 days. Duration of 31537200 seconds is too long.`

The remedy depends on the specific error message received. In general we recommned visiting the API documentation for the specific service you are trying to use and ensuring your request is built to their specification.


### `InputValidationError`

Errors of the `InputValidationError` class arise because your plugin is not receiving the data it expects in `input` data, global config or node-level config.
The specific messages depend on the plugin. It is expected that the messages emitted by each plugin are listed in their own documentation.

The example below is a message emitted by the `interpolation` plugin when the `method` given in global config is *not* one of the expected enum variants:

`InputValidationError:   "interpolation" parameter is invalid enum value. expected 'spline' | 'linear', received 'dummy'. Error code: invalid_enum_value.`


### `UnsupportedValueError`

Errors of the `UnsupportedValueError` class are emitted when a given API query parameter is not one from an expected set. It is typically used when we do not know in advance that a value is invalid, but we can tell from the API response that the value caused the request to fail. For example, providing a server name to the Cloud Carbon Footprint API that is not found in their database.

The example below is raised by the `Boavizta` plugin when the given `provider` is not recognized by the service.

`UnsupportedValidationError: "BoaviztaCloudOutput: Invalid 'provider' parameter 'aws1'. Valid values are aws.`


### `ConfigValidationError`

Errors of the `ConfigValidationError` are used when part of the config data provided to a plugin is invalid or missing.

For example the `Divide` plugin throws a `ConfigValidationError` when it receives a denominator equal to zero. 

The message should name the config element that was invalid and describe the reason why. For example:

`ConfigValidationError: "denominator" parameter is number must be greater than 0. Error code: too_small.`


### `ReadFileError`

Errors of the `ReadFileError` occur due to a problem reading data from a file. The error should include the file path and the system error that was encountered when IF attempted to read data from the file:

`ReadFileError: Error reading file ${filePath}: ${error}`

For example, the following error arises when IF attempts to open a file, `missing-data.csv`, that does not exist:

`ReadFileError: Error reading file missing-data.csv: missing-data.csv: No such file or directory`


### `WriteFileError`

Errors of the `WriteFileError` occur due to a problem writing data to a file. Typically, this can occur when the user does not have sufficient permissions to write to a given file.

For example, the following error arises when IF's `csv-export` plugin attempts to write to a file (`no-entry.csv`) without the correct permissions:

`WriteFileError: CsvExport: Failed to write CSV to no-entry.csv Error: Permission denied.`


## `MakeDirectoryError`

Errors of the `MakeDirectoryError` occur due to a problem creating a new directory in the local filesystem. Typically, this can occur when the user does not have sufficient permissions.

For example, the following error arises when IF's `csv-export` plugin attempts to create a directory (`/nope`) without the correct permissions:

`MakeDirectoryError: CsvExport: Failed to create directory for CSV at path: /nope. Error: Permission denied.`



## Capturing errors in manifests

When you run a [manifest](../major-concepts/manifest-file.md), IF generates output data and either displays it in the console or saves it to a file. If IF or one of the plugins being executed throws an exception, IF can still return an output file, except instead of adding `outputs`, it captures the error message that caused IF to fail in the manifest's `execution` section. Inside the `execution` section, you will find two fields: `status` and `error`. The `status` field is either `success` or `fail`, and the `error` field contains the error message.

For example, the following is an output file generated by running a manifest whose `input` data omitted the required `duration` field:

```yaml
name: basic-error-demo
description:
tags:
initialize:
  plugins:
    teads-curve: 
      path: '@grnsft/if-unofficial-plugins'
      method: TeadsCurve
      global-config:
        interpolation: spline
  outputs:
    - yaml
execution:
  status: fail
  error: 'InputValidationError: "duration" parameter is required. Error code: invalid_type'.
tree:
  children:
    child-0:
      defaults:
        cpu/thermal-design-power: 100
      pipeline:
        - teads-curve
      inputs:
        - timestamp: 2023-07-06T00:00
          cpu/utilization: 20
```

No configuration is necessary - this is the default behaviour for IF if the output is configured to save to yaml and the manifest has an error causing IF to fail.
