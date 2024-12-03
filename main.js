// main.js
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let views = [];
let servers = [];
let portCounter = 3000;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'dist', 'electron-app', 'index.html'));

  mainWindow.on('resize', () => {
    updateBrowserViewsBounds();
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  // Terminate all server processes
  servers.forEach(({ port, process }) => {
    process.kill();
    console.log(`Terminated server on localhost:${port}`);
  });
  app.quit();
});

function startServer(port, targetUrl) {
  const serverPath = path.join(__dirname, 'server.js');

  console.log(`Starting server process for ${targetUrl} on port ${port}`);

  const serverProcess = spawn('node', [serverPath, port, targetUrl]);

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server ${port} stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server ${port} stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server ${port} exited with code ${code}`);
  });

  return serverProcess;
}

ipcMain.on('create-webview', async (event, url) => {
  try {
    if (!url) {
      throw new Error('URL is undefined or empty.');
    }

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    console.log(`Creating webview for URL: ${url}`);

    const port = portCounter++;

    const serverProcess = startServer(port, url);
    servers.push({ port, process: serverProcess });

    const view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
      },
    });

    // Load the URL pointing to the new server instance
    const localUrl = `http://localhost:${port}`;
    console.log(`Loading URL in BrowserView: ${localUrl}`);
    view.webContents.loadURL(localUrl);

    views.push(view);
    mainWindow.addBrowserView(view);

    updateBrowserViewsBounds();

    console.log(`Created webview on localhost:${port} proxying to ${url}`);
    event.reply('webview-created', { success: true, index: views.length - 1, port: port });
  } catch (error) {
    console.error('Error in create-webview IPC handler:', error);
    event.reply('webview-created', { success: false, error: error.message });
  }
});

ipcMain.on('remove-webview', (event, index) => {
  const view = views[index];
  const serverInfo = servers[index];

  if (view) {
    mainWindow.removeBrowserView(view);
    views.splice(index, 1);

    if (serverInfo && serverInfo.process) {
      serverInfo.process.kill();
      console.log(`Terminated server on localhost:${serverInfo.port}`);
      servers.splice(index, 1);
    }

    updateBrowserViewsBounds();

    event.reply('webview-removed', { success: true });
  } else {
    event.reply('webview-removed', { success: false });
  }
});


function updateBrowserViewsBounds() {
  const controlPanelWidth = 300;
  const windowBounds = mainWindow.getBounds();
  const viewWidth = windowBounds.width - controlPanelWidth;
  const viewHeight = windowBounds.height;
  const individualViewWidth = viewWidth / views.length;

  views.forEach((view, index) => {
    const x = controlPanelWidth + index * individualViewWidth;
    view.setBounds({ x, y: 0, width: individualViewWidth, height: viewHeight });
  });
}
