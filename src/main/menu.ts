import { BrowserWindow, Menu } from 'electron'

export const createMenu = (win: BrowserWindow): void => {
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)
  console.log({ win })
}

export const createTray = (win: BrowserWindow): void => {
  console.log({ win })
}
