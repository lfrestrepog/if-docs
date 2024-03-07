# Command line tool 

A core feature of the Impact Framework is the `ie` command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file. 

Let's take a look at the various commands exposed by `ie`.

## `ie`

If you have globally installed our `if` npm package, you can invoke the CLI using the `ie` command directly in your terminal. The `ie` command is an alias to `npx ts-node src/index.ts`, which executes the Impact Framework's `src/index.ts` script and acts as the entry point for Impact Framework.

`ie <args>`

## `--manifest`

The `--manifest` flag is the only required flag and tells `ie` where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:

```sh
ie --manifest examples/manifests/my-manifest.yml
```

## `--output`

The `--output` flag is optional and is used for defining a path to save your output data. If you provide the `--output` command with a path, your output data will be saved as a `.yml` file to disk. If you omit this command, your output data will be displayed in the terminal.

Here is an example of `--output` being used to define a path:

```sh
ie --manifest examples/manifests/my-manifest.yml --output examples/outputs/my-outdata.yml
```


## `--override-params`

The `override-params` command is used when you want to discard our recommended set of parameters and associated units and aggregation methods and instead provide your own. We do not recommend this, and if you use this feature you take full responsibility for any errors you introduce downstream, including unit or aggregation errors. This is why we hide the ability to oevrride the parameters behind a CLI command - it is an advanced feature that you should only use if you really know what you are doing. 

You pass the path to your new parameter file as an argument. The file is expected to conform to the same structure as our `src/config/params.ts` file.

For example:

```sh
ie --manifest <your manifest> --override-params <path-to-your-params-file>
```
