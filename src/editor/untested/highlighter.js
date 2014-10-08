// NOTE, TRAP: This is just a nice classy-wrapper for the highlighting, all
// highlight markers are collected inside the ace.js instance
// which means even multiple instances of this class here won't have
// the effect you would expect, which would be multiple sets of highlights!

function Highlighter(editor) {
  this._editor = editor;
}
Highlighter.prototype = {

  updateRanges: function(ranges) {
    this.off(); // Remove all old ones and set the new ones.
    if (ranges.length > 0) {
      this._editor.setHighlights(ranges);
    }
  },

  off: function() {
    this._editor.removeHighlights();
  }

};

module.exports = Highlighter;
