# Book Babysitters

<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

<p align="center">
   <a href="">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.
> MERN stack is the idea of using Javascript/Node for fullstack web development.

## Clone or download

```terminal
$ git clone https://github.com/Chintu-Singh/Book-Babysitters.git
$ npm i
```

## Project structure

```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Setup

First ENV file setup

```terminal
Create a file and name it as .env  inside root directory i.e. Babysitters folder itself
And then add the following details:
MONGODB_URL=YOUR_MONGO_URI
JWT_SECRET=yoursecretvalue
CLOUDINARY_URL=
MAILTRAP_USERNAME=example@gmail.com
MAILTRAP_PASSWORD=abc123
SENDGRID_API_KEY=
FROM_EMAIL=abc@gmail.com
REACT_APP_MAPBOX_ACCESS_TOKEN=
NODE_ENV=development
```

```terminal
$ cd Book-Babysitters       // go to Book-Babysitters folder
$ cd server         // go to server in one terminal
$ npm i    // npm install packages
$ npm start       // run it locally
// Open another terminal
$ cd Book-Babysitters       // go to Book-Babysitters folder
$ cd client         // go to client in another terminal
$ npm i    // npm install packages
$ npm start       // run it locally
```

# Dependencies(tech-stacks)

| Client-side                   | Server-side           |
| ----------------------------- | --------------------- |
| axios: ^0.15.3                | bcrypt-nodejs: ^0.0.3 |
| babel-preset-stage-1: ^6.1.18 | body-parser: ^1.15.2  |
| lodash: ^3.10.1               | react-redux: ^4.0.0   |
| react: ^18.3.1                | dotenv: ^2.0.0        |
| react-dom: ^18.3.1            | express: ^4.14.0      |
| react-router-dom: ^6.26.2     | mongoose: ^4.7.4      |
| redux: ^3.7.2                 | morgan: ^1.7.0        |
