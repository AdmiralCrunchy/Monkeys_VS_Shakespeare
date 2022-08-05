const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector(".chat-messages")
const roomName = document.getElementById("room-name")
const userList = document.getElementById("users")
// Get UserName and room from url

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})



const socket = io();

// JOin Chat room
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
})

socket.on('message', message => {
  outputMessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Message Submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Getting message text
  const msg = e.target.elements.msg.value


  //  Emits message to the server.
  socket.emit('chatMessage', msg);

  // Clears INPUT
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

})


// Output message to DOMM

function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message');
  div.innerHTML = ` <p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text"> ${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// add room name to dom 
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}
