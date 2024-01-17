# How to make models production ready

Our [How to build plugins](./how-to-build-plugins.md) guide covered the basic for how to construct an Impact Framework plugin. This guide will help you to refine your mdoel to make it production ready. These are best practice guidelines - if you intend to contribute your plugin into one of our repositories, following these guidelines will help your PR to get merged. Even if you are not aiming top have a model merged into one of our repositories, consistency with our norms is useful for debugging and maintaining and for making your model as useful as possible for other Impact Framework developers.

## 1. Naming conventions

We prefer not to use abbreviations of contractions in parameter names. Using fully descriptive names makes the code more readable, which in turn helps reviewers and anyone else aiming to understand how the plugin works. It also helps to avoid ambiguity and naming collisions within and across plugins. 
For examnple, we prefer `energy-cpu` to `e-cpu` and we prefer `functionalUnit` to `funcUnit`, `fUnit` or any other abbreviation.

**In Typescript code** we use lower Camel case (`likeThis`) for variable names and Pascal/Upper Camel case for class names (`LikeThis`). 

For example:
- `ShellModel` is the name for the class that implements the `Shell` model. 
- `sciPerSecond` is the name for the SCI value normalized per second.
- `energyMetrics` is the name for the array of energy metrics available to bve summed in the `sci-e` model

**In yaml files**, we prefer to use kebab-case (`like-this`) for field names. For example:

- `energy-network` is the field name for the energy consumed by networking for an application
- `functional-unit` is the unit in which to express an SCI value.


## 2. File structure

Plugins are expected to have a top-level `src` directory containing several subdirectories: `interfaces`, `types`, `__tests__`. The actual plugin code should be in `src/index.ts`.

```
src
 |
 |- interfaces
 |    |-index.ts  // interfaces used in the plugin defined here
 |
 |- types
 |    |- index.ts // types used in the plugin defined here
 |
 |- index.ts // plugin code in here

```
