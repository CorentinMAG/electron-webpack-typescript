import {app,BrowserWindow,globalShortcut} from 'electron';
import * as path from 'path';

let mainWindow : BrowserWindow;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.setTitle("Login Page");

  // and load the index.html of the app.
  mainWindow.loadFile(`${__dirname}/index.html`);
}

app.whenReady().then(createWindow)