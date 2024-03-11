# Plugins

The Impact Framework includes just one builtin plugin (`time-sync`). All other plugins are external plugins that have to be installed before they can be run in an IF pipeline. Anyone can create and install a new plugin. As long as the plugin conforms to the expected interface, IF can run it.

There are two repositories that were created by the IF core team. The `if-plugins` repository contains the "core" set of plugins that IF developers will maintain and support. We also provide a second repository of `if-unofficial` plugins that are mainly re-implementations of existing third party plugins or code that we expect community members to maintain independently of the IF core team.

Documentation for the specific individual plugins are available in the plugin READMEs. Below you will find a brief description of each plugin and a link to its documentation:

### `built-in`

* [Time Sync](https://github.com/Green-Software-Foundation/if/tree/dev/src/models#time-sync): Takes a heterogeneous set of time series data that might be offset, discontinuous or irregularly spaces and returns time series conforming to a user defined time grid. E.g. a user can define that all sets of observations should start at sopme global start time, end at some global end time and have a specific temporal resolution. 


### `if-plugins`


* [Cloud metadata](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/cloud-metadata/README.md): Looks up detailed metadata about a given cloud instance type and region, including the physical processor being used.
* [E-MEM](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/e-mem/README.md): Calculate the energy expended due to memroy usage, by multiplying the energy used in GB by a coefficient.
* [SCI-E](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/sci-e/README.md): Calculates the sum of all energy components.
* [SCI-M](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/sci-m/README.md) - Calculates the embodied carbon for a component.
* [SCI-O](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/sci-o/index.ts) - Calculates the operational carbon from the total energy and grid carbon intensity.
* [SCI](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/sci/README.md): Calculates the software carbon intensity.
* [SHELL](https://github.com/Green-Software-Foundation/if-plugins/blob/main/src/lib/shell/README.md) - A plugin that enables external code in any language to be run in a child process
* [TDP-FINDER](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/tdp-finder): Looks up the thermnal desig power for a given processor in a local database.
* [Sum](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/sum): a generic arithmetic plugin that allows you to sum any set of input parameters.
* [Multiply](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/multiply): a generic arithmetic plugin that allows you to multiply any set of input parameters.
* [Coefficient](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/coefficient): a generic arithmetic plugin that allows you to multiply any input value by a coefficient.
* [E-NET](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/e-net): simply multiplies the amount of data transferred (GB) by a coefficient (kWh/GB) to yield network/energy.
* [Mock Observations](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/mock-observations): A plugin for mocking observations (inputs) for testing and demo purposes.
* [CSV-Export](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/csv-export): a generic CSV exporter plugin.
* [Divide](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/divide): A generic plugin for doing arithmetic division of two values.
* [Regex](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/regex): A generic plugin to match part of one string and extract it into another.


### `if-unofficial-plugins`

* [Azure importer](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/azure-importer/README.md): Grabs usage metrics from an Azure virtual machine, given user credentials and virtual machine details.
* [Cloud Carbon Footprint](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/ccf/README.md): Calculates usage metrics using the Cloud Carbon Footprint APIs.
* [WattTime](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/watt-time/README.md): WattTime is an external service for looking up grid emissions based on location.
* [TEADS-CURVE](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/teads-curve/README.md): Calculates the energy in kWh used by the CPU
* [TEADS-AWS](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/teads-aws/README.md): Calculates the energy in kWh used by the CPU using a model specific to AWS instances.
* [Boavizta](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/boavizta/README.md): Calculates energy and embodied carbon using the Boavizta APIs.
* [co2js](https://github.com/Green-Software-Foundation/if-unofficial-plugins/blob/main/src/lib/co2js/README.md): Calculates the carbon emissions of a website.


## Exhaust plugins (outputs)

Export plugins designed to implement custom ways of exporting output file. Currenlty supported ones are `csv`, `yaml` and `log` plugins.
