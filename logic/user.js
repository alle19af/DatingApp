// Controllers holds the functionality - the actions¨
// deals with logic

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

// 03. Actions witd DB/ storage(skal rykkes til model)
const saveInput = function(req, res){
    
    let prop = req.params.mail;
    let counter = 0;

    // https://www.geeksforgeeks.org/javascript-check-if-a-key-exists-inside-a-json-object/
    // Looping through our storage object, checking if User input already exist.
    for(var i=0; i <storage.length; i++){
        console.log('test if: ' + storage[i].mail + ' is = '+ prop);
        if(storage[i].mail == prop){
            //res.send("User taken message from api"); // færdiggøre søgning
            ans = "Storage has " + prop + " as property"; 
          counter++
          
        } else {
            ans = "Storage doesnt have " + prop + " as property"; 
        }
    }
    console.log(ans)
    if(counter  < 1){
        storage.push(req.body) // skubber body ind i vores storageObject
            //laver vores storage object til  string og indsætter i JSON   
        fs.writeFile('../data/user.json', JSON.stringify(storage, null, 2), (err) => {
           if (err) throw err;
            console.log(prop + ' has been written to storage');
                // res.sendFile('/Users/alexandral.gonzalez/Desktop/Eksamen/DatingApp/client/profile.html');
        });  
    } 
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
    res.send(storage);
}


module.exports = {frontpage, createUser, login, editprofile, saveInput, deleteUser, findUser, account, editUser, displayUsers};


