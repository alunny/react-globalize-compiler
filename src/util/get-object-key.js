var esprima = require("esprima");

var Syntax = esprima.Syntax;

module.exports = function getObjectKey(object, name) {
  return object.type === Syntax.ObjectExpression &&
    object.properties.filter(function(node) {
      return node.key.name === name;
    })[0];
};
