---
sidebar-position: 6
---

# How to create an exhaust script

The `If` framework outputs data in `yaml` format. Any other output formats require a separate script that takes the yaml output data and processes it. We provide [`if-csv`](../users/how-to-export-csv-file-with-if-csv.md) for outputting data in `csv` format bundled with IF.  For any other format, you need to write an exhaust script. 
This guide will help you create your own exhaust script.

In this example, we'll create a script that executes the manifest and outputs the data in `json` format.

```ts
const IfJson = async () => {
  const { manifest, output } = await parseIfCsvArgs();

  if (manifest) {
    const { rawManifest } = await load(manifest);
    const envManifest = await injectEnvironment(rawManifest);
    const { tree, ...context } = validateManifest(envManifest);
    const pluginStorage = await initialize(context.initialize.plugins);
    const computedTree = await compute(tree, { context, pluginStorage });
    const aggregatedTree = aggregate(computedTree, context.aggregation);

    // Add logic to export the executed manifest to `json` format.
  }

  process.exit(0);
};

IfJson().catch(handleError);
```

To add this script to your package.json, include the following entry in the scripts section:

```json
"scripts": {
  "if-json": "npx ts-node if-json.ts"
}
```

This setup ensures that your script will execute the manifest and output the data in JSON format.
