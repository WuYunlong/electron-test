import { app } from 'electron'
import { is } from './is'

export interface ElectronApp {
  setAppUserModelId: (id: string) => void
  setAutoLaunch: (auto: boolean) => boolean
}

export const electronApp: ElectronApp = {
  setAppUserModelId(id: string) {
    if (is.windows) {
      app.setAppUserModelId(is.dev ? process.execPath : id)
    }
  },
  setAutoLaunch(auto: boolean): boolean {
    if (is.linux) {
      return false
    }
    const isOpenAtLogin = (): boolean => {
      return app.getLoginItemSettings().openAtLogin
    }

    if (isOpenAtLogin() !== auto) {
      app.setLoginItemSettings({
        openAtLogin: auto,
        path: process.execPath
      })

      return isOpenAtLogin() === auto
    }

    return true
  }
}
