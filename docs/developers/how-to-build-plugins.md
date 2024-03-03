---
sidebar-position: 1
---

# How to build model plugins

The IF is designed to be as composable as possible. This means you can develop your own models and use them in a model pipeline.
To help developers write Typescript models to integrate easily into IF, we provide the `ModelPluginInterface` interface. Here's an overview of the stages you need to follow to integrate your model:

- create a Typescript file that implements the `ModelPluginInterface`
- install the model
- initialize and invoke the model in your manifest file

## The model interface

The `ModelPluginInterface` is structured as follows:

```ts
export interface ModelPluginInterface {
  /**
   * Configures instance with given params.
   */
  configure(params: object | undefined): Promise<ModelPluginInterface>;

  /**
   * Calculates `output` based on given model's `input`.
   */
  execute(inputs: ModelParams[]): Promise<ModelParams[]>;
}
```

## Methods

### configure

`Configure()` applies any model configuration required by the model, such as setting values of global constants during model initialization.

#### Params

| Param    | Type                  | Purpose                                          |
| -------- | --------------------- | ------------------------------------------------ |
| `params` | `object or undefined` | optional model config data passed as an `object` |

#### Returns

| Return value | Type                            | Purpose                                                          |
| ------------ | ------------------------------- | ---------------------------------------------------------------- |
| `model`      | `Promise<ModelPluginInterface>` | `Promise` resolving to an instance of the `ModelPluginInterface` |

### execute

`execute()` is where the main calculation logic of the model is implemented.

#### Params

| Param    | Type            | Purpose                                                                        |
| -------- | --------------- | ------------------------------------------------------------------------------ |
| `inputs` | `ModelParams[]` | Array of data provided in the `inputs` field of a component in a manifest file |

#### Returns

| Return value | Type                     | Purpose                                                    |
| ------------ | ------------------------ | ---------------------------------------------------------- |
| `outputs`    | `Promise<ModelParams[]>` | `Promise` resolving to an array of updated `ModelParams[]` |

## What are `ModelParams`?

`ModelParams` are a fundamental data type in the Impact Framework. The type is defined as follows:

```ts
export type ModelParams = {
  [key: string]: any;
};
```

The `ModelParams` type therefore defines an array of key-value pairs.

IF needs to know about all the parameters used in each model pipeline. The default behaviour is that it grabs parameters from a local file, `params.ts`. This file defines the standard set of parameter names, their units, a descriptiona nd the method used to aggregate them across time or across a graph.

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
ie --manifest <path-to-manifest> --override-params <path-to-your-params-file>
```

## Summary of steps

- Create a new model conforming to the `ModelPlugin` interface
- Complete any global configuration in the `configure` method, returning an instance of the `ModelPlugin`
- Complete the actual model logic in the `execute` method, returning an array of `ModelParams`
- Add any new values to the `params` field in your manifest file.

You should also create unit tests for your model to demonstrate correct execution and handling of corner cases.

## Walk-through

To demonstrate how to build a model that conforms to this interface, let's examine the simple `sci-e` model.

The `sci-e` model implements the following logic:

- sum whatever is available in the `input` data from `energy-network`, `energy-cpu`, `energy-memory` or `energy-gpu`.
- append the result to the `energy` field in each object in the output array

Let's look at how you would implement this from scratch:

The model must be a class implementing the `ModelPlugin` interface. You can call the class `SciEModel`, and inside the body you can add the method signatures for each of the required methods. This will look as follows:

```typescript
export class SciEModel implements ModelPluginInterface {

  /**
   * Configures the SCI-E Plugin.
   */
  public async configure(): Promise<ModelPluginInterface> {
    return Promise.resolve(this);
  }

