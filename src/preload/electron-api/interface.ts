export interface IpcRendererEvent extends Event {
  sender: IpcRenderer
  senderId: number
}

export type Listener = (event: IpcRendererEvent, ...args: any[]) => void

export interface IpcRenderer {
  on(channel: string, listener: Listener): this
  once(channel: string, listener: Listener): this
  removeAllListeners(channel: string): this
  removeListener(channel: string, listener: (...args: any[]) => void): this
  send(channel: string, ...args: any[]): void
  invoke(channel: string, ...args: any[]): Promise<any>
  postMessage(channel: string, message: any, transfer?: MessagePort[]): void
  sendSync(channel: string, ...args: any[]): any
  sendTo(webContentsId: number, channel: string, ...args: any[]): void
  sendToHost(channel: string, ...args: any[]): void
}

export interface WebFrame {
  insertCSS(css: string): string
  setZoomFactor(factor: number): void
  setZoomLevel(level: number): void
}

export interface NodeProcess {
  readonly platform: string
  readonly versions: {
    [key: string]: string | undefined
  }
  readonly env: {
    [key: string]: string | undefined
  }
}

export interface ElectronApi {
  ipcRenderer: IpcRenderer
  webFrame: WebFrame
  process: NodeProcess
}
