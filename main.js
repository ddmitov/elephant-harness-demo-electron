'use strict';

const ELECTRON = require('electron');

// Module to control application life.
const APPLICATION = ELECTRON.app;

// Module to create native browser window.
const BROWSER_WINDOW = ELECTRON.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Set the icon path:
  let iconFullPath = __dirname + '/elephant.png';

  // Create the browser window:
  mainWindow = new BROWSER_WINDOW({icon: iconFullPath});

  // Maximize the browser window:
  mainWindow.maximize();

  // Load the index.html of the app:
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools:
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
APPLICATION.on('ready', createWindow);

// Quit when all windows are closed.
APPLICATION.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    APPLICATION.quit();
  }
});

APPLICATION.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
