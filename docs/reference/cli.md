# Command line tool 

A core feature of the Impact Framework is the `ie` command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file. 

Let's take a look at the various commands exposed by `ie`.

## `ie`

If you have globally installed our `if` npm package, you can invoke the CLI using the `ie` command directly in your terminal. The `ie` command is an alias to `npx ts-node src/index.ts`, which executes the Impact Framework's `src/index.ts` script and acts as the entry point for Impact Framework.

`ie <args>`

## `--manifest` , `-m`

The `--manifest` flag is the only required flag and tells `ie` where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:

```sh
ie --manifest examples/manifests/my-manifest.yml
```

##  `--output` , `-0`

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

### CSV export identifiers

If you want to save data to CSV, you have to select a specific metric to export. You do this by adding a hashtag and the metric name after the savepath provided to the output command. For example, you could save the `carbon` data to a CSV file called `demo.csv` as follows:


```sh
ie --manifest demo.yml --output demo#carbon
## or
ie -m demo.yml -o demo#carbon
```


## `--override-params` , `-p`

The `override-params` command is used when you want to discard our recommended set of parameters and associated units and aggregation methods and instead provide your own. We do not recommend this, and if you use this feature you take full responsibility for any errors you introduce downstream, including unit or aggregation errors. This is why we hide the ability to override the parameters behind a CLI command - it is an advanced feature that you should only use if you really know what you are doing. 

You pass the path to your new parameter file as an argument. The file is expected to conform to the same structure as our `src/config/params.ts` file.

For example:

```sh
ie --manifest <your manifest> --override-params <path-to-your-params-file>
## or using aliases
ie -m <your manifest> -p <path-to-your-params-file>
```


## `--help` , `-h`

The `--help` command provides information about all available commands in order to help you easily find the command you need.

Example:
```sh
ie --help
## or using alias
ie -h
```

Use the `debug` command if you want to diagnose and fix errors in your plugin:

```sh
ie --manifest <path-to-your-manifest-file> --debug
```