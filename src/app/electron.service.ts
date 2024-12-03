// src/app/electron.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  createWebView(url: string) {
    console.log(`ElectronService: createWebView called with URL: ${url}`);
    window.electronAPI.createWebView(url);
  }

  removeWebView(index: number) {
    window.electronAPI.removeWebView(index);
  }

  onWebViewCreated(callback: (event: any, arg: any) => void) {
    window.electronAPI.onWebViewCreated(callback);
  }

  onWebViewRemoved(callback: (event: any, arg: any) => void) {
    window.electronAPI.onWebViewRemoved(callback);
  }
}
