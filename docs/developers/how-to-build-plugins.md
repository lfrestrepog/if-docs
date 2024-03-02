---
sidebar-position: 1
---

# How to build plugins

The IF is designed to be as composable as possible. This means you can develop your own plugins and use them in a pipeline.
To help developers write Typescript plugins to integrate easily into IF, we provide the `PluginInterface` interface. Here's an overview of the stages you need to follow to integrate your plugin:

- create a Typescript file that implements the `PluginInterface`
- install the plugin
- initialize and invoke the plugin in your manifest file

## The plugin interface

The `PluginInterface` is structured as follows:

```ts
export type PluginInterface = {
  execute: (
    inputs: PluginParams[],
    config?: Record<string, any>
  ) => PluginParams[];
  metadata: {
    kind: string;
  };
  [key: string]: any;
};
```

The interface requires an execute function where your plugin logic is implemented. It should also return metadata. This can include any relevant metadata you want to include, with a minimum requirement being `kind: execute`. 


## Global config

Global config is passed as an argument to the plugin. In your plugin code you can handle it as follows:

```ts
// Here's the function definition - notice that global config is passed in here!
export const Plugin = (globalConfig: YourConfig): PluginInterface => {

// in here you have access to globalConfig[your-params]

}
```

The parameters available to you in `globalConfig` depends upon the parameters you pass in the manifest file. For example, the `Sum` plugin has access to `input-parameters` and `output-parameter` in its global config, and it is defined in the `Initialize` block in the manifest file as follows:

```yaml
initialize:
  plugins:
    sum:
      method: Sum
      path: '@grnsft/if-plugins'
      global-config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
```


## Methods

### execute

`execute()` is where the main calculation logic of the plugin is implemented. It always takes `inputs` (an array of `PluginParams`) as an argument and returns an updated set of `inputs`.

#### Params

| Param    | Type             | Purpose                                                                        |
| -------- | ---------------- | ------------------------------------------------------------------------------ |
| `inputs` | `PluginParams[]` | Array of data provided in the `inputs` field of a component in a manifest file |

#### Returns

| Return value | Type                      | Purpose                                                     |
| ------------ | ------------------------- | ----------------------------------------------------------- |
| `outputs`    | `Promise<PluginParams[]>` | `Promise` resolving to an array of updated `PluginParams[]` |


## What are `PluginParams`?

`PluginParams` are a fundamental data type in the Impact Framework. The type is defined as follows:

```ts
export type PluginParams = {
  [key: string]: any;
};
```

The `PluginParams` type therefore defines an array of key-value pairs.

IF needs to know about all the parameters used in each pipeline. The default behaviour is that it grabs parameters from a local file, `params.ts`. This file defines the standard set of parameter names, their units, a descriptiona nd the method used to aggregate them across time or across a tree.

If your new plugin uses new parameters that are not included in `params.ts`, you can simply add them to your manifest file in a section named `params`. For example:


```yaml
name: params-demo
description: null
tags:
params: 
  - name: new-param-1
    description: dummy
    aggregation: sum
    unit: MT
  - name: new-param-2
    description: dummy
    aggregation: sum
    unit: s
```

This will append the new parameter informatrion to the object loaded from `params.ts` and you can use your plugin as normal. In effect, you have append-only access to `params.ts` via your manifest file without ever having to change any IF source code.

However, if you are an advanced user and you want to use something other than out recommended standard set of parameters, you can provide a replacement `params.ts` file on the command line. This file should be a `json` or `js`/`ts` file with the ame structure as our `params.ts`. You can rename the file. You then pass the path to the file to the `override-params` command.

```sh
if --manifest <path-to-manifest> --override-params <path-to-your-params-file>
```

## Summary of steps

- Create a new plugin conforming to the `Plugin` interface
- Complete the actual plugin logic in the `execute` method, returning an array of `PluginParams`
- Add any new values to the `params` field in your manifest file.

You should also create unit tests for your plugin to demonstrate correct execution and handling of corner cases.

## Walk-through

To demonstrate how to build a plugin that conforms to this interface, let's examine the simple `sum` plugin.

The `sum` plugin implements the following logic:

- sum whatever is provided in the `input-parameters` field from `globalConfig`.
- append the result to each element in the output array with the name provided as `output-parameter` in `globalConfig`.

Let's look at how you would manifestement this from scratch:

