---
sidebar_position: 2
---

# How to install Impact Framework

You can install Impact Framework either globally or locally. For most users, we recommend installing our official releases globally using `npm`. You can do this using the following command:

```sh
npm install -g @grnsft/if
```

Then, run the package using the `ie` command:

```sh
ie --manifest <path to manifest file> 
```

There is only one plugin that is built in to the core Impact Framework codebase (`time-sync`). If you only want to use Impact Framework with your own, locally-developed plugins or plugins loaded from remote Github repositories, then you have already installed everything you need to get started. However, most likely you will want to install some of our plugins too.

There are two plugin packages you will probably want to install: `if-plugins` and `if-unofficial-plugins`. 
- `if-plugins` is our standard library of plugins that we maintain. Generally, these are used for calculating a Software Carbon Intensity score.
- `if-unofficial-plugins` is a collection of plugins that rely on some third party API or that reimplement a pre-existing plugin originally developed by another group. For example, our Azure data importer and Co2js.

You can install the latest releases of these plugin packages using npm:

```sh
npm install -g @grnsft/if-plugins
npm install -g @grnsft/if-unofficial-plugins
```

Now you have globally installed the framework and a set of plugins and can start using IF for calculating the impact of your applications.


## Installing locally

You can also clone the Impact Framework repositories and install them locally, useful for developers who want to make changes or build new plugins. Use the following command for local installation:

```sh
git clone https://github.com/Green-Software-Foundation/if && cd if
npm install
```

Then, use the following command to run Impact Framework:

```sh
npm run ie -- --manifest <path to your manifest file>
```

Next, install local plugin repositories using `npm link`. You can do this by entering the plugin folder and running the following command:

```sh
npm link
```

This creates a global package with the same name as your project root directory which you can then load by passing the path in your manifest file.

Read our detailed guide to [installing plugins](./how-to-import-plugins.md).
