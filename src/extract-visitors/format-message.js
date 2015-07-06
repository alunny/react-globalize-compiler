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
      Array.isArray(node.arguments) && node.arguments.length >= 3 &&
      node.arguments[0].type === Syntax.MemberExpression &&
      node.arguments[0].object.type === Syntax.Identifier &&
      node.arguments[0].object.name === "ReactGlobalize" &&
      node.arguments[0].property.type === Syntax.Identifier &&
      node.arguments[0].property.name === "FormatMessage";
  },

  getFormatter: function(node) {
    /*jslint evil: true */
    var path, scope;

    function getKey(name) {
      return node.arguments[1].properties.filter(function(node) {
        return node.key.name === name;
      })[0];
    }

    function sanitizePath(pathString) {
      return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
    }

    path = eval("(" + escodegen.generate(getKey("path")) + ")");
    path = sanitizePath(path);

    if (scope = getKey("scope")) {
      scope = eval("(" + escodegen.generate(scope) + ")");
      path = [scope, path].join("/");
    }

    return "Globalize.messageFormatter(" + JSON.stringify(path) + ")";
  }
};
