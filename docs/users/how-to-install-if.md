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
