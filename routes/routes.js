// different routes

import express from 'express';

import  { createUser, getUser, matchId, rmUser, updUser } from '../controllers/users.js';


const router = express.Router(); // initialize our router


// All routes in here start with /users , defined in index file
//1. get /users, 
router.get('/', getUser);

// 2. Post users, // This sends data, from (client) to server // Now we need postman cause this wont register in the browser - test our post route,
router.post('/', createUser);

// 3. Get users witch matching id, the colon expects any string after the /
router.get('/:id', matchId);

// 4. Delete a user with specific id
router.delete('/:id', rmUser);

// 5. update  user with specific id, when using patch request - modify partly something.
router.patch('/:id', updUser);

export default router; // so we can use this folder in our index file.