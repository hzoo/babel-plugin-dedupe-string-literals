var _a = 'dup long string';
var _a2 = 'dup long string2';
var a = [_a, _a, _a2, _a2, 'long string unique'];

function b() {
  [_a, _a, _a2, _a2, 'long string unique2'];
}

module.exports = new Map([[_a], [_a2, 'long string unique3']]);
