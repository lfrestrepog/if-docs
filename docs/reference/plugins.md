# Plugins

Impact Framework works by executing pipelines of plugins over input data. Those plugins are re-useable units of code that can be thought of as Lego bricks - simple blocks of code that can be assembled into complex workflows. 

IF comes bundled with a standard library of `builtins` that allow you to do basic and/or generic operations over your data. These include simple arithmetic, regrouping data, calculating SCI scores, and running processes in a spawned shell.

Most IF plugins are created and maintained by the community. Anyone can create a plugin and share it so that other iF users can install it and use it in their pipelines.

We provide a website where you can search for plugins:

[IF Explorer](https://explorer.if.greensoftware.foundation)



### `built-in`

IF builtins all come bundled with IF. Below you will find a list of each builtin along with a brief description of its purpoise and a link to its README documentation.

* [Time Sync](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins#readme): Takes a heterogeneous set of time series data that might be offset, discontinuous or irregularly spaces and returns time series conforming to a user defined time grid. E.g. a user can define that all sets of observations should start at sopme global start time, end at some global end time and have a specific temporal resolution. 

* [Groupby](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins#readme): Allows a user to regroup their output data according to given keys.

* [SCI-embodied](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/sci-embodied) - Calculates the embodied carbon for a component.

* [SCI](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/sci): Calculates the software carbon intensity.
  
* [Shell](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/shell) - A plugin that enables external code in any language to be run in a child process

* [Sum](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/sum): a generic arithmetic plugin that allows you to sum any set of input parameters.
  
* [Multiply](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/multiply): a generic arithmetic plugin that allows you to multiply any set of input parameters.
  
* [Coefficient](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/coefficient): a generic arithmetic plugin that allows you to multiply any input value by a coefficient.

* [Mock Observations](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/mock-observations): A plugin for mocking observations (inputs) for testing and demo purposes.
  
* [Subtract](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/subtract): a generic plugin for subtracting one value from another

* [Divide](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/divide): A generic plugin for doing arithmetic division of two values.
  
* [Regex](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/regex): A generic plugin to match part of one string and extract it into another.

* [Exponent](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/exponent): A generic plugin for raising a value to a power

* [Interpolation](https://github.com/Green-Software-Foundation/if/tree/main/src/builtins/interpolation): A generic plugin for interpolating between known points.
