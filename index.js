'use strict';

// Demo application for the elephant-harness NPM package based on Electron

const elephantHarness = require('elephant-harness');

var os = require('os');
var platform = os.platform();

var path;
if (platform !== 'win32') {
  path = require('path').posix;
} else {
  path = require('path').win32;
}

function startTestScript() {
  var testScriptFullPath =
      path.join(__dirname, 'php', 'phpinfo.php');

  var testScriptOutput = '';

  var testScriptObject = {};
  testScriptObject.interpreter = 'php-cgi';
  testScriptObject.scriptFullPath = testScriptFullPath;

  var interpreterSwitches = [];
  interpreterSwitches.push('-q');
  testScriptObject.interpreterSwitches = interpreterSwitches;

  testScriptObject.stdoutFunction = function(stdout) {
    testScriptOutput = testScriptOutput + stdout;
  };

  testScriptObject.errorFunction = function(error) {
    if (error && error.code === 'ENOENT') {
      var html = document.documentElement;
      html.innerHTML =
        '<h1><center>PHP interpreter was not found.</center></h1>';
    }
  }

  testScriptObject.exitFunction = function(exitCode) {
    if (exitCode === 0) {
      var html = document.documentElement;
      html.innerHTML = testScriptOutput;
    }
  };

  elephantHarness.startScript(testScriptObject);
}
