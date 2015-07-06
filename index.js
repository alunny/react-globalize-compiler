var compileDynamically = require("./src/dynamic-compiler");
var extract = require( "./src/extract" );
var extractDefaultMessages = require( "./src/extract-default-messages" );
var generateTranslation = require("./src/generate-translation");
var initOrUpdateTranslation = require("./src/init-or-update-translation");

module.exports = {
  compileDynamically: compileDynamically,
  extract: extract,
  extractDefaultMessages: extractDefaultMessages,
  generateTranslation: generateTranslation,
  initOrUpdateTranslation: initOrUpdateTranslation
};
