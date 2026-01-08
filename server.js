const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

let users = {};

io.on('connection', (socket) => {
    socket.on('login', (userData) => {
        users[socket.id] = { username: userData.username, avatar: userData.avatar };
        io.emit('updateUserList', Object.values(users));
    });

    socket.on('chat message', (data) => {
        if (users[socket.id]) {
            io.emit('chat message', { user: users[socket.id].username, msg: data.msg, avatar: users[socket.id].avatar });
        }
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUserList', Object.values(users));
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => { console.log('Server Live!'); });
