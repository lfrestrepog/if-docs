---
sidebar-position: 1
---

# How to build plugins

The IF is designed to be as composable as possible. This means you can develop your own plugins and use them in a pipeline.
To help developers write Typescript plugins to integrate easily into IF, we provide the `PluginInterface` interface. Here's an overview of the stages you need to follow to integrate your plugin:

- create a Typescript file that implements the `PluginInterface`
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


### Global config

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
      path: 'builtin'
      global-config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
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
if-run --manifest <path-to-manifest> --override-params <path-to-your-params-file>
```

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
      global-config:
        something: true 
```

Run your manifest uisng

```sh
np run if-run -- --manifest <path-to-manifest>
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

To demonstrate how to build a plugin that conforms to the `pluginInterface`, let's examine the `sum` plugin.

The `sum` plugin implements the following logic:

- sum whatever is provided in the `input-parameters` field from `globalConfig`.
- append the result to each element in the output array with the name provided as `output-parameter` in `globalConfig`.

Let's look at how you would implement this from scratch:

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

The `execute` function should grab the `input-parameters` (the values to sum) from `globalConfig`. it should then iterate over the `inputs` array, get the values for each of the `input-parameters` and append them to the `inputs` array, using the name from the `output-parameter` value in `globalConfig`. Here's what this can look like, with the actual calculation pushed to a separate function, `calculateSum`. 

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

This information allows IF to programmatically make decisions about how to handle values in features such as aggregation, time normalization and visualizations, and also acts as a global reference document for understanding IF data. The example above is for `carbon`.

You should add your new data, give a name, define a unit and short description. The `aggregation` field determines how the value is treated when some manipulation has to be done to spread the value over time or aggregate it.

For absolute metrics like carbon, the right value is `sum` because you would want to add carbon emissions from each timestep when you aggregate over time.

For proportional metrics, the right value is `avg`. For example, you would want to calculate the average `cpu/utilization` - it would not make sense to sum it when aggregating over multiple timesteps.

Finally, values that should always be presented identically regardless of any aggregation, such as names or global constants, should be given the `aggregation-method` value `none`.

Now you are ready to run your plugin using the `if-run` CLI tool!
