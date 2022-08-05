const path = require('path')
const http = require('http')
const express = require("express")
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')


const app = express();
const server = http.createServer(app)
const io = socketio(server)

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))


// Chat bot

const botName = 'MonkeyBot'

// Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room)

        socket.join(user.room);

        // Welcome message
        socket.emit('message', formatMessage(botName, `Welcome to Monkeys vs Shakespere ${user.username}`))

        //Broadcase to the chosen ROOM when a USER connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined ${user.room}`));
    })

    // SEND USER ROOOM INFO
    // io.to(user.room).emit('roomUsers', {
    //     room: user.room,
    //     users: getRoomUsers(user.room)
    // })

    socket.on('chatMessage', (msg) => {

        const user = getCurrentUser(socket.id)
        console.log(user)


        io.to(user.room).emit('message', formatMessage(user.username, msg));

        console.log(msg)

    });

    socket.on('disconnect', () => {

        const user = userLeave(socket.id);
        console.log(user)

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has logged off`)
            );
            //SEND ROOM USER INFO
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getRoomUsers(user.room)
            // })
        }
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))