module.exports = function(grunt) {

  "use strict";

  var pkg = require("./package.json");

  grunt.initConfig({
    pkg: pkg,
    jshint: {
      source: {
        src: ["index.js"],
      },
      grunt: {
        src: ["Gruntfile.js"],
      },
      metafiles: {
        src: ["package.json"],
      },
      options: {
        jshintrc: ".jshintrc"
      }
    },
    dco: {
      current: {
        options: {
          exceptionalAuthors: {
            "rxaviers@gmail.com": "Rafael Xavier de Souza"
          }
        }
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", [
    "jshint:metafiles",
    "jshint:grunt",
    "jshint:source",
    "dco"
 ]);

};

