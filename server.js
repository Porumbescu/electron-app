// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.argv[2];
const targetUrl = process.argv[3];

if (!port || !targetUrl) {
  console.error('Port and target URL must be specified.');
  process.exit(1);
}

console.log(`Starting proxy server on port ${port}, targeting ${targetUrl}`);

const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxy Request to: ${targetUrl}${req.url}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
    },
  })
);

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}, proxying to ${targetUrl}`);
});
