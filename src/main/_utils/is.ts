import { app } from 'electron'

export interface Is {
  dev: boolean
  windows: boolean
  macos: boolean
  linux: boolean
}

export const is: Is = {
  dev: !app.isPackaged,
  windows: process.platform === 'win32',
  macos: process.platform === 'darwin',
  linux: process.platform === 'linux'
}
