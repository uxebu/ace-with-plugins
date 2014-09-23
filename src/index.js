var Editor = require('../src/editor/editor');
var Ace = require('../src/editor/ace');

module.exports = function(domNodeId) {
  var ace = new Ace();
  ace.setDomNodeId(domNodeId);
  return new Editor(ace);
};
