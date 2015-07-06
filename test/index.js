var babel = require("babel");
var fs = require("fs");
var esprima = require("esprima");
var expect = require("chai").expect;
var reactGlobalizeCompiler = require("../index");

var fixtures = {
  babel: esprima.parse(babel.transform(fs.readFileSync(__dirname + "/fixtures/es6.jsx")).code)//,
  //basic: esprima.parse(fs.readFileSync(__dirname + "/fixtures/basic.jsx"))
};

describe("Extract Default Messages - ES6 code - uses babel for ES5 transform", function() {
  it("must be included", function() {
    var defaultMessages = reactGlobalizeCompiler.extractDefaultMessages(fixtures.babel);
    expect(defaultMessages).to.be.an("object");
    expect(defaultMessages).to.include.keys(
      "Standalone Number",
      "For more information, see the [yarsk]YARSK Readme[|yarsk], [reactGlobalize]React Globalize Readme[|reactGlobalize], and [globalize]Globalize Readme[|globalize]."
    );
    expect(defaultMessages["For more information, see the [yarsk]YARSK Readme[|yarsk], [reactGlobalize]React Globalize Readme[|reactGlobalize], and [globalize]Globalize Readme[|globalize]."]).to.equal("For more information, see the [yarsk]YARSK Readme[/yarsk], [reactGlobalize]React Globalize Readme[/reactGlobalize], and [globalize]Globalize Readme[/globalize].");
  });

});
