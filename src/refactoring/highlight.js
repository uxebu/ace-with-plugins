var CursorPosition = require('../util/cursor-position');
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
      var absoluteStartPosition = CursorPosition.toRowColumn(references[i].range[0], sourceCode);
      var absoluteEndPosition = CursorPosition.toRowColumn(references[i].range[1], sourceCode);

      occurences.push({
        startOfRange: absoluteStartPosition,
        endOfRange: absoluteEndPosition
      });
    }
    return occurences;
  }
}

module.exports = highlight;
