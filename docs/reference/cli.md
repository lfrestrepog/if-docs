# Command line tool

A core feature of the Impact Framework is the `if-run` command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file.

We also provide several other command line tools that work in concert with `if-run` to enable flows such as comparing, re-executing and verifying IF output files.

This page includes reference documentation for the CLI tools, including the various commands and flags each tool exposes.

We also provide tutorial-style user documentation for these tools in the [`Users`](../users/) section.

## `if-run`

If you have globally installed our `if` npm package, you can invoke the CLI using the `if-run` command directly in your terminal. The `if-run` command is an alias to `npx ts-node src/index.ts`, which executes the Impact Framework's `src/index.ts` script and acts as the entry point for Impact Framework.

`if-run <args>`

### `--manifest` , `-m`

The `--manifest` flag is the only required flag and tells `if-run` where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:

```sh
if-run --manifest examples/manifests/my-manifest.yml
```

### `--output` , `-0`

The `--output` flag is optional and is used for defining a path to save your output data. If you provide the `--output` command with a path, you also need to specify the file type in the `initialize.outputs` block in your manifest file. With both pieces of information, IF will save your output data to file.

Here is an example of `--output` being used to define a path:

```sh
if-run --manifest examples/manifests/my-manifest.yml --output examples/outputs/my-outdata
## or using aliases
if-run -m examples/manifests/my-manifest.yml -o examples/outputs/my-outdata
```

If `my-manifest.yml` contains the following config, then a `yaml` file named `my-outdata.yml` will be created, containing the results from your IF run.

```yaml
initialize:
  output:
    - yaml
```

#### CSV export identifiers

If you want to save data to CSV, you have to select a specific metric to export. You do this by adding a hashtag and the metric name after the savepath provided to the output command. For example, you could save the `carbon` data to a CSV file called `demo.csv` as follows:

```sh
if-run --manifest demo.yml --output demo#carbon
## or
if-run -m demo.yml -o demo#carbon
```

### `--override-params` , `-p`

The `override-params` command is used when you want to discard our recommended set of parameters and associated units and aggregation methods and instead provide your own. We do not recommend this, and if you use this feature you take full responsibility for any errors you introduce downstream, including unit or aggregation errors. This is why we hide the ability to override the parameters behind a CLI command - it is an advanced feature that you should only use if you really know what you are doing.

You pass the path to your new parameter file as an argument. The file is expected to conform to the same structure as our `src/config/params.ts` file.

For example:

```sh
if-run --manifest <your manifest> --override-params <path-to-your-params-file>
## or using aliases
if-run -m <your manifest> -p <path-to-your-params-file>
```

### `--help` , `-h`

The `--help` command provides information about all available commands in order to help you easily find the command you need.

Example:

```sh
if-run --help
## or using alias
if-run -h
```

### `--debug`

You can provide the `--debug` flag to `ie` in order to display execution logs to the console. These logs show messages for each operation IF and its plugins are executing. For example, your `debug` logs will look similar to the following:

```sh
INFO: 2024-06-12T08:48:02.918Z: Starting IF
DEBUG: 2024-06-12T08:48:02.919Z: Loading manifest
DEBUG: 2024-06-12T08:48:02.924Z: Capturing runtime environment data
DEBUG: 2024-06-12T08:48:03.978Z: Validating manifest
DEBUG: 2024-06-12T08:48:03.980Z: Syncing parameters
DEBUG: 2024-06-12T08:48:03.980Z: Initializing plugins
DEBUG: 2024-06-12T08:48:03.981Z: Initializing Sum
DEBUG: 2024-06-12T08:48:03.981Z: Loading Sum from builtin
DEBUG: 2024-06-12T08:48:04.859Z: Initializing Coefficient
DEBUG: 2024-06-12T08:48:04.859Z: Loading Coefficient from builtin
DEBUG: 2024-06-12T08:48:04.860Z: Initializing Multiply
DEBUG: 2024-06-12T08:48:04.860Z: Loading Multiply from builtin
DEBUG: 2024-06-12T08:48:04.860Z: Computing pipeline for `sum`
DEBUG: 2024-06-12T08:48:04.861Z: Computing pipeline for `coefficient`
DEBUG: 2024-06-12T08:48:04.861Z: Computing pipeline for `multiply`
DEBUG: 2024-06-12T08:48:04.862Z: Aggregating outputs
DEBUG: 2024-06-12T08:48:04.862Z: Preparing output data
```

