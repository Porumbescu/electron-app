// src/app/app.component.ts

import { Component, NgZone } from '@angular/core';
import { ElectronService } from './electron.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AppComponent {
  views: { index: number; port: number }[] = [];
  webViewUrl: string = '';

  constructor(
    private electronService: ElectronService,
    private zone: NgZone
  ) {
    this.electronService.onWebViewCreated((event: any, arg: any) => {
      if (arg.success) {
        this.zone.run(() => {
          this.views.push({ index: arg.index, port: arg.port });
        });
        console.log(`WebView created on localhost:${arg.port}`);
      } else {
        console.error('Failed to create WebView:', arg.error);
      }
    });

    this.electronService.onWebViewRemoved((event: any, arg: any) => {
      if (arg.success) {
        this.zone.run(() => {
          const removedIndex = arg.index;
          this.views = this.views.filter((view) => view.index !== removedIndex);
        });
        console.log('WebView removed successfully.');
      } else {
        console.error('Failed to remove WebView');
      }
    });

  }

  createWebView() {
    const url = this.webViewUrl.trim();
    if (url) {
      console.log(`Requesting to create webview for URL: ${url}`);
      this.electronService.createWebView(url);
      this.webViewUrl = ''; // Clear the input field after creating the webview
    } else {
      console.log('Please enter a valid URL.');
    }
  }

  removeWebView(index: number) {
    this.electronService.removeWebView(index);
    this.views = this.views.filter((view) => view.index !== index);
  }
}
