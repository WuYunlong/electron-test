import { ipcMain, nativeTheme } from 'electron'
import fs from 'fs'
import path from 'path'
import { extensionList } from '../extension'

export const ipcListener = () => {
  ipcMain.on('theme-load', (e, name) => {
    const list = extensionList()

    for (let k = 0; k < list.length; k++) {
      const item = list[k]
      if (item.label === name) {
        nativeTheme.themeSource = item.uiTheme

        const str = fs.readFileSync(path.resolve(item.baseDir, item.path)).toString()
        const json = JSON.parse(str)
        const keys = Object.keys(json)

        let theme = `:root {\n`
        keys.forEach((key) => {
          theme += `  --var-${key.split('.').join('-')}: ${json[key]};\n`
        })
        theme += '}'

        e.sender.send('theme-load', theme)
        break
      }
    }
  })
}
