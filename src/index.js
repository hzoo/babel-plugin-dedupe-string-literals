// Babel plugin to hoist long string references
// Ref https://twitter.com/mathias/status/734168515310194688

export default function ({types: t}) {
  return {
    visitor: {
      ArrayExpression(path, state) {
        let minimumStringLength = state.opts.minimumStringLength;
        // cache is per array atm
        let cache = {};
        let elements = path.get('elements');

        for (let i = 0; i < elements.length; i++) {
          let elementPath = elements[i];

          if (!elementPath.isStringLiteral()) {
            continue;
          }

          let value = String(elementPath.node.value); // cast to string

          if (value.length < (minimumStringLength || 7)) {
            continue;
          }

          if (!cache[value]) { // use a hash?
            cache[value] = { indexes: [i] };
          } else {
            cache[value].indexes.push(i);

            let functionParentPath = elementPath.findParent((path) => {
              return path.parentPath.isBlockStatement() || path.parentPath.isFunction() || path.parentPath.isProgram();
            });

            let uid;
            if (cache[value].indexes.length === 2) {
              uid = path.scope.generateUidIdentifier("a"); // can use something else
              if (!cache[value].ref) {
                cache[value].ref = uid;
              }

              if (functionParentPath) {
                elements[cache[value].indexes[0]].replaceWith(uid);

                let declar = t.variableDeclaration("var", [
                  t.variableDeclarator(uid, t.stringLiteral(value))
                ]);
                functionParentPath.insertBefore(declar);
              }
            } else {
              uid = cache[value].ref;
            }

            if (functionParentPath) {
              elementPath.replaceWith(uid);
            }
          }
        }
      } // ArrayExpression
    }
  };
}
