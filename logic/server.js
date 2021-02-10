//Creating server / rest API, with video from week 40
//REST API uses four different HTTP 1.1 verbs (GET, POST, PUT, and DELETE) to perform tasks.

// 01. Connections
const express = require('express'); // Henter hele pakken express
const fs = require('fs');
const bodyParser = require('body-parser');
const controller = require('./user');
const cors = require('cors')

// 02. About the server
const server = express();// definere at serveren er en express server - og har nu mulighed for at bruge alle de funktioner der er i.
const PORT = 4000; // definere port nr.

// 03. initialize body parser middleware
server.use(bodyParser.json()); // state that we use json data in the application
     // To get static files, use the express.static middleware from express module
// express.static('/client'); // THis is a root argument, specifies which root directory to serve static assets
     // makes it possible to go to all static sides in my folder view
server.use(express.static('../client')); //https://expressjs.com/en/starter/static-files.html


// 04. Creating the endpoints
     // Vi kan kalde server og har mulighed for at skrive GET HTTP verb, og definere denne path som den skal reagere på
     // endpoint er her: /, and when put under the domain - its : HTTP://localhost:4000
     // the endpoint generally is what is supposed to be called by a request, what you provide as an interface to your API consumers
server.get('/', controller.frontpage);

server.get('/createUser', controller.createUser); //hente siden createuser
server.get('/profile', controller.account); //henter profil siden
server.get('/Login', controller.login); //henter login siden
server.get('/edit', controller.editprofile); // henter ændre bruger siden

//server.post('/Login', controller.findUser);




// 05. Changes to user
server.get('/Login/:mail', cors(), controller.findUser); // get fordu vi ønsker at hente bruger oplysninger fra "db"
// server.post('/Login/:mail', cors(), controller.findUser); // post fordi vi ønsker at sende disse oplysninger til profil siden.

server.post('/createUser/:mail', cors(), controller.saveInput);// post fordi vi ønsker at sende bruger oplysninger til "db"

server.delete('/profile/:mail', cors(), controller.deleteUser); // Sletter bruger oplsyninger fra "db"

server.patch('/edit/:mail', cors(), controller.editUser); //Opdatere bruger oplysninger fra "db"

server.get('/profile/:mail', cors(), controller.displayUsers);



//---------------- Running server--------------------//
server.listen(PORT, ()=> console.log(`The server runs on port: http://localhost:${PORT}`)); // server bliver defineret, her og bliver bedt om at lytte til port 3000





