# Model Plugins

The Impact Framework includes just one builtin model (`time-sync`). All other models are external plugins that have to be installed before they can be run in an IF pipeline. Anyone can create and install a new model plugin. As long as the mdoel conforms to the expected interface, IF can run it.

There are two repositories that were created by the IF core team. The `if-models` repository contains the "core" set of models that IF developers will maintain and support. We also provide a second repository of `if-unofficial` models that are mainly re-implementations of existing third party models or code that we expect community members to maintain independently of the IF core team.

Documentation for the specific individual models are available in the model READMEs. Below you will find a brief description of each model and a link to its documentation:

### `built-in`

* [Time Sync](https://github.com/Green-Software-Foundation/if/tree/dev/src/models#time-sync): Takes a heterogeneous set of time series data that might be offset, discontinuous or irregularly spaces and returns time series conforming to a user defined time grid. E.g. a user can define that all sets of observations should start at sopme global start time, end at some global end time and have a specific temporal resolution. 


### `if-models`


* [Cloud instance metadata](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/cloud-instance-metadata/README.md): Looks up detailed metadata about a given cloud instance type, including the physical processor being used.
* [E-MEM](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/e-mem/README.md): Calculate the energy expended due to memroy usage, by multiplying the energy used in GB by a coefficient.
* [SCI-E](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/sci-e/README.md): Calculates the sum of all energy components.
* [SCI-M](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/sci-m/README.md) - Calculates the embodied carbon for a component.
* [SCI-O](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/sci-o/index.ts) - Calculates the operational carbon from the total energy and grid carbon intensity.
* [SCI](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/sci/README.md): Calculates the software carbon intensity.
* [SHELL](https://github.com/Green-Software-Foundation/if-models/blob/main/src/lib/shell/README.md) - A model that enables external models in any language to be run in a child process
* [TDP-FINDER](https://github.com/Green-Software-Foundation/if-models/tree/main/src/lib/tdp-finder): Looks up the thermnal desig power for a given processor in a local database.
 

### `if-unofficial-models`

* [Azure importer](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/azure-importer/README.md): Grabs usage metrics from an Azure virtual machine, given user credentials and virtual machine details.
* [Cloud Carbon Footprint](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/ccf/README.md): Calculates usage metrics using the Cloud Carbon Footprint APIs.
* [WattTime](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/watt-time/README.md): WattTime is an external service for looking up grid emissions based on location.
* [TEADS-CPU](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/teads-curve/README.md): Calculates the energy in kWh used by the CPU
* [TEADS-AWS](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/teads-aws/README.md): Calculates the energy in kWh used by the CPU using a model specific to AWS instances.
* [Boavizta](https://github.com/Green-Software-Foundation/if-unofficial-models/blob/main/src/lib/boavizta/README.md): Calculates energy and embodied carbon using the Boavizta APIs.