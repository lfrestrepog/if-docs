---
sidebar-position: 3
---

# How to write unit tests 

Impact Framework unit tests follow a standard format. We use the `jest `testing library.

## Describe

Each method should have its own dedicated `describe` block. 
For model plugins there are a minimum set of methods defined by the `PluginInterface`: `configure()` and `execute()`. therefore, your unit tests should have *at least* two `describe` blocks for each of those methods:

```
describe("configure", ()=> {})
describe("execute", ()=> {})
```

There should also be `describe` blocks for successful plugin initialization.

## It

Within each `describe` block, each effect to be tested should have a dedicated `it` block.


## Errors

Expect errors rather than catching them!

```ts
it("When no product name, it throws error 400", async () => {
  let errorWeExceptFor = null;
  try {
    const result = await addNewProduct({});
  } catch (error) {
    expect(error.code).to.equal("InvalidInput");
    errorWeExceptFor = error;
  }
  expect(errorWeExceptFor).not.to.be.null;

});
```

## Mocks

Please try to avoid mocking data if possible. However, if it is necessary to mock (e.g. if your plugin relies on a third party credentialed API) then please make your mock data as realistic as possible (no `foo`, `bar`, `baz` style mock data, please).
