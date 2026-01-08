const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

// Online users ka data store karne ke liye
let users = {};

io.on('connection', (socket) => {
    // Jab koi naya user login kare
    socket.on('login', (userData) => {
        users[socket.id] = {
            username: userData.username,
            avatar: userData.avatar
        };
        // Sabko nayi user list bhejo
        io.emit('updateUserList', Object.values(users));
        console.log(userData.username + " joined the lobby");
    });

    // Message bhejne ka logic
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            user: users[socket.id] ? users[socket.id].username : 'Unknown',
            msg: data.msg,
            avatar: users[socket.id] ? users[socket.id].avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        });
    });

    socket.on('disconnect', () => {
        if (users[socket.id]) {
            console.log(users[socket.id].username + " left");
            delete users[socket.id];
            io.emit('updateUserList', Object.values(users));
        }
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
