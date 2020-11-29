// Controllers holds the functionality - the actions¨
// deals with logic

import { v4 as uuidv4 } from 'uuid';
// USer array have one objekt / MOCK USER DATABASE
let users = [];

// 0.1 Go to page create account

// 1. Get method , takes us to the user page
export const getUser = (req,res) => {
    
    res.send(users);
};

// 2. Post method, creates a user in database, 
export const createUser = (req, res) => {
    // push the created user in the browser.
    const user = req.body;
    const userId = uuidv4();
    
    users.push({ ...user, id: uuidv4()});

    res.send(`User with the name ${user.firstname} added to the database`);
};

// 3. Get method, get user with matching ID fro database
export const matchId = (req, res)=> {

    const id = req.params.id;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);

};

// 4. Delete method, deletes user from database
export const rmUser = (req,res) => {
    const id = req.params.id;
    const user = req.body;

    users = users.filter((user) => user.id !== id);

    res.send(`User ${user.firstname} with the id ${id} has been deleted from database`);
};

// 5. Patch method, updates parts of the user in the database 
export const updUser = (req, res)=> {
    const { id } = req.params;
    const { firstname, lastname, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(firstname) user.firstname = firstname;


    if(lastname) user.lastname = lastname;    


    if(age) user.age = age;    

    res.send(`User with the id: ${id} has been updated`);
};