# Command line tool 

A core feature of the Impact Framework is the `if` command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file. 

Let's take a look at the various commands exposed by `if`.

## `if`

If you have globally installed our `if` npm package, you can invoke the CLI using the `if` command directly in your terminal. The `if` command is an alias to `npx ts-node src/index.ts`, which executes the Impact Framework's `src/index.ts` script and acts as the entry point for Impact Framework.

`if <args>`

## `--manifest`

The `--manifest` flag is the only required flag and tells `if` where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:

```sh
if --manifest examples/manifests/my-manifest.yml
```

## `--output`

The `--output` flag is optional and is used for defining a path to save your output data. If you provide the `--output` command with a path, your output data will be saved as a `.yml` file to disk. If you omit this command, your output data will be displayed in the terminal.

Here is an example of `--output` being used to define a path:

```sh
if --manifest examples/manifests/my-manifest.yml --output examples/outputs/my-outdata.yml
```
