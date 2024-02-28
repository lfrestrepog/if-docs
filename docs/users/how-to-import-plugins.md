---
sidebar_position: 3
---

# How to load plugins

Plugins are developed separately to the Impact Framework core. However, the IF core developers maintain a standard library of plugins that can be found in this [Github repository](https://github.com/Green-Software-Foundation/if-models). We also provide some implementations of popular community plugins, although we rely on other members of the community to maintain them.

Use the following commands to install the `if-models` and `if-unofficial-models` repositories:

```
npm -i -g @grnsft/if-models
npm -i -g @grnsft/if-unofficial-models
```

Plugins in these packages can then be invoked in an impl by providing their path in the plugin initialization, as shown in the following example:

```yaml
name: if-demo
description: demo pipeline
tags:
initialize:
  plugins:
    - name: azure-importer
      method: AzureImporterModel
      path: "@grnsft/if-unofficial-models"
    - name: cloud-instance-metadata
      method: CloudInstanceMetadataModel
      path: "@grnsft/if-models"
```


Load your plugin directly from your Github repository, or from `npm` if you have published your plugin there. First, you'll need to install it by providing the path to the repository to `npm install` as follows:

```sh
npm install https://github.com/Green-Software-Foundation/if-models
```

You'll need to provide the following fields:

- `name`: the same name has to be used to refer to this plugin everywhere across the impl
- `method`: the class name for your plugin, e.g. `AzureImporter`
- `path`: the path to the plugin

And, if your plugin requires it, add `global-config` too.

Then, in your manifest, initialize the plugin as follows:

```yaml
name: plugin-demo
description: loads plugin
tags: null
initialize:
  plugins:
    - name: my-plugin
      method: OutputPlugin
      path: https://github.com/my-repo/my-plugin
```

**Anyone can develop plugins**. As long as you conform to our plugin specification, you can load your plugin into the Impact Framework and run it as part of a pipeline. We provide a guide to [building plugins](./how-to-build-plugins.md) and a [template](https://github.com/Green-Software-Foundation/if-model-template) to help you structure them correctly.
