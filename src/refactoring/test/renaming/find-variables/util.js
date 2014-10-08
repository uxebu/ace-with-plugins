var RenameCandidates = require('../../../rename-candidates');

var util = {

  getPositionsOfCandidates: function(sourceCode, cursorPosition) {
    var candidates = new RenameCandidates(sourceCode, cursorPosition);
    return candidates.getAbsolutePositions();
  }

};

module.exports = util;
