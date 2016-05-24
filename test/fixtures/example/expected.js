var _ = 'dup long string';
var _2 = 'dup long string2';
var a = [_, _, _2, _2, 'long string unique'];

function b() {
  [_, _, _2, _2, 'long string unique2'];
}

module.exports = new Map([[_], [_2, 'long string unique3']]);
