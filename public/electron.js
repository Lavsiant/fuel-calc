const electron = require('electron');
const app = electron.app;
const { ipcMain } = electron;
const { autoUpdater } = require('electron-updater');
const globalShortcut = electron.globalShortcut;
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
      width: 320,
      height: 500,
      resizable: isDev,
      titleBarStyle: 'hiddenInset', frame: false,
      titleBarStyle: 'hidden',
      skipTaskbar: true,
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
  mainWindow.on('close', (event) => {
    if (app.quitting) {
      mainWindow = null
    } else {
      event.preventDefault()
      mainWindow.hide()
    }
  })
}

function togleWindow() {
  if (mainWindow.isVisible()) {    
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
}

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();

  const ret = globalShortcut.register('CommandOrControl+A+D', () => {    
    togleWindow();
  })

  if (!ret) {
    console.log('Register error')
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    globalShortcut.unregisterAll()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => app.quitting = true)


// updater
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