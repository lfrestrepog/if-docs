---
sidebar-position: 3
---

# Impact Engine (CLI)

## Introduction

`if-run` is a command line tool that computes [Manifest files](manifest-file.md).
It is the portal allowing users to interact with the Impact Framework.

The available options and their shortcuts are:

- `--manifest` or `-m`: path to an input manifest file
- `--output` or `-o` (optional): path to the output file where the results as saved
- `--stdout` or `-s` (optional): prints the output to stdout (console)
- `--override-params` or `-p` (optional): if you are an advanced user and you want to override our standard set of parameters and their definitions, you can provide the path to an alternative file as an argument to this command.
- `--help` or `-h`: prints out help instruction
- `--debug`: enables IF execution logs


The only required command is `--manifest`. Without a valid path to a manifest file, `ie` has nothing to execute.

To use `ie`, you must first [write a manifest file](../users/how-to-write-manifests.md). Then, you can simply pass the path to the manifest file to `ie` on the command line. 

```sh
ie --manifest /my-manifest.yml 
## or using aliases
ie -m /my-manifest.yml
```

You can also pass a path where you would like to save the output file to. For example:

```sh
ie --manifest ./my-manifest.yml --output ./my-results.yml
## or using aliases
ie -m ./my-manifest.yml -o ./my-results.yml
```

> Note that you also need to add some config to your manifest file to enable exporting to a file. The config is as follows:
```
initialize:
  outputs:
    - yaml
```


If you omit the `--output` command, your results won't be displayed in the console. You should use `--stdout` command for that.

For more information on the `ie` commands see the [CLI reference documentation](../reference/cli.md).
