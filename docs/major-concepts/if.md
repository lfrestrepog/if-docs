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
- `--no-output` or `-n` (optional): suppress the output to console
- `--override-params` or `-p` (optional): if you are an advanced user and you want to override our standard set of parameters and their definitions, you can provide the path to an alternative file as an argument to this command.
- `--help` or `-h`: prints out help instruction
- `--debug`: enables IF execution logs

The only required command is `--manifest`. Without a valid path to a manifest file, `if-run` has nothing to execute.

To use `if-run`, you must first [write a manifest file](../users/how-to-write-manifests.md). Then, you can simply pass the path to the manifest file to `if-run` on the command line.

```sh
if-run --manifest /my-manifest.yml
## or using aliases
if-run -m /my-manifest.yml
```

You can also pass a path where you would like to save the output file to. For example:

```sh
if-run --manifest ./my-manifest.yml --output ./my-results.yml
## or using aliases
if-run -m ./my-manifest.yml -o ./my-results.yml
```

If you omit the `--output` command, your results will only be displayed in the console.

For more information on the `if-run` commands see the [CLI reference documentation](../reference/cli.md).
