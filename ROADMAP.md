# Refactoring features
- factor `X.prototype.method=...` into `X.prototype = {method:...}` style and reverse
- " to ' converter
- function Class(x, y) {} <= create property from parameter, which would create `this._x = x` 

# Code smell finder
- find comments around sections of source code and offer automatic extraction into separate methods (in the same scope)
- find duplicated code (and offer extraction into method)
- many more ...
