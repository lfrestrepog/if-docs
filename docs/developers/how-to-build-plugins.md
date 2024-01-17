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

`ModelParams` are a fundamental data type in the Impact Framework.  The type is defined as follows:

```ts
export type ModelParams = {
  [K in UnitKeyName]?: any;
};
```

The `ModelParams` type therefore defines an array of key-value pairs. The keys must exist in the `UnitKeys` array in `units.ts`, so if your new model uses some novel input values or generates some metric that hasn't been used in IF before, then you will have to add them to that array.

You should also add any keys that are new to IF to the `units.yaml` file in `src/config` following the existing structure.


## Summary of steps

- Create a new model conforming to the `ModelPlugin` interface
- Complete any global configuration in the `configure` method, returning an instance of the `ModelPlugin`
- Complete the actual model logic in the `execute` method, returning an array of `ModelParams`
- Add any new values to `units.yaml` and `units.ts`

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

However, the `execute` function *does* require some additional code. 

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

Now, you can see what happened inside `calculateEnergy()`. `reduce` is applied over the object, accumulating tha values of any fields that appear in the `energyMetrics` array. The sum is returned.

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

You will likely want add some input data validation here too.

Finally, if your model used any fields in `inputs` or created new `outputs` that have not been used in the Impact Framework before, then you should add them to `units.yaml` and `units.ts`. 

`Units.yaml` can be found at the path `src/config/units.yaml`.

Each entry in `units.yaml` looks as follows:

```yaml
carbon:
  description: an amount of carbon emitted into the atmosphere
  unit: gCO2e
  aggregation: sum
```

This information allows `impact-engine` to programmatically make decisions about how to handle values in features such as aggregation, time normalization and visualizations, and also acts as a global reference document for understanding IF data. The example above is for `carbon`. 

You should add your new data, giving a name, defining a unit and short description. The `aggregation` field determines how the value is treated when some manipulation has to be done to spread the value over time or aggregate it. 

For absolute metrics like carbon, the right value is `sum` because you would want to add carbon emissions from each timestep when you aggregate over time. 

For proportional metrics, the right value is `avg`. For example, you would want to calculate the average `cpu-utilization` - it would not make sense to sum it when aggregating over multiple timesteps.

Finally, values that should always be presented identically regardless of any aggregation, such as names or global constants, should be given the `aggregation-method` value `none`.


`units.ts` can be found at the path `src/types/units.ts`.

Inside `units.ts` is an array, `UnitKeys`:

```ts
export const UnitKeys = [
  'carbon',
  'core-units',
  'cpu-util',
  ...
]
```

You can simply add your metric name to this array. This lets the IF know that it is a recognized parameter that can be included in `ModelParams`.

Now you are ready to run your model using the `impact-engine` CLI tool!

## Running your model

### Linking local model

For using locally developed model in `if` please follow these steps: 

1. On the root level of a locally developed model run `npm link`, which will create global package. It uses `package.json` file's `name` field as a package name. Additionally name can be checked by running `npm ls -g --depth=0 --link=true`.

2. Use the linked model in impl by specifying `name`, `model`, `path` in initialize models section. 

### Using model from directly from github

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
...

```

Now, when you run the manifest file using the `impact-engine`, it will load the model automatically.

For local development we recommend running with `npm run`:

```sh
npm run impact-engine --impl <path-to-your-impl> --ompl <path-to-save-output>
```

For production use, you should globally install the latest release of the framework and your model and use the following command to run it:

```sh
impact-engine --impl <path-to-your-impl>
```
