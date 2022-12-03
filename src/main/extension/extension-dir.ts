import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export const extensionDir = () => {
  const appDir = path.resolve(app.getPath('home'), '.app')
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir)
  }

  const extensionDir = path.resolve(appDir, 'extension')
  if (!fs.existsSync(extensionDir)) {
    fs.mkdirSync(extensionDir)
  }

  return extensionDir
}
