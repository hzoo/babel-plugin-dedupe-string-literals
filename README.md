# babel-plugin-dedupe-string-literals

Dedupe long strings in arrays as new variable declarations at the top level.

## Example

**In**

```js
var a = ['a', 'long string', 'long string'];
```

**Out**

```js
var _a = 'long string';
var a = ['a', _a, _a];
```

## Installation

```sh
# if babel isn't already installed, it creates a `babel` cli command
$ npm install babel-cli
$ npm install babel-plugin-dedupe-string-literals
```

## Options

`minimumStringLength` - The minimum string length that will apply this transform. If the string length is too small, it will leave the string as is.

> This means that a string like `'a'` with a length of 1 won't get a new variable created for it.

## Usage

### Via `.babelrc` config file (Recommended)

> Check http://babeljs.io/docs/usage/babelrc/ for more info

**.babelrc**

```js
// without options
{
  "plugins": ["dedupe-string-literals"]
}

// with options
{
  "plugins": [
    ["dedupe-string-literals", {
      "minimumStringLength": 7 // defaults to 0
    }]
  ]
}
```

### Via CLI

> Check http://babeljs.io/docs/usage/cli/ for more info

```sh
$ babel --plugins dedupe-string-literals script.js
```

### Via Node API

> Check http://babeljs.io/docs/usage/api/ for more info

```javascript
require("babel-core").transform("code", {
  plugins: ["dedupe-string-literals"]
});
```
