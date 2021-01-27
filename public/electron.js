const electron = require('electron');
const app = electron.app;
const { ipcMain } = electron;
const { autoUpdater } = require('electron-updater');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const log = require('electron-log');
let mainWindow;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 500,
      height: 500,
      resizable: isDev,      
      titleBarStyle: 'hiddenInset', frame: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
  // mainWindow.webContents.send('update_downloaded');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-not-available', (info) => {
  //createWindow();
})

ipcMain.on('update-download', () => {    
  autoUpdater.downloadUpdate();
});