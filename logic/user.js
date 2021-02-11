// Controllers holds the functionality
// the actions deals with logic

// 01. Connections
const fs = require('fs');
const storage = JSON.parse(fs.readFileSync('../data/user.json'))



// 02. Paths
const frontpage = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
     fs.readFile('../client/frontPage.html', 'utf8', function(err, text){
         res.send(text);
    });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};
const createUser = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
    fs.readFile('../client/createUser.html', 'utf8', function(err, text){
        if(err){ res.send(err + "hej test af error response")} else res.send(text);
     });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};   
const account = function(req,res){
    fs.readFile('../client/profile.html', 'utf8', function(err, text){
        res.send(text);
    });
};
const login = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
    fs.readFile('../client/Login.html', 'utf8', function(err, text){
        if(err){ res.send(err)} else res.send(text);
     });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};
const editprofile = function(req,res){
    fs.readFile('../client/edituser.html', 'utf8', function(err, text){
        if(err){ res.send(err)} else res.send(text);
    });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};

// 03. Tilføjer ny bruger til databasen
const saveInput = function(req, res){
    let prop = req.params.mail; //henter mail fra bruger input
    let counter = 0; // Opretter counter til at tælle om brugen eksistere i DB
   
    // https://www.geeksforgeeks.org/javascript-check-if-a-key-exists-inside-a-json-object/
    // Looping igennem storage object, checker om brugeren eksistere
    for(var i=0; i <storage.length; i++){
        // udskriver i console de bruger vi går igennem og sammenligner med nyt brugernavn
        console.log('test if: ' + storage[i].mail + ' is = '+ prop);
        // Hvis brugernavn eksistere i DB Stop søgning
        if(storage[i].mail == prop){
            //ans = "Storage has " + prop + " as property"; 
            counter++
            break;// færdiggøre søgningen, stopper loop
        } else {
            // Hvis ikke brugeren eksistere
            ans = "Storage doesnt have " + prop + " as property"; 
        }
    }
    // Tjekker hvilket svar vi har fået således vi kan sammenligne frontend med hvad der sker backend
    console.log(ans)

    //Hvis brugeren eksistere er counter mere end 0
    if(counter  < 1){
        storage.push(req.body) // skubber brugeren ind i storage objektet
        //Skriver i filen user.json (DB) og laver vores storage om til JSON format således vi kan skrive brugeren ind der også er lavet om til JSON  
        fs.writeFile('../data/user.json', JSON.stringify(storage, null, 2), ()=> {
            res.send("It worked"); // svar tilbage til klient siden
            //console.log(prop + ' has been written to storage');
        });
    } else {res.status(500).send("User is taken")};// Svar der  sendes tilbage til klient
};

const deleteUser = function(req, res){
    
    let prop = req.body.mail;
    console.log(prop)
    
    // https://www.geeksforgeeks.org/javascript-check-if-a-key-exists-inside-a-json-object/
    // Looping through our storage object, checking if User input already exist.
   
    console.log('vi tester delete')
    
    for( var i = 0; i < storage.length; i++){ 
         if (storage[i].mail == prop) { 
             console.log(storage[i].mail)
        
       
          console.log("user that we delete is: " + storage[i].mail)
          storage.splice(i,1);

           //laver vores storage object til  string og indsætter i JSON   
        fs.writeFileSync('../data/user.json', JSON.stringify(storage, null, 2), (err) => {
            if (err) throw err;
            
        })
        } 
    }

};

const findUser = function(req, res){
    const prop = req.params.mail;
    let counter = 0;
    for( var i = 0; i < storage.length; i++){ 
       counter++;
        if (storage[i].mail == prop) { 
            // console.log(i);
            // console.log(storage[i]);
            
            res.send(storage[i]);
        }  
    }   
};

//taget fra laura
const editUser = function(req,res){
    const mail = req.params.mail;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const description = req.params.description;
    const password= req.body.password;
    const like = req.body.like;
   
    //const storage = JSON.parse(fs.readFileSync('user.json'))
    const specificUser = storage.find((user) => user.mail == mail);
    
    if(firstname) {
        specificUser.firstname = firstname;
    };
    if(lastname) {
        specificUser.lastname = lastname;
    };
    if(age) {
        specificUser.age = age;
    };
    if(description) {
        specificUser.description = description;
    };
    if(password){
        specificUser.password = password;
    }
    if(like){
        specificUser.like = like;
    }
    let userStorage = JSON.stringify(storage, null, 2);
    fs.writeFileSync('../data/user.json', userStorage, 'utf8')

    res.send("The profile has been updayed")
}

const displayUsers = function(req, res){
    if(res.status(200)){
        res.send(storage);
    } else {
        res.send(status);
    }
};
 
     


module.exports = {frontpage, createUser, login, editprofile, saveInput, deleteUser, findUser, account, editUser, displayUsers};


