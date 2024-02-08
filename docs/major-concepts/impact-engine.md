---
sidebar-position: 4
---

# Impact engine

## Introduction

`impact-engine` is a command line tool that computes [Manifest files](manifest-file.md).
It is the portal allowing users to interact with the Impact Framework.

The available commands are:

- `impl`: path to an input IMPL file
- `ompl`: path to the output IMPL file where the results as saved, if none is provided it prints to stdout.
- `--override-params`: if you are an advanced user and you want to override our standard set of parameters and their definitions, you can provide the path to an alternative file as an argument to this command.

The only required command is `--impl`. Without a valid path to a manifest file, Impact Engine has nothing to execute.

To use `impact-engine`, you must first [write a manifest file](../users/how-to-write-impls.md). Then, you can simply pass the path to the manifest file to `impact-engine` on the command line. 

```sh
impact-engine --impl /my-manifest.yml
```

You can also pass a path where you would like to save the output file to. For example:

```sh
impact-engine --impl ./my-manifest.yml --ompl ./my-results.yml
```

If you omit the `--ompl` command, your results will be displayed in the console.

For more information on the `impact-engine` commands see the [CLI reference documentation](../reference/cli.md).
