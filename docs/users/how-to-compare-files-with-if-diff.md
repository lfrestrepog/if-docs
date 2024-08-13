---
sidebar_position: 6
---

# How to compare files with `if-diff`

`if-diff` is a command line tool that allows you to compare two `if-run` output files. They either match according to `if-diff`'s matching rules, or they don't. If they match, then `if-diff` returns a simple success response. If the differ, then `if-diff` returns a report of the differences it finds.

## Why is this useful?

`if-diff` can be used to verify that a given output file was correctly executed and that it was not tampered with after it was computed. Imagine you received an output file from someone, reporting their carbon expenditure. It is better to verify than trust this person's report, so you simply delete the `outputs` block from the file (creating a manifest), run it through `if-run` and compare the output to the original file you received. All being well, the two files are identical. if not, you can see exactly where the differences are.

`if-diff` can also be used for debugging your own files. Maybe you have some large manifest files in development and have accidentally introduced some changes that you are now struggling to identify, but are leading to different `if-run` outcomes. `if-diff` can quickly scan your two files and tell you where the differences are so you can get back in sync.

## Example: output verification

Let's say someone provides you with this output file, `given-output-file.yml`:

```yaml
name: sum
description: successful path
tags:
initialize:
  plugins:
    sum:
      method: Sum
      path: 'builtin'
      config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
          - sum
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          network/energy: 0.001
      outputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          network/energy: 0.001
          energy: 0.0005
```

This manifest simply sums two components, `cpu/energy` and `network/energy` and assigns the result to `energy` in the outputs array. You receive this file and feel like something's not quite right. So you delete the outputs block to create `test-manifest.yml`:

```yaml
name: sum
description: successful path
tags:
initialize:
  plugins:
    sum:
      method: Sum
      path: 'builtin'
      config:
        input-parameters: ['cpu/energy', 'network/energy']
        output-parameter: 'energy'
tree:
  children:
    child:
      pipeline:
        observe:
        regroup:
        compute:
          - sum
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          cpu/energy: 0.001
          network/energy: 0.001
```

Now you want to _run_ the manifest through `if-run` and compare the result to the given output file. You can do this by piping the result of `if-run` directly into `if-diff` as follows:

```bash
if-run -m test-manifest.yml | if-diff --target given-output-file.yml
```

The result is:

```sh
Files do not match!
tree.children.child[0].energy
source: 0.002
target:  0.0005
```

Uh oh. It seems there has been some mistake or tampering with the outputs in `given-output-file.yml`. The right result of summing `cpu/energy` and `network/energy` is 0.002, but they reported 0.0005. You can now query that result with the sender and ask them to fix it.

Obviously, this is an arbitrary, simplified example, but `if-diff` enables you to do this kind of output verification on very complex manifests where errors are harder to spot by eye and to do it programmatically over large numbers of files.

## Example: debugging

Imagine you developed a manifest that was giving you a consistent result, but now when you run it your result is different and you are not sure why. Maybe one of your colleagues changed something and forgot to tell you, maybe you accidentally inserted or removed something while you were working.

You could revert to an archived version, but you moved all the components around into a structure you prefer! `if-diff` has you covered. It will step through the files identifying all the functional differences between the files to help you identify the problematic one(s).

You have `original-manifest.yml` and `new-manifest.yml`. Pass them to `if-diff` as follows:

```sh
if-diff --source original-manifest.yml --target new-manifest.yml
```

`if-diff` will report each difference it finds. You can fix the difference and run `if-diff` again until you get a success response - since `if-diff` ignores positional differences and only considers differences in `context` and `tree` keys and values, your two manifests will run identically even though you persist your tree reorganization.
