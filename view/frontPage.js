const createUser = document.querySelector('.createUser');
const login = document.querySelector('.login');
const form = document.querySelector('form');

const express = require('express');
const server = express();




const loginBtn = document.querySelector('#submitlogin');
const createUserBtn = document.querySelector('#submitaccount');
const h1 = document.querySelector('h1');

//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('button', function(e){
    e.preventDefault();
});

createUserBtn.addEventListener('click', function(){
    console.log("Retrieving create account page");
    createAccount(); //køre denne funktion hver gang knappen trykkes på
});

loginBtn.addEventListener('click', function(){
    
    login() //køre denne funktion hver gang knappen trykkes på
});

function createAccount(){
  
        server.get('./', function (req, res) {
            res.sendfile(dir + './CreateUser.html');
          });
    }


