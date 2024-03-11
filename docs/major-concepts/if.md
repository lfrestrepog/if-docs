---
sidebar-position: 3
---

# Impact Engine (CLI)

## Introduction

`ie` is a command line tool that computes [Manifest files](manifest-file.md).
It is the portal allowing users to interact with the Impact Framework.

The available options are:

- `--manifest`: path to an input manifest file
- `--output` (optional): path to the output file where the results as saved, if none is provided it prints to stdout.
- `--override-params` (optional): if you are an advanced user and you want to override our standard set of parameters and their definitions, you can provide the path to an alternative file as an argument to this command.

The only required command is `--manifest`. Without a valid path to a manifest file, `ie` has nothing to execute.

To use `ie`, you must first [write a manifest file](../users/how-to-write-manifests.md). Then, you can simply pass the path to the manifest file to `ie` on the command line. 

```sh
ie --manifest /my-manifest.yml
```

You can also pass a path where you would like to save the output file to. For example:

```sh
ie --manifest ./my-manifest.yml --output ./my-results.yml
```

> Note that you also need to add some config to your manifest file to enable exporting to a file. The config is as follows:
```
initialize:
  outputs:
    - yaml
```



If you omit the `--output` command, your results will be displayed in the console.

For more information on the `ie` commands see the [CLI reference documentation](../reference/cli.md).
