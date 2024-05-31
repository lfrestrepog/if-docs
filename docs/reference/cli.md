# Command line tool 


A core feature of the Impact Framework is the `ie` command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file. 

We also provide several other command line tools that work in concert with `ie` to enable flows such as comparing, re-executing and verifying IF output files.

This page includes rfeerence documentation for the CLI tools, including the various commands and flags each tool exposes. 

We also provide tutorial-style user documentation for these tools in the [`Users`](../users/) section.


## `ie`

If you have globally installed our `if` npm package, you can invoke the CLI using the `ie` command directly in your terminal. The `ie` command is an alias to `npx ts-node src/index.ts`, which executes the Impact Framework's `src/index.ts` script and acts as the entry point for Impact Framework.

`ie <args>`

### `--manifest` , `-m`

The `--manifest` flag is the only required flag and tells `ie` where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:

```sh
ie --manifest examples/manifests/my-manifest.yml
```

###  `--output` , `-0`

The `--output` flag is optional and is used for defining a path to save your output data. If you provide the `--output` command with a path, you also need to specify the file type in the `initialize.outputs` block in your manifest file. With both pieces of information, IF will save your output data to file.  

Here is an example of `--output` being used to define a path:

```sh
ie --manifest examples/manifests/my-manifest.yml --output examples/outputs/my-outdata
## or using aliases
ie -m examples/manifests/my-manifest.yml -o examples/outputs/my-outdata
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
ie --manifest demo.yml --output demo#carbon
## or
ie -m demo.yml -o demo#carbon
```


### `--override-params` , `-p`

The `override-params` command is used when you want to discard our recommended set of parameters and associated units and aggregation methods and instead provide your own. We do not recommend this, and if you use this feature you take full responsibility for any errors you introduce downstream, including unit or aggregation errors. This is why we hide the ability to override the parameters behind a CLI command - it is an advanced feature that you should only use if you really know what you are doing. 

You pass the path to your new parameter file as an argument. The file is expected to conform to the same structure as our `src/config/params.ts` file.

For example:

```sh
ie --manifest <your manifest> --override-params <path-to-your-params-file>
## or using aliases
ie -m <your manifest> -p <path-to-your-params-file>
```


### `--help` , `-h`

The `--help` command provides information about all available commands in order to help you easily find the command you need.

Example:
```sh
ie --help
## or using alias
ie -h
```


## `if-diff`

The `if-diff` command line tool allows you to determine whether two manifest or output files are the same, and if not, how they differ.

`if-diff` needs two files to compare - a `source` and a `target`. The `source` file is considered to be the "true" file that another file, the `target`, is compared against. Note that for most purposes, it doesn't matter which file is assigned as `source` or `target` - the important thing is that `if-diff` receives two files. Both files should be `yaml` files. They are expected to be IF output files, meaning they contain all the required fields of a `manifest` plus the IF-generated `output` and `execution` blocks.

`if-diff` is run as follows:

```sh
if-diff --source file-1.yml --target file2.yml
```

You can also pipe the outputs from `ie` directly into `if-diff`. This means you only provide *one* file to `if-diff` and the other comes from a new `ie` run configured to send its output data to the console via `stdout`. This is an important feature because it allows you to receive an output file and verify that it was computed correctly and not tampered with post-execution. For example, if someone provides you with an output file, you can strip out the `outputs` section and re-run it with `ie`, piping the outputs straight to `if-diff` to compare against the original you received. 

If the original was correctly and honestly reported, `if-diff` will return a success response.

e.g.

```
ie -m my-manifest --stdout | if-diff --target my-output-file.yml
```


### `if-diff` matching rules

`if-diff` looks for differences between the `source` and `target`. However, `if-diff` applies its own IF-specific matching rules, ensuring that the outputs are functionally identical even if they are not precisely identical. For example, `if-diff` allows the order of nodes in a  tree to vary between files as long as identically named components contain identical data.

| Difference identified                                    | Report or ignore? | Note                                                                                       |
| -------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------ |
| trees contain different number of nodes                  | report            | works the same regardless whether `source` or `target` has more nodes                      |
| nodes in tree have different names                       | report            | There should be no named nodes existing in one file that aren't also in the other          |
| nodes in tree contain non-identical fields and/or values | report            | the data inside each tree component should contain identical keys/values                   |
| keys and values in context field are non- identical      | report            | the same fields should exist in the `context` sectiona dn their values should be identical |
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
