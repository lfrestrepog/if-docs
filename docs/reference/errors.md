# Errors

IF defines a finite set of error classes. All error messages emitted by IF are attached to one of these classes.

This page enumerates the error classes. For each error class, we list the messages associated with them along with the likely causes and possible remedies. This should help you to debug issues you are having with IF.

## IF errors

### `ParseCliParamsError`

Errors of this class are caused by invalid input arguments being passed to the [CLI](./cli.md).

#### Messages

| message                | cause                                              | remedy                                       |
| ---------------------- | -------------------------------------------------- | -------------------------------------------- |
| `Unknown option: -<x>` | Your cli command is not supported by the framework | add supported `-<x>` flag to yor run command |

### `ManifestValidationError`

Errors of the `ManifestValidationError` class arise due to a problem in the manifest (yaml) file. Validation of the manifest is done using the [Zod](https://zod.dev/) library.

The error message will be the error surfaced by Zod, and will include the name of the manifest element that is invalid. Since the set of error messages is very large and all conform to a simple schema, we do not list them exhaustively here, but instead demonstrate using the following example:

`ManifestValidationError: "initialize" parameter is required. Error code: invalid_type.`

You can infer from the error code that the issue is related to an invalid or missing value encountered during the manifest validation.
The message itself indicates that the problematic element is `initialize` and the problem is that it is missing.

The remedy for this issue is to add an `initialize` block into the manifest.

### `InvalidGroupingError`

Errors of the `InvalidGroupingError` are only emitted by the `regroup` feature. There is only one associated message; it is emitted when the requested groups do not exist in the tree.

| message                  | cause                                                                               | remedy                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `Invalid group ${type}.` | you are requested the feature to regroup the tree based on fields that do not exist | Check the spelling of the values passed to `regroup` and ensure the values exist in the tree |

### `WriteFileError`

Errors of the `WriteFileError` class are caused by problems writing output data to files. Typically, this can occur when the user does not have sufficient permissions to write to a given file.

#### Messages

| message                                          | cause                                    | remedy                                                                                                         |
| ------------------------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Failed to write CSV to ${outputPath}: ${error}` | There was a problem writing data to file | check that you have provided a valid output path and that you have valid permissions to write to that location |

### `CliSourceFileError`

Errors of the `CliSourceFileError` class are caused by problems with source manifest.

#### Messages

| message                                    | cause                                                    | remedy                                                 |
| ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------ |
| `Manifest is missing.`                     | Source manifest is not provided                          | check that you have provided a path to source manifest |
| `Given source file is not in yaml format.` | Source file is provided, but format is not a yaml format | check that you have provided valid yaml manifest       |

### `CliTargetFileError`

Errors of the `CliTargetFileError` class are caused by problems with target manifest.

| message                                    | cause                                                    | remedy                                           |
| ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------ |
| `Given target file is not in yaml format.` | Target file is provided, but format is not a yaml format | check that you have provided valid yaml manifest |

### `PluginInitializationError`

Errors of the `PluginInitializationError` arise when a plugin is invoked in a pipeline without having been initialized in the `initialize` block of the manifest being executed.

| message                                                                                | cause                                             | remedy                                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Not initalized plugin: ${name}. Check if ${name} is in 'manifest.initalize.plugins'.` | a plugin invoked in a pipeline is not initialized | ensure all plugins that exist in pipelines across your manifest have been included in the manifest's `initialize` block |
| `Provided module ${path} is invalid or not found. ${error ?? ''}`                      | a plugin invoked in a pipeline is not initialized | ensure all plugins that exist in pipelines across your manifest have been included in the manifest's `initialize` block |

### `InvalidAggregationMethodError`

Errors of the `InvalidAggregationMethodError` class are caused by problems in the configuration of the `aggregation` feature.

| message                                                                   | cause                                                              | remedy                                                                    |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `Aggregation is not possible for given ${metric} since method is 'none'.` | You are trying to aggregate a metric whose method is set to `none` | Update the aggregation method, or choose a different metric to aggregate. |

### `MissingAggregationParamError`

Errors of the `MissingAggregationParamError` class are caused by problems in the configuration of the `aggregation` feature. Typically, the aggregation method may be undefined or you have tried to aggregate a metric that IF cannot find in the input data.

#### Messages

| message                                                          | cause                                                                    | remedy                                                                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Aggregation metric ${metric} is not found in inputs[${index}].` | You are trying to aggegate a metric that doesn't exist in the input data | Check that your chosen metric is spelled correctly and that it exists in the input data by the time the `aggregate` feature executes. |

## `MissingPluginMethodError`

Errors of the `MissingPluginMethodError` class are caused by missing information in manifest's `initalize.plugins` section.

| message                                    | cause                                                                                  | remedy                                                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Initalization param 'method' is missing.` | The required `method` field is missing from the `initialize` block for a given plugin. | Ensure the `method` field is added to the `initialize` block for each plugin. The value should be the name of the function exported by the plugin. |

## `MissingPluginPathError`

Errors of the `MissingPluginPathError` class are caused by missing information in manifest's `initalize.plugins` section.

| message                                  | cause                                                                               | remedy                                                                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Initalization param 'path' is missing.` | The required `path` field is missing from the `initialize` block for a given plugin | Ensure the `path` field is added to the `initialize` block for each plugin. The value should be the path to the directory in `if/node_modules` for your plugin. |

## `InvalidExhaustPluginError`

Errors of the `InvalidExhaustPluginError` class are caused by using unsupported exhaust plugin.

| message                                  | cause                                                      | remedy                                                    |
| ---------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| `Invalid exhaust plugin: ${pluginName}.` | Unsupported or misspelled plugin was used as output method | Ensure the `pluginName` corresponds to supported plugins. |

## Plugin Errors

Plugins can emit their own custom error messages, but we still prefer those messages to be attached to one of a finite set of predefined error classes.
Those classes are listed in this section.

### `ConfigError`

Errors of the `ConfigError` are used when part of the config data provided to a plugin is invalid or missing.

For example the `Divide` plugin throws a `ConfigError` when it receives a denominator equal to zero.

The message should name the config element that was invalid and describe the reason why. For example:

`ConfigError: "denominator" parameter is number must be greater than 0. Error code: too_small.`

### `MissingInputDataError`

Errors of the `MissingInputDataError` class arise because your plugin is not receiving the data it expects in `input` data or config.
The specific messages depend on the plugin. It is expected that the messages emitted by each plugin are listed in their own documentation.

The example below is a message emitted by the `interpolation` plugin when the `method` given in config is _not_ one of the expected enum variants:

`MissingInputDataError:   "interpolation" parameter is invalid enum value. expected 'spline' | 'linear', received 'dummy'. Error code: invalid_enum_value.`

### `ProcessExecutionError`

Errors of the `ProcessExecutionError` class arise because `shell` plugin have faced problems while executing the script you have provided.

### `RegexMismatchError`

Errors of the `RegexMismatchError` class arise because `regex` plugin have faced problems while parsing given string with specified `regex`.

| message                                                 | cause                                                        | remedy                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `${input} does not match the ${match} regex expression` | Given string doesn't contain anything matching given `regex` | Ensure that input contains string which can be matched by your `regex`. |

### `FetchingFileError`

Errors of the `FetchingFileError` class arise because `csv-lookup` plugin have faced problems fetching given `url`.

| message                                  | cause                                   | remedy                               |
| ---------------------------------------- | --------------------------------------- | ------------------------------------ |
| `Failed fetching the file: ${filepath}.` | Fetching the file with given URL failed | Ensure that file's url is accessible |

### `ReadFileError`

Errors of the `ReadFileError` class arise because `csv-lookup` plugin have faced problems reading given file `path`. The error should include the file path and the system error that was encountered when IF attempted to read data from the file:

| message                                 | cause                                   | remedy                             |
| --------------------------------------- | --------------------------------------- | ---------------------------------- |
| `Failed reading the file: ${filepath}.` | Reading the file with given path failed | Ensure that file's path is correct |

### `MissingCSVColumnError`

Errors of the `MissingCSVColumnError` class arise because `csv-lookup` plugin can't access given csv file column.

| message                                            | cause                                | remedy                                                                      |
| -------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `There is no column with the name: ${columnName}.` | CSV file doens't contain such column | Ensure that specified `query` is correct and contains existing column name. |

### `QueryDataNotFoundError`

Errors of the `QueryDataNotFoundError` class arise because `csv-lookup` plugin can't find `query` related data in given CSV file.

| message                                                                                          | cause                                              | remedy                                                                                   |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `One or more of the given query parameters are not found in the target CSV file column headers.` | CSV file doens't contain data with given criteria. | Ensure that specified `query` and `input` values have intersection with CSV file's data. |

### `InvalidDateInInputError`

Errors of the `InvalidDateInInputError` class arise because `time-sync` plugin can't parse date from inputs.

| message                                             | cause                      | remedy                                              |
| --------------------------------------------------- | -------------------------- | --------------------------------------------------- |
| `Unexpected date datatype: ${typeof date}: ${date}` | Unsupported type for date. | Ensure that dates in inputs are correct timestamps. |

### `InvalidPaddingError`

Errors of the `InvalidPaddingError` class arise when there is misconfiguration of `time-sync` plugin.

| message                               | cause                                                                    | remedy                                     |
| ------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| `Avoiding padding at ${start or end}` | Error on padding is enabled and config is missing padding configuration. | Make sure padding is correctly configured. |

### `InvalidInputError`

Errors of the `InvalidInputError` class arise when there is input timestamps incompatibility while using `time-sync` plugin.

| message                                                | cause                          | remedy                                          |
| ------------------------------------------------------ | ------------------------------ | ----------------------------------------------- |
| `Observation timestamps overlap, please check inputs.` | Input timestamps have overlap. | Make sure that input timestamps are continuous. |

## `ExhaustOutputArgError`

Errors of the `ExhaustOutputArgError` class arise when there is output path issues while exporting file or exporting criteria misconfiguration.

| message                                                                    | cause               | remedy                                                     |
| -------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------- |
| `Output path is required, please make sure output is configured properly.` | Missed output path. | Make sure that output path is present in your cli command. |

## `CSVParseError`

Errors of the `CSVParseError` occur due to a problem reading CSV file. Typically, this can occur when provided file is not a CSV.

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
      config:
        interpolation: spline
execution:
  status: fail
  error: 'InputValidationError: "duration" parameter is required. Error code: invalid_type'.
tree:
  children:
    child-0:
      defaults:
        cpu/thermal-design-power: 100
      pipeline:
        observe:
        regroup:
        compute:
          - teads-curve
      inputs:
        - timestamp: 2023-07-06T00:00
          cpu/utilization: 20
```

No configuration is necessary - this is the default behaviour for IF if the output is configured to save to yaml and the manifest has an error causing IF to fail.
