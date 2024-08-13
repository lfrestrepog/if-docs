---
sidebar-position: 2
---

# How to make plugins production ready

Our [How to build plugins](./how-to-build-plugins.md) guide covered the basics for how to construct an Impact Framework plugin. This guide will help you to refine your plugin to make it production-ready. These are best practice guidelines - if you intend to contribute your plugin to one of our repositories, following these guidelines will help your PR to get merged. Even if you are not aiming to have a plugin merged into one of our repositories, consistency with our norms is useful for debugging and maintaining and for making your plugin as useful as possible for other Impact Framework developers.

## 1. Naming conventions

We prefer not to use abbreviations of contractions in parameter names. Using fully descriptive names makes the code more readable, which in turn helps reviewers and anyone else aiming to understand how the plugin works. It also helps to avoid ambiguity and naming collisions within and across plugins. Your name should describe what an element does as precisely as practically possible.

For example, we prefer `cpu/energy` to `e-cpu` and we prefer `functionalUnit` to `funcUnit`, `fUnit`, or any other abbreviation.

**In Typescript code** we use lower Camel case (`likeThis`) for variable and function names and Pascal/Upper Camel case for class, type, enum, and interface names (`LikeThis`).

For example:

- `sci` is the name for the SCI value normalized per second.
- `energy` is the name for the array of energy metrics available to be summed in the `sci-e` plugin

**In yaml files**, we prefer to use kebab-case (`like-this`) for field names. For example:

- `network/energy` is the field name for the energy consumed by networking for an application
- `functional-unit` is the unit in which to express an SCI value.

Global constants can be given capitalized names, such as `TIME_UNITS_IN_SECONDS`.

## 2. Plugin code

### Imports

We prefer the following ordering of imports in your plugin code:

1. Node built-in modules (e.g. `import fs from 'fs';`)
2. External modules (e.g. `import {z} from 'zod';`)
3. Internal modules (e.g. `import config from 'src/config';`)
4. Interfaces (e.g. `import type {PluginInterface} from 'interfaces'`)
5. Types (e.g. `import {PluginParams} from '../../types/common'`;)

### Comments

Each logical unit in the code should be preceded by an appropriate explanatory comment. Sometimes it is useful to include short comments inside a function that clarifies the purpose of a particular statement. Here's an example from our codebase:

```ts
/**
 * Calculates the energy consumption for a single input.
 */
const calculateEnergy = (input: PluginParams) => {
  const {
    'memory/capacity': totalMemory,
    'memory/utilization': memoryUtil,
    'energy-per-gb': energyPerGB,
  } = input;

  // GB * kWh/GB == kWh
  return totalMemory * (memoryUtil / 100) * energyPerGB;
};
```

### Error handling

We use custom errors across our codebase to make it as easy as possible to understand the root cause of a problem.
You can use our error handlers by importing `if-core` as a dependency of your plugin. This provides you with our error handling code and predefined list of error classes that you can invoke. This gives you tight integration with IF, because the framework can recognize those error classes and automatically incorporate them into the framework's error handling routines.

Just import `ERRORS` from `if-core` and use the error classes that are appropriate for your use-case.

e.g.

```typescript
import {ERRORS} from '@grnsft/if-core/util';

const {MissingInputDataError} = ERRORS;

...

throw new MissingInputDataError("my-plugin is missing my-parameter from inputs[0]");
```

### Validation

We recommend using validation techniques to ensure the integrity of input data. Validate input parameters against expected types, ranges, or constraints to prevent runtime errors and ensure data consistency.

We use `zod` to validate data. Here's an example from our codebase:

```ts
/**
 * Checks for required fields in input.
 */
const validateInput = (input: PluginParams) => {
  const schema = z
    .object({
      'cpu/name': z.string(),
    })
    .refine(allDefined, {
      message: '`cpu/name` should be present.',
    });

  return validate<z.infer<typeof schema>>(schema, input);
};
```

### Code Modularity

Break down complex functionality into smaller, manageable methods with well-defined responsibilities.
Encapsulate related functionality into private methods to promote code reusability and maintainability.

## 3. Unit tests

Your plugin should have unit tests with 100% coverage. We use `jest` to handle unit testing. We strive to have one `describe` per function. Each possible outcome from each function is separated using `it` with a precise and descriptive message.

Here's an example that covers plugin initialization and the happy path for the `execute()` function.

```ts
import {Sum} from '../../../../lib';

import {ERRORS} from '@grnsft/if-core/util/';

const {InputValidationError} = ERRORS;

describe('lib/sum: ', () => {
  describe('Sum: ', () => {
    const config = {
      'input-parameters': ['cpu/energy', 'network/energy', 'memory/energy'],
      'output-parameter': 'energy',
    };
    const sum = Sum(config);

    describe('init: ', () => {
      it('successfully initalized.', () => {
        expect(sum).toHaveProperty('metadata');
        expect(sum).toHaveProperty('execute');
      });
    });

    describe('execute(): ', () => {
      it('successfully applies Sum strategy to given input.', async () => {
        expect.assertions(1);

        const expectedResult = [
          {
            duration: 3600,
            'cpu/energy': 1,
            'network/energy': 1,
            'memory/energy': 1,
            energy: 3,
            timestamp: '2021-01-01T00:00:00Z',
          },
        ];

        const result = await sum.execute([
          {
            duration: 3600,
            'cpu/energy': 1,
            'network/energy': 1,
            'memory/energy': 1,
            timestamp: '2021-01-01T00:00:00Z',
          },
        ]);

        expect(result).toStrictEqual(expectedResult);
      });
    }
  })
})
```

We have a [dedicated page](./how-to-write-unit-tests.md) explaining in more detail how to write great unit tests for Impact Framework plugins.

## 4. Linting

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

On this page, we have outlined best practices for refining your plugins so that they conform to our expected norms. This will help you write clean, efficient, and understandable code!
