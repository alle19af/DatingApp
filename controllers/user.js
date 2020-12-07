// Controllers holds the functionality - the actions¨
// deals with logic

// 01. Connections
const fs = require('fs');
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

const login = function(req, res){  // Hver gang denne path med http verb bliver kaldt, så vil vi starte en fubnktion med 2 parametrer, req & res
    fs.readFile('./client/Login.html', 'utf8', function(err, text){
         res.send(text);
     });// hver gang der kommer en get request, sender vi frontpage ud til browseren, som er en en html fil.
}

// 03. Actions witd DB/ storage(skal rykkes til model)
const getInput = function(req, res){
    console.log('test test i controller')

    ans ="";
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
        console.log("Test om den kære uden for loop")
            //laver vores storage object til  string og indsætter i JSON   
        fs.writeFile('user.json', JSON.stringify(storage, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } else {
        console.log( "the user is taken")
    }
    // ans ="";
    // let prop = req.body.mail;
    // if(storage.mail === prop){
    //         ans = "var 'obj' has " + prop + " property";
    //     }else {
    //         ans = "var 'obj' doesnt have " + prop + " as property"; 
    //                 //laver vores storage object til  string og indsætter i JSON   
    //             fs.writeFile('user.json', JSON.stringify(storage, null, 2), (err) => {
    //                 if (err) throw err;
    //                 console.log('Data written to file');
                    
    //             });
    //         }
    //         console.log(ans)
 };



module.exports = {frontpage, createUser, login, getInput};



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