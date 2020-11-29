//Creating server, with video from week 40
const express = require('express'); // Henter hele pakken express
const server = express();// definere at appen er en express app - og har nu mulighed for at bruge alle de funktioner der er i.
const fs = require('fs');


// To get static files, use the express.static middleware from express module

//function signature:
express.static('view'); // THis is a root argument, specifies which root directory to serve static assets
//Vi kan kalde app og har mulighed for at skrive GET HTTP verb, og definere denne path som den skal reagere på


//serve images, css, js, html in a directory named public
server.use(express.static('view'));

// endpoint er her: /index.html, and when put under the domain - its : HTTP://localhost:3000/index
server.get('/view', function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
     console.log('Server virker nu'); // simpelt end point og simpelt api
});                                 // hver gang der kommer en get request, sender vi hello word ud til browseren, som er en en streng.


server.listen(5000); // server bliver defineret, her og bliver bedt om at lytte til port 3000


// the endpoint generally is what is supposed to be called by a request, what you provide as an interface to your API consumers

//REST API uses four different HTTP 1.1 verbs (GET, POST, PUT, and DELETE) to perform tasks.