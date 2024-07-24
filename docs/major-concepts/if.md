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

## Phased execution

To enable greener and more flexible use of IF, we separate the manifest execution into distinct phases: `observe`, `regroup` and `compute`. This is invisible to you when you run `if-run` but behind the scenes all three of these phases are being run. However, you can instruct IF to run these phases individually, to avoid recomputing parts of the manifest unnecessarily. To do this, you simply pass `--observe`, `--regroup`, and `--compute` flags to IF in the combination you need. For example, to run *only* the observe phase (to generate input data):

```
if-run -m <manifest> --observe
```

to run the compute phase on its own:

```
if-run -m <manifest> --compute
```

To run the observe and compute phases without regrouping:

```
if-run -m <mnaifest> --observe --compute
```
