//Creating server, with video from week 40

const express = require('express'); // Henter hele pakken express
const fs = require('fs');
const bodyParser =require('body-parser');


const server = express();// definere at serveren er en express server - og har nu mulighed for at bruge alle de funktioner der er i.
const PORT = 4000; // definere port nr.

// 1. initialize body parser middleware
server.use(bodyParser.json()); // state that we use json data in the application

// To get static files, use the express.static middleware from express module

//function signature:
express.static('/view'); // THis is a root argument, specifies which root directory to serve static assets
//Vi kan kalde app og har mulighed for at skrive GET HTTP verb, og definere denne path som den skal reagere på


//makes it possible to go to all static sides in my folder view
server.use(express.static('view')); //https://expressjs.com/en/starter/static-files.html

// endpoint er her: /, and when put under the domain - its : HTTP://localhost:4000
server.get('/', function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
     
     fs.readFile(__dirname + '/view/frontPage.html', 'utf8', function(err, text){
          res.send(text);
      });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
});   

                          

//----------------JSON files------------------------
// server.post("/", (req,res) => {
//      let student = { 
//      firstName: req.body.firstName,
//      lastname: req.body.lastname,
//     description: req.body.lastname,
//      password: req.body.password
     
//    };

//    let dataarray = JSON.parse(fs.readFileSync('/model/user.JSON'))
// dataarray.push(student);

// fs.writeFile('user.json', JSON.stringify(dataarray, null, 4), (err) => {
//      if (err) throw err;
//      console.log('Data written to file');
//  });
// });

server.listen(PORT, ()=> console.log(`The server runs on port: http://localhost:${PORT}`)); // server bliver defineret, her og bliver bedt om at lytte til port 3000


// the endpoint generally is what is supposed to be called by a request, what you provide as an interface to your API consumers

//REST API uses four different HTTP 1.1 verbs (GET, POST, PUT, and DELETE) to perform tasks.

