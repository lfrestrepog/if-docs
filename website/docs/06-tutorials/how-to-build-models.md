# Building model plugins

The IF is designed to be as composable as possible. This means you can develop your own models and use them in a model pipeline. 
To help developers write Typescript models to integrate easily into IF, we provide the `IOutputModelInterface` interface. Here's an overview of the stages you need to follow to integrate your model:

- create a Typescript file that implements the `IOutputModelInterface`
- provide the path to the model to the IF command line tool.

## The model interface

The `IOutputModelInterface` is structured as follows:

```ts
export interface IOutputModelInterface {
  modelIdentifier(): string;

  configure(
    name: string,
    staticParams: object | undefined
  ): Promise<IOutputModelInterface>;

  authenticate(authParams: object): void;

  execute(inputs: object | object[] | undefined): Promise<any[]>;
}
```

There are four required methods:

- `modelIdentifier()`
  - This method simply returns the model name
  - **Params**: None
  - **Returns**: 
    - the model name as a `string`
- `configure()`
  - This method completes any configuration steps for the model, such as loading config data from the `impl` file.
  - **Params**: None
    - `name`: the model name
    - `staticParams`: the model config data 
  - **Returns**: 
    - an instance of `IOutputModelInterface`
- `authenticate()`
  - This method completes any authorization, such as handling API keys or generating tokens
  - **Params**: 
    - `authParams`: an object containing authorization parameters
  - **Returns**:
    - None
- `execute()`
  - This is where the main calculation logic of the model is implemented.
  - **Params**:
    - `inputs`: the data provided in the `inputs` field of the `impl`
  - **Returns**:
    - An array containing the input data plus any additional fields resulting from the model calculations.


## Walk-through

To demonstrate how to build a model that conforms to this interface, let's examine the simple `sci-e` model.

The model itself is an exported class conforming to the `IOutputmodelInterface`, so the model code can start with the class definition. You can call the class `SciEModel`, and inside the body you can add the method signatures for each of the required methods. This will look as follows:  

```typescript
export class SciEModel implements IOutputModelInterface {
  authParams: object | undefined;
  name: string | undefined;

  authenticate(authParams: object): void {

  }

  async configure(
    name: string,
    staticParams: object | undefined = undefined
  ): Promise<IOutputModelInterface> {

  }

  async execute(inputs: object | object[] | undefined): Promise<any[]> {
    ;
  }

  modelIdentifier(): string {
  }
}
```

Building your model is a case of adding logic to each of the method bodies. The `sci-e` model is a simple summation of input values. There are no external API calls involved, and no authorization steps. Therefore, the `authenticate()` method can be very simple - nothing needs to be executed in it. You can simply instantiate the class variable `this.authParams` with the `authParams` being passed in as input data, which is an empty object. Your `authenticate()` method can look as follows:

```ts
  authenticate(authParams: object): void {
    this.authParams = authParams;
  }
```

The `configure()` method simply has to load config data into the class variables. You can assign the method arguments to their associated class variables and return the instance, as follows:

```ts
  async configure(
    name: string,
    staticParams: object | undefined = undefined
  ): Promise<IOutputModelInterface> {
    this.name = name;
    this.staticParams = staticParams;

    if (staticParams === undefined) {
      throw new Error('Required Parameters not provided');
    }
    return this;
  }
```

The `execute()` ethods is where all the actual model logic is implemented. For `sci-e` the model simply has to return the sum of whichever of `e-cpu`, `e-net` and `e-mem` are available in the input data.

The method below includes some basic inpout value validation, then a `map` over the contents of `inputs`. This code iterates over each `inputs` and passes each element to a `calculateEnergy` method, appending the result to `inputs['energy']`. The array of data, with the new field appended, is returned. 

```ts
  async execute(inputs: object | object[] | undefined): Promise<any[]> {
    // basic validation
    if (inputs === undefined) {
      throw new Error('Required Parameters not provided');
    } else if (!Array.isArray(inputs)) {
      throw new Error('inputs must be an array');
    }

    return inputs.map((input: KeyValuePair) => {
      this.configure(this.name!, input);
      input['energy'] = this.calculateEnergy(input);

      return input;
    });
  }

```

Now, you can see what happened inside `calculateEnergy()`. First, the presence of at least one of the required input values, `energy-cpu`, `energy-memory`, or `energy-network` is confirmed. Then there are some basic checks on the validity of their values. Finally, the sum of the values is returned.

```ts
private calculateEnergy(input: KeyValuePair) {
let e_mem = 0;
let e_net = 0;
let e_cpu = 0;

if (
    !('energy-cpu' in input) &&
    !('energy-memory' in input) &&
    !('energy-network' in input)
) {
    throw new Error(
    'Required Parameters not provided: at least one of energy-memory, energy-network or energy must be present in input'
    );
}

// If the user gives a negative value it will default to zero.
if ('energy-cpu' in input && input['energy-cpu'] > 0) {
    e_cpu = input['energy-cpu'];
}
if ('energy-memory' in input && input['energy-memory'] > 0) {
    e_mem = input['energy-memory'];
}
if ('energy-network' in input && input['energy-network'] > 0) {
    e_net = input['energy-network'];
}

return e_cpu + e_net + e_mem;
}
```

You can replace the logic inside `execute()` with whatever you need for your specific model implementation. As long as you conform to the interface, meaning youy provide methods with the expected parameters and return types, your model will integrate with IF.

## Running your model