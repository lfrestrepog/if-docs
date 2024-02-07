# How to make models production ready

Our [How to build plugins](./how-to-build-plugins.md) guide covered the basics for how to construct an Impact Framework plugin. This guide will help you to refine your model to make it production-ready. These are best practice guidelines - if you intend to contribute your plugin to one of our repositories, following these guidelines will help your PR to get merged. Even if you are not aiming to have a model merged into one of our repositories, consistency with our norms is useful for debugging and maintaining and for making your model as useful as possible for other Impact Framework developers.

## 1. Naming conventions

We prefer not to use abbreviations of contractions in parameter names. Using fully descriptive names makes the code more readable, which in turn helps reviewers and anyone else aiming to understand how the plugin works. It also helps to avoid ambiguity and naming collisions within and across plugins. Your name should describe what an element does as precisely as practically possible.

For example, we prefer `energy-cpu` to `e-cpu` and we prefer `functionalUnit` to `funcUnit`, `fUnit`, or any other abbreviation.

**In Typescript code** we use lower Camel case (`likeThis`) for variable and function names and Pascal/Upper Camel case for class, type, enum, and interface names (`LikeThis`).

For example:

- `ShellModel` is the name for the class that implements the `Shell` model.
- `sciPerSecond` is the name for the SCI value normalized per second.
- `energyMetrics` is the name for the array of energy metrics available to be summed in the `sci-e` model

**In yaml files**, we prefer to use kebab-case (`like-this`) for field names. For example:

- `energy-network` is the field name for the energy consumed by networking for an application
- `functional-unit` is the unit in which to express an SCI value.

Global constants can be given capitalized names, such as `TIME_UNITS_IN_SECONDS`.

## 2. Repository structure

Plugins are expected to have a top-level `src` directory containing several subdirectories: `interfaces`, `lib`, `types`, and `__tests__`. The actual plugin code should be in `src/index.ts`.

```
plugin
  |- src
    |- interfaces
    |    |-index.ts  // interfaces used in the plugin defined here
    |- lib
    |    |- index.ts // plugin code in here
    |- types
    |    |- index.ts // types used in the plugin defined here
    |- index.ts

```

Interfaces must include the Impact Framework `ModelPluginInterface`. Your plugin must implement this interface.
Types must include the Impact Framework's `ModelParams` type. This is the type we use to handle `input` data from manifest files.

You can bootstrap all this configuration by starting your plugin development from our [plugin template](https://github.com/Green-Software-Foundation/if-model-template). Simply clone the template and start developing your plugin code by creating the corresponding folder in the `src/lib` folder and adding the folder path in the `src/lib/index.ts`

If your plugin requires substantial configuration data or global constant definitions, these can be moved to a `config.ts` file in the plugin folder.

## 3. Plugin code

### Imports

We prefer the following ordering of imports in your plugin code:

1. Node built-in modules (e.g. `import fs from 'fs';`)
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

### Validation

Utilize validation techniques to ensure the integrity of input data.
Validate input parameters against expected types, ranges, or constraints to prevent runtime errors and ensure data consistency.
We use `zod` to validate data. Here's an example from our codebase:

```ts
/**
 * Checks for required fields in input.
 */
private validateInput(input: ModelParams) {
  const schema = z
    .object({
      'physical-processor': z.string(),
    })
    .refine(allDefined, {
      message: '`physical-processor` should be present.',
    });

  return validate<z.infer<typeof schema>>(schema, input);
}
```

### Code Modularity

Break down complex functionality into smaller, manageable methods with well-defined responsibilities.
Encapsulate related functionality into private methods to promote code reusability and maintainability.

### Access modifiers

We typically organize our plugin code to have a public `configure()` function that sets up the plugin by loading necessary data and ensures that the plugin is ready for execution before proceeding further, and `execute()` function that iterates over the array of `input` data and calls at least one private function where some calculation logic or API call is executed.

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
      const safeInput = Object.assign(input, this.validateSingleInput(input));
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

## 4. Unit tests

Your plugin should have unit tests with 100% coverage. We use `jest` to handle unit testing. We strive to have one `describe` per function. Each possible outcome from each function is separated using `it` with a precise and descriptive message.

Here's an example that covers plugin initialization and the `configure()` function.

```ts
import { SciEModel } from '../../../../lib';
import { ERRORS } from '../../../../util/errors';

const { InputValidationError } = ERRORS;

describe('lib/sci-e: ', () => {
  describe('SciEModel: ', () => {
    describe('init: ', () => {
      it('successfully initalized.', () => {
        const outputModel = new SciEModel();

        expect(outputModel).toHaveProperty('configure');
        expect(outputModel).toHaveProperty('execute');
      });
    });

    describe('configure(): ', () => {
      it('successfully returns model instance.', async () => {
        const outputModel = new SciEModel();
        await outputModel.configure();

        expect.assertions(1);

        expect(outputModel).toBeInstanceOf(SciEModel);
      });
    });
  });
});
```

We have a [dedicated page](./how-to-write-unit-tests.md) explaining in more detail how to write great unit tests for Impact Framework plugins.

## 5. Linting

We use ESLint to format our code. We use a very simple configuration file (`eslintrc.json`), as follows:

```json
{
  "extends": "./node_modules/gts/",
  "rules": {
    "@typescript-eslint/no-explicit-any": ["off"]
  }
}
```

For our repositories we use Github CI to enforce the linting rules for any pull requests.

## Summary

On this page, we have outlined best practices for refining your model plugins so that they conform to our expected norms. This will help you write clean, efficient, and understandable code!
