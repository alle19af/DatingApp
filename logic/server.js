//Creating server / rest API, with video from week 40
//REST API uses four different HTTP 1.1 verbs (GET, POST, PUT, and DELETE) to perform tasks.

// 01. Definere middleware og paths
const express = require('express'); // Henter hele pakken express
const fs = require('fs');
const bodyParser = require('body-parser');
const controller = require('./user');
const cors = require('cors')

// 02. Info om server
const server = express();// definere at serveren er en express server - og har nu mulighed for at bruge alle de funktioner der er i.
const PORT = 4000; // definere port nr.

// 03. starter body parser middleware
server.use(bodyParser.json()); // Vi bruger json data i denne applikation
     // Giver adgang til alle statiske sider under "root" mappen klient, benytter middleware fra express module
server.use(express.static('../client')); 


// 04. Opretter endpoints / paths
     // Vi kan kalde server og har mulighed for at skrive GET (HTTP verb), og definere denne path som den skal reagere på
     // endpoint er her: /vælgselv, og under et domæne - ser det sådan ud : HTTP://localhost:4000/vælgselv
     // the endpoint generally is what is supposed to be called by a request, what you provide as an interface to your API consumers
server.get('/', controller.frontpage); // henter forsiden
server.get('/createUser', controller.createUser); //hente siden createuser
server.get('/profile', controller.account); //henter profil siden
server.get('/Login', controller.login); //henter login siden
server.get('/edit', controller.editprofile); // henter ændre bruger siden


// 05. Ædringer ved hjælp HTTP requests POST, PATCH, GET , DELETE 
server.get('/Login/:mail', cors(), controller.findUser); // get fordu vi ønsker at hente bruger oplysninger fra "db"

server.post('/createUser/:mail', cors(), controller.saveInput);// post fordi vi ønsker at sende bruger oplysninger til "db"

server.patch('/profile/:mail', cors(), controller.editUser); //Opdatere bruger oplysninger fra "db"
server.delete('/profile/:mail', cors(), controller.deleteUser); // Sletter bruger oplsyninger fra "db"
server.get('/profile/:mail', cors(), controller.displayUsers); // Henter brugerne fra DB og sender dem til Clientside

server.patch('/edit/:mail', cors(), controller.editUser); //Opdatere bruger oplysninger fra "db"



//---------------- Running server--------------------//
server.listen(PORT, ()=> console.log(`The server runs on port: http://localhost:${PORT}`)); // server bliver defineret, her og bliver bedt om at lytte til port 3000





