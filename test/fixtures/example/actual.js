var a = [
 'dup long string',
 'dup long string',
 'dup long string2',
 'dup long string2',
 'long string unique',
];

function b() {
  [
   'dup long string',
   'dup long string',
   'dup long string2',
   'dup long string2',
   'long string unique2',
  ];
}

module.exports = new Map([
  ['dup long string'],
  ['dup long string2', 'long string unique3']
]);
