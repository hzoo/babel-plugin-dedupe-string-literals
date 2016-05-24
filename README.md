# babel-plugin-dedupe-string-literals

Dedupe strings as new variable declarations at the Program/top level.

Ref: https://twitter.com/mathias/status/734168515310194688

> This plugin uses a native [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) so it only supports node >= 0.12.

## Example

**In**

```js
'use strict';
import z from 'a';
var a = ['a', 'long string', 'long string'];

function b() {
  'use strict';
  g('a');
  h['a'];
}
```

**Out**

```js
'use strict';

import z from 'a';
var _ = 'long string';
var a = [_2, _, _];

var _2 = 'a';
function b() {
  'use strict';

  g(_2);
  h[_2];
}
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
