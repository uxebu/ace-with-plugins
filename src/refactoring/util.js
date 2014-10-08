var esrefactor = require('esrefactor');

var util = {

  getXXX: function(sourceCode, cursorPosition) {
    if (sourceCode === '') {
      return [];
    }
    var context = new esrefactor.Context(sourceCode);
    var identifier = context.identify(cursorPosition);
    if (identifier === undefined) {
      return [];
    }
    return _getAllRefsOnce(identifier);
  }

};

function _getAllRefsOnce(identifier) {
  var refs = [].concat(identifier.references);
  if (identifier.declaration) {
    var refDeclaration = identifier.declaration;
    var doesRefsContainDeclaration = refs.some(function(ref) { return ref === refDeclaration });
    if (!doesRefsContainDeclaration) {
      // Put it to the beginning of `refs`.
      refs.unshift(refDeclaration);
    }
  }
  return refs;
}


module.exports = util;
