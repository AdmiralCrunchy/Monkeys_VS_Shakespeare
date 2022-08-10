const express = require('express');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const { User, Book, Job, Section, Monkey, Enemy } = require('./models')


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
// const io = socketio(server);
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const sess = {
// 	secret: process.env.SESSION_SECRET,
// 	cookie: {
// 		maxAge: 1000 * 60 * 60 * 2,
// 	},
// 	resave: false,
// 	saveUninitialized: true,
// 	store: new SequelizeStore({
// 		db: sequelize,
// 	}),
// };

// // SOCKET.IO
// // Run when client connects
// io.on('connection', (socket) => {
// 	console.log(io.of('/').adapter);
// 	socket.on('joinRoom', ({ username, room }) => {
// 		const user = userJoin(socket.id, username, room);

// 		socket.join(user.room);

// 		// Welcome current user
// 		socket.emit(
// 			'message',
// 			formatMessage(botName, 'Welcome to Monkeys vs. Shakespeare!')
// 		);

// 		// Broadcast when a user connects
// 		socket.broadcast
// 			.to(user.room)
// 			.emit(
// 				'message',
// 				formatMessage(botName, `${user.username} has joined the chat`)
// 			);

// 		// Send users and room info
// 		io.to(user.room).emit('roomUsers', {
// 			room: user.room,
// 			users: getRoomUsers(user.room),
// 		});
// 	});

// 	// Listen for chatMessage
// 	socket.on('chatMessage', (msg) => {
// 		const user = getCurrentUser(socket.id);

// 		io.to(user.room).emit('message', formatMessage(user.username, msg));
// 	});

// 	// Runs when client disconnects
// 	socket.on('disconnect', () => {
// 		const user = userLeave(socket.id);

// 		if (user) {
// 			io.to(user.room).emit(
// 				'message',
// 				formatMessage(botName, `${user.username} has left the chat`)
// 			);

// 			// Send users and room info
// 			io.to(user.room).emit('roomUsers', {
// 				room: user.room,
// 				users: getRoomUsers(user.room),
// 			});
// 		}
// 	});
// });

// app.use(session(sess));

// Static directory
app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', allRoutes);

sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});
