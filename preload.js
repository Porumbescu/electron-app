// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createWebView: (url) => ipcRenderer.send('create-webview', url),
  removeWebView: (index) => ipcRenderer.send('remove-webview', index),
  onWebViewCreated: (callback) => ipcRenderer.on('webview-created', callback),
  onWebViewRemoved: (callback) => ipcRenderer.on('webview-removed', callback),
});