The plugin must be a function conforming to `PluginInterface`. You can call the function `Sum`, and inside the body you can add the signature for the `execute` method:

```typescript
export const Sum = (globalConfig: SumConfig): PluginInterface => {
  const errorBuilder = buildErrorMessage(Sum.name);
  const metadata = {
    kind: 'execute',
  };

  /**
   * Calculate the sum of each input.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {

  };

  return {
    metadata,
    execute,
  };

}
```

Your plugin now has the basic structure required for IF integration. Your next task is to add code to the body of `execute` to enable the actual plugin logic to be implemented.

The `execute` function should grab the `input-parameters` (the values to sum) from `globalConfig`. It should then iterate over the `inputs` array, get the values for each of the `input-parameters` and append them to the `inputs` array, using the name from the `output-parameter` value in `globalConfig`. Here's what this can look like, with the actual calculation pushed to a separate function, `calculateSum`. 

```ts
  /**
   * Calculate the sum of each input.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    const inputParameters = globalConfig['input-parameters'];
    const outputParameter = globalConfig['output-parameter'];

    return inputs.map(input => {
      return {
        ...input,
        [outputParameter]: calculateSum(input, inputParameters),
      };
    });

  return {
    metadata,
    execute,
  };

}
```

Now we just need to define what happens in `calculateSum` - this can be a simple `reduce`:

```ts
  /**
   * Calculates the sum of the energy components.
   */
  const calculateSum = (input: PluginParams, inputParameters: string[]) =>
    inputParameters.reduce(
      (accumulator, metricToSum) => accumulator + input[metricToSum],
      0
    );
```

Note that this example did not include any validation or error handling - you will likely want to add some for a real plugin.

Finally, if your plugin used any fields in `inputs` or created new `outputs` that have not been used in the Impact Framework before, then you should add them to `params.ts`.

`params.ts` can be found in the path `src/config`.

Each entry in `params.ts` looks as follows:

```yaml
carbon:
  description: an amount of carbon emitted into the atmosphere
  unit: gCO2e
  aggregation: sum
```

This information allows `if` to programmatically make decisions about how to handle values in features such as aggregation, time normalization and visualizations, and also acts as a global reference document for understanding IF data. The example above is for `carbon`.

You should add your new data, give a name, define a unit and short description. The `aggregation` field determines how the value is treated when some manipulation has to be done to spread the value over time or aggregate it.

For absolute metrics like carbon, the right value is `sum` because you would want to add carbon emissions from each timestep when you aggregate over time.

For proportional metrics, the right value is `avg`. For example, you would want to calculate the average `cpu/utilization` - it would not make sense to sum it when aggregating over multiple timesteps.

Finally, values that should always be presented identically regardless of any aggregation, such as names or global constants, should be given the `aggregation-method` value `none`.

Now you are ready to run your plugin using the `if` CLI tool!

## Running your plugin

### Linking local plugin

For using locally developed plugin in `if` please follow these steps:

1. On the root level of a locally developed plugin run `npm link`, which will create a global package. It uses `package.json` file's `name` field as a package name. Additionally, name can be checked by running `npm ls -g --depth=0 --link=true`.

2. Use the linked plugin in manifest by specifying `name`, `method`, `path` in the `initialize` block in the manifest file.


Alternatively you can `npm run build` inside your plugin repository and then `npm install <your-plugin-repository-path>`.

### Using plugin directly from github

You can simply save your plugin in a public Github repository and pass the path to it in your manifest.

For example, for a plugin saved in `github.com/my-repo/my-plugin` you can do the following:

npm install your plugin:

```
npm install https://github.com/my-repo/my-plugin
```

Then, in your manifest file, provide the path in the plugin instantiation. You also need to specify which function the plugin instantiates. Let's say you are using the `Sum` plugin from the example above:

```yaml
name: plugin-demo
description: loads plugin
tags: null
initialize:
  plugins:
    my-plugin:
      kind: plugin
      method: Sum
      path: https://github.com/my-repo/my-plugin
tree:
  children:
    child:
      config:
      inputs:
```

Now, when you run the manifest file using the `if`, it will load the plugin automatically.

For local development we recommend running with `npm run`:

```sh
npm run if -- --manifest <path-to-your-manifest> --output <path-to-save-output>
```

For production use, you should globally install the latest release of the framework and your plugin and use the following command to run it:

```sh
if --manifest <path-to-your-manifest>
```
