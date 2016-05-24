// Babel plugin to dedupe strings as new variable declarations at the Program/top level.
// Ref https://twitter.com/mathias/status/734168515310194688

export default function ({types: t}) {
  return {
    pre() {
      this.cache = {};
    },
    visitor: {
      StringLiteral(path, state) {
        // don't replace import/export strings
        if (path.parentPath.isModuleDeclaration()) {
          return;
        }

        let minimumStringLength = state.opts.minimumStringLength;
          let value = path.node.value;

          // minimumStringLength option to run the transform
          if (value.length < (minimumStringLength || 0)) {
            return;
          }

          // TODO: should the key just be the string value?
          if (!this.cache[value]) {
            this.cache[value] = { indexes: 1, firstPath: path };
          } else {
            let cachedValue = this.cache[value];
            cachedValue.indexes++;

            let uid;
            // after the first duplicate value
            // create the new variable declaration
            if (cachedValue.indexes === 2) {

              // TODO: can use something else
              uid = path.scope.generateUidIdentifier("a");

              if (!cachedValue.ref) {
                cachedValue.ref = uid;
              }
              cachedValue.firstPath.replaceWith(uid);

              let newString = t.stringLiteral(value);
              // create private property so that string isn't replaced
              // with a reference to itself
              newString._created = true;

              let declar = t.variableDeclaration("var", [
                t.variableDeclarator(uid, newString)
              ]);
              let childOfProgramPath = path.findParent((path) => {
                return path.parentPath.isProgram();
              });
              childOfProgramPath.insertBefore(declar);
            } else {
              uid = cachedValue.ref;
            }

            // change the string reference with the
            // newly created variable reference
            if (!path.node._created) {
              path.replaceWith(uid);
            }
          }
      } // StringLiteral
    }
  };
}