  /**
   * Calculate the total emissions for a list of inputs.
   */
  public async execute(inputs: ModelParams[]): Promise<ModelParams[]> {
    return inputs
  }
```

our model now has the basic structure required for IF integration. Your next task is to add code to the body of each method to enable the actual model logic to be implemented.

For `sci-e` there is no global configuration required. Everything that the model needs to run is provided in each individual set of `input` data - there are no global constants or names to define during model instantiation. This means you can leave the `configure()` method as it is. It returns an instance of the `SciEmodel` class.

However, the `execute` function _does_ require some additional code.

In its current state, the `execute` function simply echoes the input data. Instead, we want to return a mutated version of the `input` data that has a new field: `energy`. The value for `energy` is the sum of whichever `energy-` metrics are available.

The snippet below shows an updated `execute()` method that includes a `map` over the contents of `inputs`. This `map` iterates over `inputs` and passes each element to a `calculateEnergy` method, appending the result to `inputs['energy']`. The array of data, with the new field appended to each object in the `inputs` array, is returned.

```ts
  /**
   * Calculate the total emissions for a list of inputs.
   */
  public async execute(inputs: ModelParams[]): Promise<ModelParams[]> {
    return inputs.map(input => {
      input['energy'] = this.calculateEnergy(input);

      return input;
    });
  }
```

Now, you can see what happened inside `calculateEnergy()`. `reduce` is applied over the object, accumulating the values of any fields that appear in the `energyMetrics` array. The sum is returned.

```ts
  /**
   * Calculates the sum of the energy components.
   */
  private calculateEnergy(input: ModelParams) {

    const energyMetrics = ['energy-cpu', 'energy-memory', 'energy-network'];

    return energyMetrics.reduce((acc, metric) => {
      acc += input[metric];

      return acc;
    }, 0);
  }
}
```

You will likely want to add some input data validation here too.

Finally, if your model used any fields in `inputs` or created new `outputs` that have not been used in the Impact Framework before, then you should add them to `params.ts`.

`params.ts` can be found in the path `src/config`.

Each entry in `params.ts` looks as follows:

```yaml
carbon:
  description: an amount of carbon emitted into the atmosphere
  unit: gCO2e
  aggregation: sum
```

This information allows `ie` to programmatically make decisions about how to handle values in features such as aggregation, time normalization and visualizations, and also acts as a global reference document for understanding IF data. The example above is for `carbon`.

You should add your new data, give a name, define a unit and short description. The `aggregation` field determines how the value is treated when some manipulation has to be done to spread the value over time or aggregate it.

For absolute metrics like carbon, the right value is `sum` because you would want to add carbon emissions from each timestep when you aggregate over time.

For proportional metrics, the right value is `avg`. For example, you would want to calculate the average `cpu-utilization` - it would not make sense to sum it when aggregating over multiple timesteps.

Finally, values that should always be presented identically regardless of any aggregation, such as names or global constants, should be given the `aggregation-method` value `none`.

Now you are ready to run your model using the `ie` CLI tool!

## Running your model

### Linking local model

For using locally developed model in `if` please follow these steps:

1. On the root level of a locally developed model run `npm link`, which will create a global package. It uses `package.json` file's `name` field as a package name. Additionally, name can be checked by running `npm ls -g --depth=0 --link=true`.

2. Use the linked model in impl by specifying `name`, `model`, `path` in initialize models section.

### Using model directly from github

You can simply save your model in a public Github repository and pass the path to it in your impl.

For example, for a model saved in `github.com/my-repo/my-model` you can do the following:

npm install your model:

```
npm install https://github.com/my-repo/my-model
```

Then, in your manifest file, provide the path in the model instantiation. You also need to specify which class the model instantiates. Let's say you are using the `sci-e` model from the example above:

```yaml
name: model-demo
description: loads model
tags: null
initialize:
  models:
    - name: my-model
      kind: plugin
      model: SciEModel
      path: https://github.com/my-repo/my-model
graph:
  children:
    child:
      config:
      inputs:
```

Now, when you run the manifest file using the `ie`, it will load the model automatically.

For local development we recommend running with `npm run`:

```sh
npm run ie --manifest <path-to-your-impl> --output <path-to-save-output>
```

For production use, you should globally install the latest release of the framework and your model and use the following command to run it:

```sh
ie --manifest <path-to-your-manifest>
```
