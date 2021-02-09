// Controllers holds the functionality - the actions¨
// deals with logic

// 01. Connections
const fs = require('fs');
const {User} = require('../model/data');
const storage = JSON.parse(fs.readFileSync('user.json'))



// 02. Paths
const frontpage = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
     fs.readFile('./client/frontPage.html', 'utf8', function(err, text){
         res.send(text);
    });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};

const createUser = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
    fs.readFile('./client/createUser.html', 'utf8', function(err, text){
         res.send(text);
     });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};   

const account = function(req,res){
    fs.readFile('./client/profile.html', 'utf8', function(err, text){
        res.send(text);
    });
};
const login = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
    fs.readFile('./client/Login.html', 'utf8', function(err, text){
         res.send(text);
     });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
};

const editprofile = function(req,res){
    fs.readFile('./client/edituser.html', 'utf8', function(err, text){
        res.send(text);
    });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
}

// 03. Actions witd DB/ storage(skal rykkes til model)
const saveInput = function(req, res){
    
    let prop = req.body.mail;
    let counter = 0;
    // https://www.geeksforgeeks.org/javascript-check-if-a-key-exists-inside-a-json-object/
    // Looping through our storage object, checking if User input already exist.
    for(var i=0; i <storage.length; i++){
        console.log('test if: ' + storage[i].mail + ' is = '+ prop);
        if(storage[i].mail == prop){
            ans = "Storage has " + prop + " as property"; 
            counter++;
            
        } else {
            // console.log(storage)
            ans = "Storage doesnt have " + prop + " as property"; 
        }
    }
    console.log(ans)
    console.log("counter = " + counter)
    storage.push(req.body) // skubber body ind i vores storageObject
    if(counter  < 1){
            //laver vores storage object til  string og indsætter i JSON   
        fs.writeFile('user.json', JSON.stringify(storage, null, 2), (err) => {
            if (err) throw err;
            console.log(prop + ' has been written to storage');
                // res.sendFile('/Users/alexandral.gonzalez/Desktop/Eksamen/DatingApp/client/profile.html');
        });
        
    } else {
        console.log( "the user is taken")
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
        fs.writeFileSync('user.json', JSON.stringify(storage, null, 2), (err) => {
            if (err) throw err;
            
        })
        } 
    }

};

const findUser = function(req, res){
    
    //console.log(storage)
    const prop = req.params.mail;
    let counter = 0;
    for( var i = 0; i < storage.length; i++){ 
       counter++;
        
        if (storage[i].mail == prop) { 
            console.log(i);
            console.log(storage[i]);
            
            res.send(storage[i]);
        }
        
        
    }   
     console.log(counter)    
    // // fs.readFile('user.json', JSON.stringify(storage[i],null, 2), (err) => {
    // //     if (err) throw err;
    // //     console.log(prop + ' has been read');
    // // });
    // res.send(storage[counter]);
}

    // console.log( mail + " this is mail")
	// const specificUser = storage.find((user) => user.mail == mail);
 
    
    // console.log(specificUser + " is specific user")
    // console.log(storage + " in find user")


//taget fra laura
const editUser = function(req,res){
    const mail = req.params.mail;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const description = req.params.description;
    const password= req.body.password;
   

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
    let userStorage = JSON.stringify(storage, null, 2);
    fs.writeFileSync('./storage/userStorage.json', userStorage, 'utf8')

    res.send("Good news! Your profile has successfully been updated.")
}

//     let prop = req.body.mail;
//     let counter = 0;
//     // https://www.geeksforgeeks.org/javascript-check-if-a-key-exists-inside-a-json-object/
//     // Looping through our storage object, checking if User input already exist.
//     for(var i=0; i <storage.length; i++){
//         console.log('test if: ' + storage[i].mail + ' is = '+ prop);
//         if(storage[i].mail == prop){
//             ans = "Storage has " + prop + " as property"; 
//             counter++;
            
//         } else {
//             // console.log(storage)
//             ans = "Storage doesnt have " + prop + " as property"; 
//         }
//     }
//     console.log(ans)
//     console.log("counter = " + counter)
//     storage.push(req.body) // skubber body ind i vores storageObject
//     if(counter  < 1){
//             //laver vores storage object til  string og indsætter i JSON   
//         fs.writeFile('user.json', JSON.stringify(storage, null, 2), (err) => {
//             if (err) throw err;
//             console.log(prop + ' has been written to storage');
//                 // res.sendFile('/Users/alexandral.gonzalez/Desktop/Eksamen/DatingApp/client/profile.html');
//         });
        
//     } else {
//         console.log( "the user is taken")
//     }
//  };


    // for(var i=0; i <storage.length; i++){
        
    //     if(storage[i].mail == prop){
    //         ans = "Storage has " + prop + " as property"; 
    //         counter++;
            
    //     } else {
    //         // console.log(storage)
    //         ans = "Storage doesnt have " + prop + " as property"; 
    //     }
    // }
    // console.log(ans)
    // console.log("counter = " + counter)
    // storage.filter(req.body) // skubber body ind i vores storageObject
    // if(counter  > 0){
    //     console.log("Så sletter vi user "+ prop)
    //         //laver vores storage object til  string og indsætter i JSON   
    //     fs.writeFile('user.json', JSON.stringify(storage, null, 2), (err) => {
    //         if (err) throw err;
    //         console.log(prop + ' has been written to storage');
    //     });
    // } else {
    //     console.log( "the user doenst exist")
    // }

        // var fs = require('fs');
        // var removeUser = "test2";
        // var data = fs.readFileSync('results.json');
        // var json = JSON.parse(data);
        // var users = json.users;
        // json.users = users.filter((user) => { return user.username !== removeUser });
        // fs.writeFileSync('results.json', JSON.stringify(json, null, 2));
        // }


module.exports = {frontpage, createUser, login, editprofile, saveInput, deleteUser, findUser, account, editUser};



// ----------------TYV stjålet fra REST API VIDEOEN-----------------//
// // 0.1 Go to page create account

// // 1. Get method , takes us to the user page
// export const getUser = (req,res) => {
    
//     res.send(users);
// };

// // 2. Post method, creates a user in database, 
// export const createUser = (req, res) => {
//     // push the created user in the browser.
//     const user = req.body;
//     const userId = uuidv4();
    
//     users.push({ ...user, id: uuidv4()});

//     res.send(`User with the name ${user.firstname} added to the database`);
// };

// // 3. Get method, get user with matching ID fro database
// export const matchId = (req, res)=> {

//     const id = req.params.id;

//     const foundUser = users.find((user) => user.id === id);

//     res.send(foundUser);

// };

// // 4. Delete method, deletes user from database
// export const rmUser = (req,res) => {
//     const id = req.params.id;
//     const user = req.body;

//     users = users.filter((user) => user.id !== id);

//     res.send(`User ${user.firstname} with the id ${id} has been deleted from database`);
// };

// // 5. Patch method, updates parts of the user in the database 
// export const updUser = (req, res)=> {
//     const { id } = req.params;
//     const { firstname, lastname, age } = req.body;

//     const user = users.find((user) => user.id === id);

//     if(firstname) user.firstname = firstname;


//     if(lastname) user.lastname = lastname;    


//     if(age) user.age = age;    

//     res.send(`User with the id: ${id} has been updated`);
// };