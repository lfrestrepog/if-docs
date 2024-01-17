# How to make models production ready

Our [How to build plugins](./how-to-build-plugins.md) guide covered the basic for how to construct an Impact Framework plugin. This guide will help you to refine your mdoel to make it production ready. These are best practice guidelines - if you intend to contribute your plugin into one of our repositories, following these guidelines will help your PR to get merged. Even if you are not aiming top have a model merged into one of our repositories, consistency with our norms is useful for debugging and maintaining and for making your model as useful as possible for other Impact Framework developers.

## 1. Naming conventions

We prefer not to use abbreviations of contractions in parameter names. Using fully descriptive names makes the code more readable, which in turn helps reviewers and anyone else aiming to understand how the plugin works. It also helps to avoid ambiguity and naming collisions within and across plugins. Your names should describe what an element does as precisely as practically possible.

For example, we prefer `energy-cpu` to `e-cpu` and we prefer `functionalUnit` to `funcUnit`, `fUnit` or any other abbreviation.

**In Typescript code** we use lower Camel case (`likeThis`) for variable and function names and Pascal/Upper Camel case for class, type, enum and interface names (`LikeThis`). 

For example:
- `ShellModel` is the name for the class that implements the `Shell` model. 
- `sciPerSecond` is the name for the SCI value normalized per second.
- `energyMetrics` is the name for the array of energy metrics available to bve summed in the `sci-e` model

**In yaml files**, we prefer to use kebab-case (`like-this`) for field names. For example:

- `energy-network` is the field name for the energy consumed by networking for an application
- `functional-unit` is the unit in which to express an SCI value.

Global constants can be given capitalised names, such as `TIME_UNITS_IN_SECONDS`.

## 2. Repository structure

Plugins are expected to have a top-level `src` directory containing several subdirectories: `interfaces`, `types`, `__tests__`. The actual plugin code should be in `src/index.ts`.

```
plugin
 |- src
     |- interfaces
     |    |-index.ts  // interfaces used in the plugin defined here
     |- types
     |    |- index.ts // types used in the plugin defined here
     |- index.ts // plugin code in here

```

Interfaces must include the Impact Framework `ModelPluginInterface`. Your plugin must implement this itnerface.
Types must include the Impact Framework's `ModelParams` type. This is the type we use to handle `input` data from manifest files.

You can bootstrap all this configuration by starting your plugin development from our [plugin template](https://github.com/Green-Software-Foundation/if-model-template). Simply clone the template and start developing your plugin code in `src/index.ts`.

If your plugin requires substantial configuration data or global constant definitions, these can be moved to a `config.ts` file in the plugin folder and imported into `src/index.ts`.

## Plugin code

### Imports

We prefer the following ordering of imports in your plugin code:

1. Node builtin modules (e.g. `import fs from 'fs';`)
2. External modules (e.g. `import {z} from 'zod';`)
3. Internal modules (e.g. `import config from 'src/config';`)
4. Interfaces (e.g. `import type {ModelPluginInterface} from 'interfaces'`)
5. Types (e.g. `import {ModelParams} from '../../types/common'`;)

### Comments

Each logical unit in the code should be preceded by an appropriate explanatory comment. Sometimes it is useful to include short comments inside a function that clarifies the purpose of a particular statement. Here's an example from our codebase:

```ts
  /**
   * Calculates the energy consumption for a single input.
   */
  private calculateEnergy(input: ModelParams) {
    const {
      'total-memoryGB': totalMemory,
      'mem-util': memoryUtil,
      coefficient,
    } = input;

    // GB * kWh/GB == kWh
    return totalMemory * (memoryUtil / 100) * coefficient;
  }
```

### Error handling

We use custom errors across our codebase to make it as easy as possible to understand the root cause of a problem.
Overall, we aim to provide error messages that are as descriptive and precise as possible.

Some examples from our Impact Framework code are:


```yml
FILE_IS_NOT_YAML: 'Provided impl file is not in yaml format.',
IMPL_IS_MISSING: 'Impl file is missing.',
MISSING_PATH: "Initalization param 'path' is missing."
INVALID_MODULE_PATH: (path: string) =>
    `Provided module path: '${path}' is invalid.`,
```

Please try to use similarly precise error messages throughout your plugin.

### Access modifiers

We typically organize our plugin code to have a public `execute()` function that iterates over the array of `input` data and calls at least one private function where some calculation logic or API call is executed.

Here's a simple example from our `e-mem` model, showing the public `execute()` function invoking the private `validateSingleInput()` and `calculateEnergy()` functions:

```ts
export class EMemModel implements ModelPluginInterface {
  /**
   * Configures the E-Mem Plugin.
   */
  public async configure(): Promise<ModelPluginInterface> {
    return this;
  }

  /**
   * Calculate the total emissions for a list of inputs.
   */
  public async execute(inputs: ModelParams[]): Promise<ModelParams[]> {
    return inputs.map((input: ModelParams) => {
      const safeInput = this.validateSingleInput(input);
      safeInput['energy-memory'] = this.calculateEnergy(safeInput);

      return safeInput;
    });
  }

  /**
   * Calculates the energy consumption for a single input.
   */
  private calculateEnergy(input: ModelParams) {
    const {
      'total-memoryGB': totalMemory,
      'mem-util': memoryUtil,
      coefficient,
    } = input;

    // GB * kWh/GB == kWh
    return totalMemory * (memoryUtil / 100) * coefficient;
  }

  /**
   * Checks for required fields in input.
   */
  private validateSingleInput(input: ModelParams) {
    const schema = z
      .object({
        'total-memoryGB': z.number().gt(0),
        coefficient: z.number().gt(0).default(0.38),
        'mem-util': z.number().min(0).max(100),
      })
      .refine(allDefined, {
        message:
          'All metrics, including mem-util, total-memoryGB, coefficient, and mem_util-out should be present.',
      });

    return validate(schema, input);
  }
}
```

## Unit tests


## Linting

We use ESLint to format our code. We use a very simple configuration file (`eslintrc.json`), as follows:

```json
{
  "extends": "./node_modules/gts/",
  "rules": {
    "@typescript-eslint/no-explicit-any": [
      "off"
    ]
  }
}
```

For our repositories we use Github CI to enforce the linting ruels for any pull requests.
