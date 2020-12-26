const { BrowserWindow } = require("electron");
const path = require('path');


const { app, BorwserWindow } = require('electron');


app.on('window-all-closed', () => {
  app.quit();
})

function createWindow () {
    // Create the browser window
    const mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      }
    })
    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow)
