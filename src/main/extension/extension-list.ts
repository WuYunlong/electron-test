import glob from 'glob'
import { extensionDir } from './extension-dir'
import fs from 'fs'

interface Theme {
  label: string
  uiTheme: 'dark' | 'light'
  path: string
  baseDir: string
}

export const extensionList = () => {
  const dir = extensionDir()
  const files = glob.sync(`${dir}/**/package.json`)

  const themes: Theme[] = []

  files.forEach((file) => {
    const baseDir = file.replace('package.json', '')
    const json = JSON.parse(fs.readFileSync(file).toString())
    const contributes = json.contributes || {}

    if (contributes.themes) {
      if (Array.isArray(contributes.themes)) {
        contributes.themes.forEach((theme: Theme) => {
          theme.baseDir = baseDir
          themes.push(theme)
        })
      } else {
        contributes.themes.baseDir = baseDir
        themes.push(contributes.themes as Theme)
      }
    }
  })

  return themes
}