You can use the `--debug` flag to help debug failing IF runs. You will see exactly where in the execution pipeline an error arose. If the error arose from a plugin, this will be clear from the execution logs, for example:

```sh
INFO: 2024-06-12T08:53:21.376Z: Starting IF
DEBUG: 2024-06-12T08:53:21.376Z: Loading manifest
DEBUG: 2024-06-12T08:53:21.381Z: Capturing runtime environment data
DEBUG: 2024-06-12T08:53:22.367Z: Validating manifest
DEBUG: 2024-06-12T08:53:22.369Z: Syncing parameters
DEBUG: 2024-06-12T08:53:22.369Z: Initializing plugins
DEBUG: 2024-06-12T08:53:22.369Z: Initializing Sum
DEBUG: 2024-06-12T08:53:22.370Z: Loading Sum from builtin
DEBUG: 2024-06-12T08:53:23.165Z: Initializing Coefficient
DEBUG: 2024-06-12T08:53:23.165Z: Loading Coefficient from builtin
DEBUG: 2024-06-12T08:53:23.165Z: Initializing Multiply
DEBUG: 2024-06-12T08:53:23.165Z: Loading Multiply from builtin
DEBUG: 2024-06-12T08:53:23.165Z: Computing pipeline for `sum`
[2024-06-12 09:53:23.166 AM] error:     cpu/energy is missing from the input array.
```

## `if-diff`

The `if-diff` command line tool allows you to determine whether two manifest or output files are the same, and if not, how they differ.

`if-diff` needs two files to compare - a `source` and a `target`. The `source` file is considered to be the "true" file that another file, the `target`, is compared against. Note that for most purposes, it doesn't matter which file is assigned as `source` or `target` - the important thing is that `if-diff` receives two files. Both files should be `yaml` files. They are expected to be IF output files, meaning they contain all the required fields of a `manifest` plus the IF-generated `output` and `execution` blocks.

`if-diff` is run as follows:

```sh
if-diff --source file-1.yml --target file2.yml
```

You can also pipe the outputs from `if-run` directly into `if-diff`. This means you only provide _one_ file to `if-diff` and the other comes from a new `if-run` run configured to send its output data to the console via `stdout`. This is an important feature because it allows you to receive an output file and verify that it was computed correctly and not tampered with post-execution. For example, if someone provides you with an output file, you can strip out the `outputs` section and re-run it with `if-run`, piping the outputs straight to `if-diff` to compare against the original you received.

If the original was correctly and honestly reported, `if-diff` will return a success response.

e.g.

```
if-run -m my-manifest --stdout | if-diff --target my-output-file.yml
```

### `if-diff` matching rules

`if-diff` looks for differences between the `source` and `target`. However, `if-diff` applies its own IF-specific matching rules, ensuring that the outputs are functionally identical even if they are not precisely identical. For example, `if-diff` allows the order of nodes in a tree to vary between files as long as identically named components contain identical data.

| Difference identified                                    | Report or ignore? | Note                                                                                       |
| -------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------ |
| trees contain different number of nodes                  | report            | works the same regardless whether `source` or `target` has more nodes                      |
| nodes in tree have different names                       | report            | There should be no named nodes existing in one file that aren't also in the other          |
| nodes in tree contain non-identical fields and/or values | report            | the data inside each tree component should contain identical keys/values                   |
| keys and values in context field are non- identical      | report            | the same fields should exist in the `context` section and their values should be identical |
| `status` and `error` fields in `execution` block         | report            | Only these two fields in `execution` are considered                                        |
| order of nodes in tree are different                     | ignore            | if data is identical, position of node in tree is ignored                                  |
| order of fields in context                               | ignore            | if data is identical, position of field in context is ignored                              |
| content of execution block EXCEPT `status` and `error`   | ignore            | environment information is ignored                                                         |

