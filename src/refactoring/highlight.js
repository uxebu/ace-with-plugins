var esrefactor = require('esrefactor');

var highlight = {
  getRangeOfOccurrence: function (sourceCode, currentCursorPosition) {
    var context = new esrefactor.Context(sourceCode);
    var identifier = context.identify(currentCursorPosition);

    if (identifier === undefined) {
      return [];
    }

    var references = identifier.references;
    var occurences = [];

    for (var i = 0; i < references.length; i++) {
      occurences.push({
        startRange: references[i].range[0],
        endOfRange: references[i].range[1]
      });
    }
    return occurences;
  }
}

module.exports = highlight;
