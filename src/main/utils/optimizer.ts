import { BrowserWindow, Event, Input } from 'electron'
import { is } from './is'

export interface Optimizer {
  watchWindowShortcuts: (window: BrowserWindow) => void
}

export const optimizer = {
  watchWindowShortcuts(window: BrowserWindow): void {
    if (!window) {
      return
    }
    const { webContents } = window
    webContents.on('before-input-event', (event: Event, input: Input) => {
      if (input.type === 'keyDown') {
        if (!is.dev) {
          if (input.key === 'r' && (input.control || input.meta)) {
            event.preventDefault()
          }
        } else {
          if (input.code === 'F12') {
            if (webContents.isDevToolsOpened()) {
              webContents.closeDevTools()
            } else {
              webContents.openDevTools({ mode: 'undocked' })
            }
          }
        }
      }
    })
  }
}
