# How to install Impact Framework

There are a cxouple of options for installing Impact Framework. For most users we recommend using our official releases. You can install these using `npm`. The way to do this is as follows:

```sh
npm install -g @grnsft/if
```

This will globally install the Impact Framework on your machine. You can run the globally installed package using the `imapct-engine` command as follows:

```sh
impact engine --impl <path to manifest file> 
```

However, there is only one model that is built-in to the core Impact Framework codebase (`time-sync`). If you only want to use Impact Framework with your own, locally developed models or models loaded from remote Github repositories, then you have already installed everything you need to get started. However, most likely you will want to install some of our models too.

There are two model packages you will probably want to install: `if-models` and `if-unofficial-models`. 
`if-models` is our standard library of models that we maintain - generally these are models related to calculating a Software Carbon Intensity score.
`if-unofficial-models` is a collection of plugins that rely on some third party API or reimplement a pre-existing model originally developed by another group, for example our Azure data importer, and Co2js.

You can install the latest releases of these model packages using npm:

```sh
npm install -g @grnsft/if-models
npm install -g @grnsft/if-unofficial-models
```

Now you have globally installed the framework and a set of models, so you can start using Impacty Framework for impact calculations for your applications.
