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
    const messages = document.getElementById('messages');
    const isMe = data.user === myData.username;
    
    // Naya message aane par sound bajao (agar message mera nahi hai toh)
    if (!isMe) {
        document.getElementById('notif-sound').play();
    });

    const div = document.createElement('div');
    div.className = `msg-row ${isMe ? 'sent' : 'received'}`;
    div.innerHTML = `<div class="msg-bubble"><b>${isMe ? 'You' : data.user}:</b><br>${data.msg}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUserList', Object.values(users));
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => { console.log('Server Live!'); });