### `if-diff` outputs

If `if-diff` finds no in-scope differences between the `source` and `target` then it returns a success message and exit code `0`:

```sh
FILES MATCH and exit code 0.
```

If `if-diff` detects an in-scope difference between the files, it halts execution, returns exit code `1` and reports the difference to the command line.

The report includes the yaml path to the differing element in the tree, the value in the `source` and the value in the `target`, using the following schema:

```
Files do not match!
<yaml path to non-matching element>
source: <value in source file>
target: <value in target file>
```

If the difference relates to a missing node in the tree for source or target then `<value in x file>` should be either exists or missing and the yaml path should point to the highest level element that is missing (e.g. if an entire child component is missing, provide the path to the child component).

e.g. different values detected for a given key in an input array:

```
Files do not match!
tree.children.vm1[4].cpu/utilization
source: 45
target:  43
```

e.g. different components in `tree` in `source` and `target`:

```sh
Files do not match!
tree.children.child1
source: missing
target:  exists
```

## `if-env`

`if-env` is a command line tool that helps you to create local development environments where you can run manifests.

There are two use cases for this:

1) setting up a new development environment for plugin building
2) replicating a runtime environment for a given manifest, so you can re-execute it

### commands

- `--manifest` or `-m`: the path to a manifest whose dependencies you want to install
- `--install` or `-i`: instructs `if-env` to automatically install the dependencies in the local `package.json`
- `--cwd` or `-c`: forces `if-env` to create or update the package.json in the current working directory. This is already default behaviour when no arguments are passed to `if-env`, but when a manifest is passed to `-m`, `if-env` defaults to saving a package.json in the same folder as the manifest. using `-cwd` overrides that behaviour and uses the current working directory as the `package.json` target path.

### Setting up new development environments using `if-env`

If you are creating a new manifest from scratch and want to bootstrap your way in, you can use `if-env` with no arguments to generate a template manifest and package.json in your current working directory. Then, all you need to do is tweak the templates for your specific use case. 

For example:

```sh
mkdir my-manifest && cd my-manifest
if-env
```

After running these commands, you will see the following files in `my-manifest`:

```
ls my-manifest

> package.json manifest.yaml
```

Now, you can use these files as templates for your manifest development.


### Replicating runtime environments using `if-env`

If you are given an IF output file and you want to re-run it, you can use `if-env` to install that output file's dependencies so that all the plugins in its execution pipeline can be executed.

For example, if you are given a file, `output-file.yml`, you can save the file to `if` and run

```
cd if
if-env -m output-file.yml
```

`if-env` will compare the installed dependencies in the `package.json` it sees in `if` with the dependencies listed in `output-file.yaml`. Any dependencies that are in `output-file.yaml` and not in `if/package.json` will be added to `if-package.json`. Then, you can run:

```sh
npm i
```

and you are ready to re-execute `output-file.yaml` in your local environment. We also provide the `--install` flag to instruct `if-env` to automatically run `npm i` after merging the dependencies, so you could craft a single command to install all the relevant dependencies and then run the manifest, as follows:

```sh
if-env -m output-file.yml -i && if-run -m output-file.yml -s
```



## `if-check`

`if-check` is a manifest verification tool that is equivalent to running `if-env` and `if-diff` on a given manifest file. The manifest file must have `outputs` and an `execution` section for `if-check` to run.

The intended use case is to verify that a manifest's outputs are correct and honest. Say someone handed you a manifest as evidence of their environmental impact. You could choose to trust them, or you could run `if-check` to verify that their calculations are correct. Under the hood, IF is creating a development environment using the dependencies listed in the given file's `execution` section and then executing the file locally, then comparing the newly generated results to those in the given file.

To check a file:

```
if-check -m <path-to-file>
```

If the `if-check` is successful you will receive the following response:

```
if-check: successfully verified <filename>
```

If `if-check` was not able to verify the file because there were differences in the given and re-executed files, then you will receive the following response which includes the details of how the files differ, as per `if-diff`.

```
if-check: could not verify <filename>. The re-executed file does not match the original.
```
