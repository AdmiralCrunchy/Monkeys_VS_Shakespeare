
//importing the client side socketIo

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";


const socket = io();


// FOR CHAT

const chatForm = document.getElementById('chat-form')

// FOR GAME
const startButton = document.getElementById('start-button')

// FOR LOGIN
//MATCHES index.html Ids
const emailLogin = document.getElementById('email-login')
const passwordLogin = document.getElementById('password-login')
const loginButton = document.getElementById('login-button')


//FOR SIGN-UP

const newUserNameForm = document.getElementById('new-username-form')
const newEmailForm = document.getElementById('new-email-form')
const newPassWordForm = document.getElementById('new-password-form')
const newUserSubmit = document.getElementById('new-user-submit')

