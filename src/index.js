// Babel plugin to hoist long string references to the top level
// Ref https://twitter.com/mathias/status/734168515310194688


export default function ({types: t}) {
  return {
    pre() {
      this.cache = {};
    },

    visitor: {
      ArrayExpression(path, state) {
        let minimumStringLength = state.opts.minimumStringLength;
        let elements = path.get('elements');

        for (let i = 0; i < elements.length; i++) {
          let elementPath = elements[i];

          if (!elementPath.isStringLiteral()) {
            continue;
          }

          let value = elementPath.node.value;

          // minimumStringLength option to run the transform
          if (value.length < (minimumStringLength || 7)) {
            continue;
          }

          // use a hash?
          if (!this.cache[value]) {
            this.cache[value] = { indexes: 1, firstPath: elementPath };
          } else {
            let cachedValue = this.cache[value];
            cachedValue.indexes++;

            let uid;
            // after the first duplicate value,
            // create the new variable declaration
            if (cachedValue.indexes === 2) {

              uid = path.scope.generateUidIdentifier("a"); // can use something else
              if (!cachedValue.ref) {
                cachedValue.ref = uid;
              }
              cachedValue.firstPath.replaceWith(uid);

              let declar = t.variableDeclaration("var", [
                t.variableDeclarator(uid, t.stringLiteral(value))
              ]);
              let childOfProgramPath = elementPath.findParent((path) => {
                return path.parentPath.isProgram();
              });
              childOfProgramPath.insertBefore(declar);
            } else {
              uid = cachedValue.ref;
            }

            // change the string reference with the
            // newly created variable reference
            elementPath.replaceWith(uid);
          }
        }
      } // ArrayExpression
    }
  };
}
