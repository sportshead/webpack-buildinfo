# webpack-buildinfo

Webpack buildinfo is a Webpack loader that injects build information into code.

## Usage

ES6 Modules:

```javascript
import buildinfo from "!@sportshead/webpack-buildinfo?gitHashShort&time!";
```

Node.JS require:

```javascript
const buildinfo = require("!@sportshead/webpack-buildinfo?gitHashShort&time!");
```

You can then use the `buildinfo` object like so:

```javascript
console.log(
    `MyCoolProject v${buildinfo.gitHashShort} compiled at ${new Date(
        buildinfo.time
    ).toISOString()}`
);
```
