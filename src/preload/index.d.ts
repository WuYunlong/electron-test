import { ElectronApi } from './electron-api/interface'

declare global {
  interface Window {
    electron: ElectronApi
    api: unknown
  }
}

export {}
