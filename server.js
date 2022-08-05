const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//SOCKETIO STUFF
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

const formatMessage = require('./z-chat/utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./z-chat/utils/users');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Static directory
app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", allRoutes);

//SOCKET IO

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

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
