---
sidebar_position: 6
---

# Verifying IF outputs with `if-check`

IF includes a command line tool called `if-check` that can be used to verify the results in a manifest file.

Imagine that someone provides you with a computed manifest file that they claim demonstrates the environmental impact of their software application.

You could trust them and take their results at face value, but there are probably cases where you think someone might have made a mistake or might be massaging their data in a dishonest way. Maybe you just need to demonstrate due diligence in the quality of the data you receive and use. In these cases, you can make use of `if-check`.

`if-check` is a single command that takes a given manifest file, sets up an environment where it can be executed, executes it, and compares the newly generated results to those in the original file. This means you can independently verify the results in the file using your own local copy of IF.

Under the hood, `if-check` is wrapping calls to `if-env` and `if-diff`, so if you need granular control over the information flow for some reason, you could achieve the same result using separate calls to those commands.

## Example

Alice is a manifest verifier. She receives a manifest from Bob. Bob is a good actor and has provided a valid file. Alice is a good cypherpunk who verifies everything.

Here is Bob's manifest:

```yaml
name: bobs-manifest
description:
tags: null
initialize:
  plugins:
    sci:
      path: builtin
      method: Sci
      config:
        functional-unit: requests
execution:
  command: >-
    /home/bob/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /home/bob/Code/if/src/index.ts -m manifests/plugins/sci/success.yml -s
  environment:
    if-version: 0.4.0
    os: linux
    os-version: 5.15.0-113-generic
    node-version: 21.4.0
    date-time: 2024-06-27T14:10:29.830Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
      - '@grnsft/if-core@0.0.9'
      - '@jest/globals@29.7.0'
      - '@types/jest@29.5.8'
      - '@types/js-yaml@4.0.9'
      - '@types/luxon@3.4.2'
      - '@types/node@20.9.0'
      - axios-mock-adapter@1.22.0
      - axios@1.7.2
      - cross-env@7.0.3
      - csv-parse@5.5.6
      - csv-stringify@6.4.6
      - fixpack@4.0.0
      - gts@5.2.0
      - husky@8.0.3
      - jest@29.7.0
      - js-yaml@4.1.0
      - lint-staged@15.2.2
      - luxon@3.4.4
      - release-it@16.3.0
      - rimraf@5.0.5
      - ts-command-line-args@2.5.1
      - ts-jest@29.1.1
      - typescript-cubic-spline@1.0.1
      - typescript@5.2.2
      - winston@3.11.0
      - zod@3.22.4
  status: success
tree:
  children:
    child-1:
      pipeline:
        observe:
        regroup:
        compute:
          - sci
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 5
          carbon-operational: 5
          carbon-embodied: 0.02
          carbon: 5.02
          requests: 100
      outputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 5
          carbon-operational: 5
          carbon-embodied: 0.02
          carbon: 5.02
          requests: 100
          sci: 0.050199999999999995
    child-2:
      pipeline:
        observe:
        regroup:
        compute:
          - sci
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 8
          carbon-operational: 8
          carbon-embodied: 0.02
          carbon: 8.02
          requests: 100
      outputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 8
          carbon-operational: 8
          carbon-embodied: 0.02
          carbon: 8.02
          requests: 100
          sci: 0.0802
```

Alice runs :

```
if-check -m bobs-manifest.yml
```

And receives the response:

```
if-check: successfully verified bobs-manifest
```

Charlie also has a copy of Bob's manifest. He wants to trick Alice into thinking his SCI score is lower, so he overwrites the values in the manifest file, making them lower. Charlie's manifest looks like this:

```yaml
# start
name: charlies-manifest
description:
tags: null
initialize:
  plugins:
    sci:
      path: builtin
      method: Sci
      config:
        functional-unit: requests
execution:
  command: >-
    /home/charlie/.npm/_npx/1bf7c3c15bf47d04/node_modules/.bin/ts-node
    /home/charlie/Code/if/src/index.ts -m manifests/plugins/sci/success.yml -s
  environment:
    if-version: 0.4.0
    os: linux
    os-version: 5.15.0-113-generic
    node-version: 21.4.0
    date-time: 2024-06-27T14:10:29.830Z (UTC)
    dependencies:
      - '@babel/core@7.22.10'
      - '@babel/preset-typescript@7.23.3'
      - '@commitlint/cli@18.6.0'
      - '@commitlint/config-conventional@18.6.0'
      - '@grnsft/if-core@0.0.9'
      - '@jest/globals@29.7.0'
      - '@types/jest@29.5.8'
      - '@types/js-yaml@4.0.9'
      - '@types/luxon@3.4.2'
      - '@types/node@20.9.0'
      - axios-mock-adapter@1.22.0
      - axios@1.7.2
      - cross-env@7.0.3
      - csv-parse@5.5.6
      - csv-stringify@6.4.6
      - fixpack@4.0.0
      - gts@5.2.0
      - husky@8.0.3
      - jest@29.7.0
      - js-yaml@4.1.0
      - lint-staged@15.2.2
      - luxon@3.4.4
      - release-it@16.3.0
      - rimraf@5.0.5
      - ts-command-line-args@2.5.1
      - ts-jest@29.1.1
      - typescript-cubic-spline@1.0.1
      - typescript@5.2.2
      - winston@3.11.0
      - zod@3.22.4
  status: success
tree:
  children:
    child-1:
      pipeline:
        observe:
        regroup:
        compute:
          - sci
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 5
          carbon-operational: 5
          carbon-embodied: 0.02
          carbon: 5.02
          requests: 100
      outputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 5
          carbon-operational: 5
          carbon-embodied: 0.02
          carbon: 5.02
          requests: 100
          sci: 0.020199999999999995
    child-2:
      pipeline:
        observe:
        regroup:
        compute:
          - sci
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 8
          carbon-operational: 8
          carbon-embodied: 0.02
          carbon: 8.02
          requests: 100
      outputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 8
          carbon-operational: 8
          carbon-embodied: 0.02
          carbon: 8.02
          requests: 100
          sci: 0.0102
```

Now, when Alice runs `if-check -m charlies-manifest`, she receives:

```yaml
if-check could not verify charlies-manifest. The re-executed file does not match the original.

Files do not match!
tree.children.child-1.outputs.0.sci
source: 0.050199999999999995
target: 0.020199999999999995
```

Not only can Alice see that the files do not match, she can see which values Charlie manipulated.

## Running IF over multiple manifests

Alice could also run `if-check` over any number of manifests in a single command, using the `-d` subcommand. For a folder containing `n` manifests, pass the folder path:

```sh
if-check -d /my-folder-of-manifests
```

Each manifest will be run through `if-check` in sequence.

## `if-check` limitations

`if-check` can verify that a manifest is correctly calculated. However, if someone really wanted to use a fraudulent manifest, they could provide fraudulent _input_ data not _output_ data. There's little we can really do about this - if someone provides fake input data it is out of IF's remit. This means that although the examples above are good for demonstrating how `if-check` works, it's more likely to be used to check for bugs and configuration errors than it is to be used to detect fraud.
