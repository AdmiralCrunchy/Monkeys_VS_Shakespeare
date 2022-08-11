# Monkeys_VS_Shakespeare

- Deployed URL: https://monkeys-vs-shakespeare.herokuapp.com/
- Repo URL: https://github.com/AdmiralCrunchy/Monkeys_VS_Shakespeare

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [APIs](#APIs)
- [Usage](#usage)
- [Bugs](#bugs)
- [Screenshots](#screenshots)
- [Credits](#credits)

## Description

This applicaton was a collaborative effort between four students from the University of Washington's Continuing and Professional Education Fullstack Bootcamp program. Contributors were Austin Gentz, Aelin Rose, Matthew Hoefer and Vincent Tate.

- Monkeys vs. Shakespeare is a typing game that pits users (monkeys) agains Authors. By quickly and correctly typing the literary works of the opposing author the user can bring truth to phrase "An infinite amount of monkeys on an infinite amount of typewriters can produce the works of Shakespeare"
- The development team has incorporated their love of literature, word puzzles, and old school rpg combat.
- Users have the option of making tactile descisions when typing and future implementations of the application seek to add live chat and multiplayer. 
- This application is a functioning full stack application that incorpartes MVC organizational concepts. In addition a plethora of widgits have been utilized to create a fully functioning user data base.

## Installation

- Developers working in on a local server should start by initializing npm via the npm init command. Additioanlly runing npm i is essential to installing the number of npm dependencies. 
- To create a data base make sure that mysql is installed and run the command source db/schema.sql . A table will be created. To run the seed file in the CLI enter npm run seed.
- A .env file will need to be created with four categories: DB_NAME, DB_USER, DB_PASSWORD, and SESSION_SECRET. 
- Be sure to have nodemon installed globally so dynamic changes cand be implemented.
- Port location defaults to localhost3000:.
- 

## APIs

- Several server-side APIs were used in the creation of this webpage. Those include:

- Users, Monkeys, Enemys, Books, Sections, and Jobs.
- This will be seeded with initial values and objects.
- User database can be expanded with user sign ups. 

## Usage

- Users will start on the landing page with the options to login or sign up a new account.
- At the completion of either of these options the user will land on the chat page. 
- Users have the option to send messages or join a game.

## Game

- In game users starts by creating a team of monkeys from data based and selecting the author whose works will be typed.
- In game users are timed as they type out the works of literary giants such as Oscar Wilde.
- Accuracy and speed are key.
- Users have four options during combat ATTACK DEFEND HEAL and SPECIAL.
- Upon user death or vicotry users are returned to the chatroom. 

## Bugs

- While there are no known "bugs" afflicting the page, the socket.io connection has yet to be implemented. Users should know:
- Chat implementation with socket.io is pending.
- In the current game state there is no multiplayer.
- Currently users are not able to create chatrooms.

## Screenshots

- ![Alt= Monkeys vs Shakespeare landing page](public\images\screenshots\screenshot1.PNG)
- ![Alt= Sign up Modal](public\images\screenshots\screenshot2.PNG)
- ![Alt= Chat page](public\images\screenshots\screenshot3.PNG)
- ![Alt= Game in progress](public\images\screenshots\screenshot4.PNG)


## Credits

- The creation of this website would not have been possible without the hard work of the developers and the educators that support them in UW Fullstack's Coding Bootcamp Program.
