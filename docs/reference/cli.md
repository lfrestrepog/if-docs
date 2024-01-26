# CLI 

The core feature of the Impact Framework is the command line tool, `impact-engine`. 

`impact-engine` is the way that you trigger Impact Framework to execute a certain manifest file. 

This page defines the various commands exposed by `impact-engine`.

## `impact-engine`

If you have globally installed our `if` npm package, you can invoke the CLI using the `impact-engine` command directly in your terminal. The `impact-engine` command is an alias to `npx ts-node src/index.ts` which executes the Impact Framework's `src/index.ts` script. This is the entry point for Impact Framework.

`impact-engine <args>`

## `--impl`

The `--impl` flag is the only required flag for `impact-engine`. It tells `impact-engine` where to find the manifest file that you want to execute.
`--impl` command expects to receive a path where your manifest file is saved.

e.g.

```sh
impact-engine --impl examples/impls/my-manifest.yml
```

## `--ompl`

The ompl flag is for defining a path to save your output data. This is optional. If you provide the `--ompl` command with a path your output data will be saved as a `.yml` file to disk. You can also omit this command entirely, in which case your output data will be displayed in the terminal.

e.g.

```sh
impact-engine --impl examples/impls/my-manifest.yml --ompl examples/ompls/my-outdata.yml
```
