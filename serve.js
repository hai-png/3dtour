#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
    '.hdr': 'application/octet-stream',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Handle query strings
    filePath = filePath.split('?')[0];
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found: ' + req.url);
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            // Add CORS headers for local development
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║     3D Tour Server Running!              ║');
    console.log('╚════════════════════════════════════════════╝\n');
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`📁 Directory: ${BASE_DIR}\n`);
    
    // Try to open browser
    const openBrowser = () => {
        const platform = process.platform;
        let cmd;
        
        if (platform === 'win32') {
            cmd = `start http://localhost:${PORT}`;
        } else if (platform === 'darwin') {
            cmd = `open http://localhost:${PORT}`;
        } else {
            cmd = `xdg-open http://localhost:${PORT}`;
        }
        
        exec(cmd, (err) => {
            if (err) {
                console.log('🌐 Open your browser and navigate to: http://localhost:' + PORT);
            } else {
                console.log('🌐 Browser opened automatically!');
            }
        });
    };
    
    setTimeout(openBrowser, 500);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use.`);
        console.error('Try: lsof -ti:' + PORT + ' | xargs kill -9\n');
    } else {
        console.error('\n❌ Server error:', err);
    }
    process.exit(1);
});
