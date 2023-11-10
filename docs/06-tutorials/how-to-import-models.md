---
author: Joseph Cook (@jmcook1186)
abstract: Guidance for importing models.
---

Models are developed separately to the IF core. However, the IF core developers maintain a standard library of models that can be found in this [Github repository](https://github.com/Green-Software-Foundation/if-models). We also provide some implementations of popular community models, but we do notcommit to maintaining these as part of IF.

Anyojne can develop models. As long as you conform to our mnodel specification, you can load your model into IF an run it as part of a pipeline. For guidance on model building, see [How to build models](./how-to-build-models.md). We provide a [template](https://github.com/Green-Software-Foundation/if-model-template) to help you structure your models correctly.

You can then load your model directly from yoru Guthub repository, or from `npm` if you have published your model there. To load a model, first install it by providing the path to the repository to `yarn add` as follows:

```sh
yarn add https://github.com/Green-Software-Foundation/if-models
```

Then, in your impl, initialize the model as follows:


```yaml
name: model-demo
description: loads model
tags: null
initialize:
  models:
    - name: my-model
      kind: plugin
      model: OutputModel
      path: https://github.com/my-repo/my-model
```

The necessary fields are:

- `name`: the same name has to be used to refer to this moel everywhere across the impl
- `kind`: the model is most likely a `plugin` model. Other kinds may be implemented later.
- `model`: the class name for your model, e.g. `AzureImporterModel` or `OutputModel`
- `path`: the path to the model

This is all that is required to load a model from an external repository!