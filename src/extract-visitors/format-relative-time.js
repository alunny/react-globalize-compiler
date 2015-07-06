var escodegen = require("escodegen");
var esprima = require("esprima");

var Syntax = esprima.Syntax;

module.exports = {
  test: function(node) {
    return node.type === Syntax.CallExpression &&
      node.callee.type === Syntax.MemberExpression &&
      node.callee.object.type === Syntax.Identifier &&
      node.callee.object.name === "React" &&
      node.callee.property.type === Syntax.Identifier &&
      node.callee.property.name === "createElement" &&
      Array.isArray(node.arguments) && node.arguments.length >= 1 &&
      node.arguments[0].type === Syntax.MemberExpression &&
      node.arguments[0].object.type === Syntax.Identifier &&
      node.arguments[0].object.name === "ReactGlobalize" &&
      node.arguments[0].property.type === Syntax.Identifier &&
      node.arguments[0].property.name === "FormatRelativeTime";
  },

  getFormatter: function(node) {
    var options;
    var args = [];

    function getKey(name) {
      return node.arguments[1] && node.arguments[1].properties.filter(function(node) {
        return node.key.name === name;
      })[0];
    }

    args.push(getKey("unit"));
    if (options = getKey("options")) {
      args.push(options);
    }

    return "Globalize.relativeTimeFormatter(" +
      args.map(function(argumentNode) {
        return escodegen.generate(argumentNode);
      }).join(", ") +
      ")";
  }
};
