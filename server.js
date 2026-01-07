const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Naya user aaya: ' + socket.id);
    
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg); 
    });
});

server.listen(3000, () => {
    console.log('Server chalu hai! http://localhost:3000 par jayein');
});