---
sidebar-position: 3
---

# How to write unit tests 

Impact Framework unit tests follow a standard format. We use the `jest` testing library. You can run all our existing tests by opening the project directory and running `npm test`. This page explains how you can add new unit tests for your plugins (or add some for our plugins if you notice a gap).

## Test files

Both the IF and the project repositories include a `__test__` directory. Inside, you will find subdirectory `unit/lib` containing directories for each plugin. Your plugin repository should also follow this structure. Inside the plugin directory you can add `index.test.ts`. This is where you write your unit tests. For example, here's the directory tree for our `teads-curve` test file:


```sh

if-unofficial-models
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
For example, these are the improts for our `teads-curve` plugin.

```ts
import {describe, expect, jest, test} from '@jest/globals';
import {TeadsCurveModel} from '../../../../lib';
```

You may require other imports for your specific set of tests.

## Describe

Each method should have its own dedicated `describe` block. 

For model plugins there are a minimum set of methods defined by the `PluginInterface`: `configure()` and `execute()`. therefore, your unit tests should have *at least* two `describe` blocks for each of those methods:

```ts
describe("configure", ()=> {})
describe("execute", ()=> {})
```

There should also be a `describe` blocks for successful plugin initialization.

For example, here is a describe block checking that the `co2js` model initializes correctly:

```typescript
describe('init Co2jsModel: ', () => {
  it('initalizes object with properties.', async () => {
    expect(outputModel).toHaveProperty('configure');
    expect(outputModel).toHaveProperty('execute');
  });
});
```

## It

Within each `describe` block, each effect to be tested should have a dedicated `it` block.

Here's an example of a new `describe` block for the `execute()` method on the `sci` model. The `describe` block indicates that we are testing effects of the `execute()` method. `it` is specific to a single outcome - in this case `it` tests that the plugin throws an exception if the user has provided invalid config data to the `time-sync` plugin, specifically that the user-provided `end-date` is before the user-provided `start-date`:

```typescript
describe('execute():', () => {

  it('throws error if end is before start in global config.', async () => {
    const basicConfig = {
      'start-time': '2023-12-12T00:00:10.000Z',
      'end-time': '2023-12-12T00:00:00.000Z',
      interval: 5,
      'allow-padding': true,
    };

    const timeModel = await new TimeSyncModel().configure(basicConfig);

    try {
      await timeModel.execute([
        {
          timestamp: '2023-12-12T00:00:00.000Z',
          duration: 15,
          'cpu-util': 10,
        },
        {
          timestamp: '2023-12-12T00:00:10.000Z',
          duration: 30,
          'cpu-util': 20,
        },
      ]);
    } catch (error) {
      expect(error).toStrictEqual(
        new InputValidationError('Start time or end time is missing.')
      );
    }
  });
})
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
| lib/cloud-instance-metadata | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
| lib/e-mem                   | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
| lib/e-net                   | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |
```
