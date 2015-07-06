var escodegen = require("escodegen");
var esprima = require("esprima");

var Syntax = esprima.Syntax;

module.exports = {
  test: function(node) {
    return node.type === Syntax.CallExpression &&
      node.callee.type === Syntax.MemberExpression &&
      node.callee.object.type === Syntax.MemberExpression &&
      node.callee.object.object.type === Syntax.Identifier &&
      node.callee.object.object.name === "React" &&
      node.callee.object.property.type === Syntax.Identifier &&
      node.callee.object.property.name === "createElement" &&
      Array.isArray(node.arguments) && node.arguments.length >= 1 &&
      node.arguments[0].type === Syntax.MemberExpression &&
      node.arguments[0].object.type === Syntax.Identifier &&
      node.arguments[0].object.name === "ReactGlobalize" &&
      node.arguments[0].property.type === Syntax.Identifier &&
      node.arguments[0].property.name === "FormatNumber";
  },

  getFormatter: function(node) {
    var options = node.arguments[1].properties.filter(function(node) {
        return node.key.name === "options";
      })[0];

    return "Globalize.numberFormatter(" +
      (options ? escodegen.generate(options) : "") +
      ")";
  }
};
