var express = require('express');
var WebSocket = require('ws');
var app = express();
const port = '4000'
const server = app.listen(port, () => {
    console.log(`Websocket listening at port:${port}`)
});
const wss = new WebSocket.Server({
    server,
    path: '/ws',
});

wss.on('connection', (ws) => {
    wss.clients.forEach((client) => {
    if (client === ws  && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
        type: 'connected',
        }));
    }
    });
});
module.exports = wss;
