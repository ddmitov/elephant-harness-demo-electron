'use strict';

// Demo application for the elephant-harness NPM package based on Electron

const ELEPHANT_HARNESS = require('elephant-harness');

let os = require('os');
let platform = os.platform();

let path;
if (platform !== 'win32') {
  path = require('path').posix;
} else {
  path = require('path').win32;
}

function startTestScript() {
  let testScriptFullPath =
      path.join(__dirname, 'php', 'phpinfo.php');

  let testScriptOutput = '';

  let testScriptObject = {};
  testScriptObject.interpreter = 'php-cgi';
  testScriptObject.scriptFullPath = testScriptFullPath;

  let interpreterSwitches = [];
  interpreterSwitches.push('-q');
  testScriptObject.interpreterSwitches = interpreterSwitches;

  testScriptObject.stdoutFunction = function(stdout) {
    testScriptOutput = testScriptOutput + stdout;
  };

  testScriptObject.errorFunction = function(error) {
    if (error && error.code === 'ENOENT') {
      let html = document.documentElement;
      html.innerHTML =
        '<h1><center>PHP interpreter was not found.</center></h1>';
    }
  };

  testScriptObject.exitFunction = function(exitCode) {
    if (exitCode === 0) {
      let html = document.documentElement;
      html.innerHTML = testScriptOutput;
    }
  };

  ELEPHANT_HARNESS.startScript(testScriptObject);
}
