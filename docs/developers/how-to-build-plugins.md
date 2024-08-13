---
sidebar-position: 1
---

# How to build plugins

The IF is designed to be as composable as possible. This means you can develop your own plugins and use them in a pipeline.
To help developers write Typescript plugins to integrate easily into IF, we provide the `ExecutePlugin` interface. Here's an overview of the stages you need to follow to integrate your plugin:

- create a Typescript file that implements the `ExecutePlugin`
- install the plugin
- initialize and invoke the plugin in your manifest file

## Step 1: Use our template repository

Instead of building up your plugin repository and all the configuration from scratch, you can use our [plugin template repository](https://github.com/Green-Software-Foundation/if-plugin-template). To use the template, visit the Github repository and click the `Use this template` button. You will have the option to `create a new repository` under your own account. Then, you can clone that repository to your local machine.

![use our template repository](../../static/img/template-repo.png)

Inside that repository, all you have to do is run `npm install typescript` in the template folder, rename the project in `package.json` and write your plugin code inside `index.ts`. All the configuration and setup is taken care of for you.

## Step 2: Writing your plugin code

Now your project is setup, you can focus on your plugin logic. The entry point for your plugin is `index.ts`. In this guide it is assumed that all your plugin logic is in `index.ts` but depending on the copmplexity of your plugin you might want to split the code across multiple files. `index.ts` should always be your entry point, though.

The following sections describe the rules your plugin code should conform to. We also have an [appendix](#appendix-walk-through-of-the-sum-plugin) that deep dives a real plugin.

### The plugin interface

The `ExecutePlugin` is structured as follows:

```ts
export type ExecutePlugin = {
  execute: (
    inputs: PluginParams[],
    config?: Record<string, any>
  ) => PluginParams[];
  metadata: {
    kind: string;
    inputs?: ParameterMetadata;
    outputs?: ParameterMetadata;
  };
  [key: string]: any;
};
```

The interface requires an execute function where your plugin logic is implemented. It should also return metadata. This can include any relevant metadata you want to include, with a minimum requirement being `kind: execute`.

### Config

Config is passed as an argument to the plugin. In your plugin code you can handle it as follows:

```ts
// Here's the function definition - notice that config is passed in here!
export const Plugin = (
  config: YourConfig,
  parametersMetadata: PluginParametersMetadata
): ExecutePlugin => {
  // in here you have access to config[your-params]
};
```

The parameters available to you in `config` depends upon the parameters you pass in the manifest file. For example, the `Sum` plugin has access to `input-parameters` and `output-parameter` in its config, and it is defined in the `Initialize` block in the manifest file as follows:

```yaml
initialize:
  plugins:
    sum:
      method: Sum
      path: 'builtin'
      config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
```

### Parameter metadata

The `parameter-metadata` is passed as an argument to the plugin as the config. It contains information about the `description` and `unit` of the parameters of the inputs and outputs that defined in the manifest.

```yaml
initialize:
  plugins:
    sum:
      method: Sum
      path: 'builtin'
      config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy-sum'
      parameter-metadata:
        inputs:
          cpu/energy:
            description: energy consumed by the cpu
            unit: kWh
          network/energy:
            description: energy consumed by data ingress and egress
            unit: kWh
        outputs:
          energy-sum:
            description: sum of energy components
            unit: kWh
```

### Methods

#### execute

`execute()` is where the main calculation logic of the plugin is implemented. It always takes `inputs` (an array of `PluginParams`) as an argument and returns an updated set of `inputs`.

#### Params

| Param    | Type             | Purpose                                                                        |
| -------- | ---------------- | ------------------------------------------------------------------------------ |
| `inputs` | `PluginParams[]` | Array of data provided in the `inputs` field of a component in a manifest file |

#### Returns

| Return value | Type                      | Purpose                                                     |
| ------------ | ------------------------- | ----------------------------------------------------------- |
| `outputs`    | `Promise<PluginParams[]>` | `Promise` resolving to an array of updated `PluginParams[]` |

### What are `PluginParams`?

## What are `PluginParams`?

`PluginParams` are a fundamental data type in the Impact Framework. The type is defined as follows:

```ts
export type PluginParams = {
  [key: string]: any;
};
```

The `PluginParams` type therefore defines an array of key-value pairs.

## Step 3: Install your plugin

Now your plugin code is written, you can install it to make it available to IF.

```sh
npm run build
```

Then use `npm link` to create a package that can be installed into IF:

```sh
npm link
```

## Step 4: Load your plugin into IF

Now your plugin is ready to run in IF. First install your plugin by navigating to the `if` project folder and running:

```sh
npm link new-plugin
```

replacing `new-plugin` with your plugin name as defined in the plugin's `package.json`. If you are not sure, the name can be checked by running `npm ls -g --depth=0 --link=true`.

Your plugin is now ready to be run in IF. All that remains is to add your plugin to your manifest file. This means adding it to the `initialize block` and adding it to the component pipelines where you want your plugin to be executed. For example, an `initilize` block might look as follows:

```yaml
initialize:
  plugins:
    new-plugin:
      method: YourFunctionName
      path: 'new-plugin'
      config:
        something: true
```

Run your manifest uisng

```sh
npm run if-run -- --manifest <path-to-manifest>
```

If you have to link more than one local plugin, for example to test your plugin in a pipeline, you can do so with

```sh
npm link new-plugin --save
```

This will create an entry like `"new-plugin": "file:path/to/your/plugin"` in the `package.json` which links to your local plugin. This way, multiple plugins can be linked at once. Of course, these changes should not be committed, but they can be helpful for local testing.

## Step 5: Publishing your plugin

Now you have run your plugin locally and you are happy with how it works, you can make it public by publishing it to a public Github repository. Now all you have to do to use it in a manifest file is `npm install` it and pass the path to the Github repository in the plugin `initialize` block.

For example, for a plugin saved in `github.com/my-repo/new-plugin` you can do the following:

```
npm install https://github.com/my-repo/new-plugin
```

Then, in your manifest file, provide the path in the plugin instantiation. You also need to specify which function the plugin instantiates. Let's say you are using the `Sum` plugin from the example above:

```yaml
name: plugin-demo
description: loads plugin
tags: null
initialize:
  plugins:
    - name: new-plugin
      kind: plugin
      method: FunctionName
      path: https://github.com/my-repo/new-plugin
tree:
  children:
    child:
      config:
      inputs:
```

Now, when you run the manifest file, it will load the plugin automatically.

You can run this using the globally installed IF as follows:

```sh
if-run --manifest <path-to-my-manifest>
```

## Summary of steps

- Copy our template repository and update `package.json`
- Add your plugin code to `index.ts`
- Build and link the plugin using `npm run build && npm link`
- Load your plugin into `if` using `npm link`
- Initialize your plugin and add it to a pipeline in your manifest file.
- Publish your plugin to Github

You should also create unit tests for your plugin to demonstrate correct execution and handling of corner cases.

## Next steps

You can read our more advanced guide on [how to refine your plugins](./how-to-refine-plugins.md).

## Appendix: Walk-through of the Sum plugin

To demonstrate how to build a plugin that conforms to the `ExecutePlugin`, let's examine the `sum` plugin.

The `sum` plugin implements the following logic:

- sum whatever is provided in the `input-parameters` field from `config`.
- append the result to each element in the output array with the name provided as `output-parameter` in `config`.

Let's look at how you would implement this from scratch:

The plugin must be a function conforming to `ExecutePlugin`. You can call the function `Sum`, and inside the body you can add the signature for the `execute` method:

```typescript
export const Sum = (
  config: SumConfig,
  parametersMetadata: PluginParametersMetadata
): ExecutePlugin => {
  const errorBuilder = buildErrorMessage(Sum.name);
  const metadata = {
    kind: 'execute',
    inputs: parametersMetadata?.inputs,
    outputs: parametersMetadata?.outputs,
  };

  /**
   * Calculate the sum of each input.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {};

  return {
    metadata,
    execute,
  };
};
```

Your plugin now has the basic structure required for IF integration. Your next task is to add code to the body of `execute` to enable the actual plugin logic to be implemented.

The `execute` function should grab the `input-parameters` (the values to sum) from `config`. it should then iterate over the `inputs` array, get the values for each of the `input-parameters` and append them to the `inputs` array, using the name from the `output-parameter` value in `config`. Here's what this can look like, with the actual calculation pushed to a separate function, `calculateSum`.

```ts
/**
 * Calculate the sum of each input.
 */
const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
  const inputParameters = config['input-parameters'];
  const outputParameter = config['output-parameter'];

  return inputs.map((input) => {
    return {
      ...input,
      [outputParameter]: calculateSum(input, inputParameters),
    };
  });

  return {
    metadata,
    execute,
  };
};
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

## Managing errors

If framework provides it's own set of error classes which will make user's live much more easier!
[If Core](https://github.com/Green-Software-Foundation/if-core) plugin has a set of error classes which can be used for having full integration with the IF framework. More details about each error class can be found at [Errors Reference](../reference//errors.md)

Now you are ready to run your plugin using the `if-run` CLI tool!
