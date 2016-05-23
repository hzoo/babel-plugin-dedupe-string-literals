var _a = 'dup long string';
var _a2 = 'dup long string2';
var a = ['short', _a, _a, _a2, _a2, 'long string unique'];

function b() {
  ['short', _a, _a, _a2, _a2, 'long string unique2'];
}

module.exports = new Map([['short', _a], [_a2, 'long string unique3']]);
