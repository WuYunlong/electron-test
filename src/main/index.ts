import { app, shell, BrowserWindow } from 'electron'
import path from 'path'
import { electronApp, optimizer, is } from './_utils'
import { extensionList } from './extension'
import { ipcListener } from './ipc'

if (is.dev) {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}

const createWindow = async (): Promise<void> => {
  extensionList()

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    transparent: is.macos,
    backgroundColor: is.macos ? 'rgba(0, 0, 0, 0)' : 'rgb(246, 246, 246)',
    trafficLightPosition: { x: 18, y: 18 },
    autoHideMenuBar: true,
    title: '',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    vibrancy: 'menu'
  })

  // createMenu(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  const { webContents } = mainWindow

  webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1.0)
    webContents.setVisualZoomLevelLimits(1, 1)
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  ipcListener()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
