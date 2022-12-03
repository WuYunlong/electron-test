export const theme = (name: string) => {
  const { electron } = window
  electron.ipcRenderer.once('theme-load', (_, data: string) => {
    const s = document.getElementById('theme-style')
    if (s) {
      s.parentNode?.removeChild(s)
    }

    const style = document.createElement('style')
    style.setAttribute('id', 'theme-style')
    style.textContent = data
    document.head.appendChild(style)
  })

  electron.ipcRenderer.send('theme-load', name)
}
