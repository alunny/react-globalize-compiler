var compileDynamically = require("./src/dynamic-compiler");
var extract = require( "./src/extract" );
var generateTranslation = require("./src/generate-translation");
var initOrUpdateTranslation = require("./src/init-or-update-translation");

module.exports = {
  compileDynamically: compileDynamically,
  extract: extract,
  generateTranslation: generateTranslation,
  initOrUpdateTranslation: initOrUpdateTranslation
};
