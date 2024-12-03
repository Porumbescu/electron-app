// src/electron-api.d.ts

export interface ElectronAPI {
  createWebView(url: string): void;
  removeWebView(index: number): void;
  onWebViewCreated(callback: (event: any, arg: any) => void): void;
  onWebViewRemoved(callback: (event: any, arg: any) => void): void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
