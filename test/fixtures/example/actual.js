var a = [
 'short',
 'dup long string',
 'dup long string',
 'dup long string2',
 'dup long string2',
 'long string unique',
];

function b() {
  [
   'short',
   'dup long string',
   'dup long string',
   'dup long string2',
   'dup long string2',
   'long string unique2',
  ];
}

module.exports = new Map([
  ['short', 'dup long string'],
  ['dup long string2', 'long string unique3']
]);
