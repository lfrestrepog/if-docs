---
sidebar_position: 3
---

# How to load plugins

Plugins are developed separately to the Impact Framework core. However, the IF core developers maintain a standard library of plugins come bundled with IF. These are known as `builtins`.

Builtins have to be initialized in a manifest file using the path `builtin`. Then they can be invoked in pipelines.

```yaml
name: if-demo
description: demo pipeline
tags:
initialize:
  plugins:
    'sum':
      path: 'builtin'
      method: Sum
      config:
        input-parameters:
          - cpu/energy
          - network/energy
        output-parameter: energy-sum
```

Other plugins are hosted externally to the IF. Anyone can build a plugin and provide it as an npm package or a public code repository (such as Github) and share it using our [Explorer](https://explorer.if.greensoftware.foundation).

These external plugins are loaded into IF by installing locally and initializing in a manifest.

First, install the plugin by providing the path to the repository to `npm install` as follows:

```sh
npm install https://github.com/some-account/some-repo
```

Then, in the manifest's `initialize` section, you'll need to provide the following fields:

- `YOUR-PLUGIN-HERE`: a name to reference this specific instance of the plugin. The same name has to be used to refer to this plugin instance everywhere across the manifest
- `method`: the function name exported by your plugin, e.g. `AzureImporter`
- `path`: the path to the plugin

And, if your plugin requires it, add its `config` too.

```yaml
name: plugin-demo
description: loads plugin
tags: null
initialize:
  plugins:
    <YOUR-PLUGIN-HERE:
      method: OutputPlugin
      path: https://github.com/my-repo/my-plugin
```

**Anyone can develop plugins**. As long as you conform to our plugin specification, you can load your plugin into the Impact Framework and run it as part of a pipeline. We provide a guide to [building plugins](../developers/how-to-build-plugins.md) and a [template](https://github.com/Green-Software-Foundation/if-model-template) to help you structure them correctly.
