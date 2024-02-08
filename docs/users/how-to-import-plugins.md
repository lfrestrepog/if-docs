---
sidebar_position: 3
---

# How to load model plugins

Models are developed separately to the Impact Framework core. However, the IF core developers maintain a standard library of models that can be found in this [Github repository](https://github.com/Green-Software-Foundation/if-models). We also provide some implementations of popular community models, although we rely on other members of the community to maintain them.

Use the following commands to install the `if-models` and `if-unofficial-models` repositories:

```
npm -i -g @grnsft/if-models
npm -i -g @grnsft/if-unofficial-models
```

Models in these packages can then be invoked in an impl by providing their path in the model initialization, as shown in the following example:

```yaml
name: if-demo
description: demo pipeline
tags:
initialize:
  models:
    - name: azure-importer
      model: AzureImporterModel
      path: "@grnsft/if-unofficial-models"
    - name: cloud-instance-metadata
      model: CloudInstanceMetadataModel
      path: "@grnsft/if-models"
```


Load your model directly from your Github repository, or from `npm` if you have published your model there. First, you'll need to install it by providing the path to the repository to `npm install` as follows:

```sh
npm install https://github.com/Green-Software-Foundation/if-models
```

You'll need to provide the following fields:

- `name`: the same name has to be used to refer to this model everywhere across the impl
- `model`: the class name for your model, e.g. `AzureImporterModel` or `OutputModel`
- `path`: the path to the model

Then, in your impl, initialize the model as follows:

```yaml
name: model-demo
description: loads model
tags: null
initialize:
  models:
    - name: my-model
      model: OutputModel
      path: https://github.com/my-repo/my-model
```

**Anyone can develop models**. As long as you conform to our model specification, you can load your model into the Impact Framework and run it as part of a pipeline. We provide a guide to [building models](./how-to-build-plugins.md) and a [template](https://github.com/Green-Software-Foundation/if-model-template) to help you structure them correctly.

