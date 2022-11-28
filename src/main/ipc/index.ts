import { ipcMain } from 'electron'

ipcMain.on('theme-load', () => {
  console.log(`theme load ....`)
})
