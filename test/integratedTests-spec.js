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
  it('should call getIdentifiedReferences with empty string', function(){
    var editor = new Editor();
    var code = ' ';
    var currentCursorPosition = 0;

    spyOn(editor, 'getIdentifiedReferences');
    editor.getIdentifiedReferences(code, currentCursorPosition);
    expect(editor.getIdentifiedReferences).toHaveBeenCalledWith(' ', 0);
  });
});