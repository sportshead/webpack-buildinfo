# webpack-buildinfo

Webpack buildinfo is a Webpack loader that injects build information into code.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  * [`esModule`](#esmodule)
  * [`all`](#all)

<!-- tocstop -->

## Installation

```bash
yarn add -D webpack-plugin-buildinfo # yarn (recommended)

npm install --save-dev webpack-plugin-buildinfo # npm
```

## Usage

ES6 Modules:

```javascript
import buildinfo from "!webpack-plugin-buildinfo?gitHashShort&time!";
```

Node.JS require:

```javascript
const buildinfo = require("!webpack-plugin-buildinfo?gitHashShort&time!");
```

You can then use the `buildinfo` object like so:

```javascript
console.log(
    `MyCoolProject v${buildinfo.gitHashShort} compiled at ${new Date(
        buildinfo.time
    ).toISOString()}`
);
```

## Configuration

Change the import string with the flags to set. E.g. `"!webpack-plugin-buildinfo?flag1&flag2&flag3!"`

For more up to date information see [the source code](src/index.ts).

<!-- ### `flagName`

**Type**: `flagType` <br>
**Default**: `flagDefault` <br>
**Description**: flagDescription <br> -->

### `esModule`

**Type**: `boolean` <br>
**Default**: `true` <br>
**Description**: Whether or not to use ES6 module syntax for output (i.e. `export default` instead of `module.exports =`)<br>

### `all`

**Type**: `boolean` <br>
**Default**: `false` <br>
**Description**: Override to enable all of the below flags. <br>

The following flags are all `boolean`s, with a default of `false`.

|       Name        |                                        Description                                         |                                   Example                                   |
|-------------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `gitHash`           | Full git hash of the current commit, as of build time. This is the hash of *your* project. | `"46030d85f6f1f1eaf62578e410e8cd83ddbcc28c"`                                |
| `gitHashShort`      | Same as above, but only the first 7 letters/numbers.                                       | `"46030d8"`                                                                 |
| `time`              | The number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.                     | `1605960299010`                                                             |
| `platform`          | OS Platform                                                                                | `"win32"`                                                                   |
| `arch`              | OS Arch                                                                                    | `"x64"`                                                                     |
| `cpus`              | Array of all the cpus                                                                      | [See documentation](https://nodejs.org/api/os.html#os_os_cpus)              |
| `hostname`          | Computer hostname                                                                          | `"Computer1234"`                                                            |
| `freemem`           | The amount of free system memory in bytes as an integer.                                   | `18772148224`                                                               |
| `totalmem`          | The total amount of system memory in bytes as an integer.                                  | `34274238464`                                                               |
| `userInfo`          | An object containing the uid, gid, shell, homedir, and username of the current user.       | [See documentation](https://nodejs.org/api/os.html#os_os_userinfo_options)  |
| `networkInterfaces` | An array of all the network interfaces.                                                    | [See documentation](https://nodejs.org/api/os.html#os_os_networkinterfaces) |
| `webpackVersion`    | Webpack version                                                                            | `"5.6.0"`                                                                   |
| `nodeVersion`       | Node.js version                                                                            | `"12.19.0"`                                                                 |
| `npmVersion`        | npm version                                                                                | `"6.14.8"`                                                                  |
| `yarnVersion`       | Yarn version                                                                               | `"2.3.3"`                                                                   |
