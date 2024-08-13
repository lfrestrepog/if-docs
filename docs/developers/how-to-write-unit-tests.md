---
sidebar-position: 3
---

# How to write unit tests

Impact Framework unit tests follow a standard format. We use the `jest` testing library. You can run all our existing tests by opening the project directory and running `npm test`. This page explains how you can add new unit tests for your plugins (or add some for our plugins if you notice a gap).

## Test files

Both the IF and the project repositories include a `__test__` directory. Inside, you will find subdirectory `unit/lib` containing directories for each plugin. Your plugin repository should also follow this structure. Inside the plugin directory you can add `index.test.ts`. This is where you write your unit tests. For example, here's the directory tree for our `teads-curve` test file:

```sh

if-unofficial-plugins
 |
 |- src
    |
    |-__tests__
        |
        |-unit
          |
          |-lib
             |
             teads-curve
                 |
                 |- index.test.ts
```

## Setting up your test file

You will need to import your plugin so that it can be instantiated and tested. You will also need some elements from `jest/globals`:
For example, these are the imports for our `Sum` plugin.

```ts
import { Sum } from '../../../../lib';
import { ERRORS } from '../../../../util/errors';
const { InputValidationError } = ERRORS;
```

You may require other imports for your specific set of tests.

## Describe

Each method should have its own dedicated `describe` block.

Your unit tests should have _at least_ two `describe` blocks, one to test the plugin initialization and one for `execute`.

```ts
describe('init', () => {});
describe('execute', () => {});
```

For example, here is a describe block checking that the `Sum` plugin initializes correctly:

```typescript
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
  });
});
```

## It

Within each `describe` block, each effect to be tested should have a dedicated `it` block.

Here's an example of a new `describe` block for the `execute()` method on the `Sum` plugin. The `describe` block indicates that we are testing effects of the `execute()` method. `it` is specific to a single outcome - in this case there are two `it` blocks that test that the plugin returns a specific result in the happy path and throws an exception if the user has provided invalid config data, specifically that the user-provided `cpu/energy` parameter is missing:

```typescript
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

  it('throws an error on missing params in input.', async () => {
    const expectedMessage = 'Sum: cpu/energy is missing from the input array.';

    expect.assertions(1);

    try {
      await sum.execute([
        {
          duration: 3600,
          timestamp: '2021-01-01T00:00:00Z',
        },
      ]);
    } catch (error) {
      expect(error).toStrictEqual(new InputValidationError(expectedMessage));
    }
  });
});
```

## Errors

We prefer to use `expect` to check the errors returned from a test. We do this by writing `expect` in a `catch` block. Here's an example from our `sci` plugin tests:

```ts
it('throws an exception on missing functional unit data.', async () => {
  const inputs = [
    {
      timestamp: '2021-01-01T00:00:00Z',
      'operational-carbon': 0.002,
      'embodied-carbon': 0.0005,
      'functional-unit': 'requests',
      duration: 1,
    },
  ];
  expect.assertions(1);

  try {
    await sciModel.execute(inputs);
  } catch (error) {
    expect(error).toBeInstanceOf(InputValidationError);
  }
});
```

It is also necessary to include `expect.assertions(n)` for testing asynchronous code, where `n` is the number of assertiosn that should be tested before the test completes.

## Mocks

Please try to avoid mocking data if possible. However, if it is necessary to mock (e.g. if your plugin relies on a third party credentialed API) then please make your mock data as realistic as possible (no `foo`, `bar`, `baz` style mock data, please).

We do have mock backends in several of our tests, and we also have a mock data generator plugin that can create realistic dummy data to your specific requirements.

## Coverage

Please use `jest --coverage` to see a coverage report for your plugin - your unit tests should yield 100% coverage. The snippet below shows what to expect from the coverage report:

```sh
-------------------------------|---------|----------|---------|---------|-------------------
| File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --------------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files                   | 100     | 100      | 100     | 100     |
| lib                         | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
| lib/cloud-metadata          | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
| lib/e-mem                   | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
| lib/e-net                   | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
```
