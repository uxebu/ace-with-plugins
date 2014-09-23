var Editor = require('../src/editor/editor');

Editor.prototype._init = function () {};
Editor.prototype.getIdentifiedReferences = function (codeAsString, position) {}


describe('mocking getIdentifiedReferences', function() {
  it('should call getIdentifiedReferences', function(){
    var editor = new Editor();

    spyOn(editor, 'getIdentifiedReferences');
    editor.getIdentifiedReferences();

    expect(editor.getIdentifiedReferences).toHaveBeenCalled();
  });
});