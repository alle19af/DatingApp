//const data = require("../../model/data");

// henter bruger oplysninger fra localstorage
let mail = localStorage.getItem('brugernavn');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let age = localStorage.getItem('alder');
let description= localStorage.getItem('beskrivelse');
let password = localStorage.getItem('kodeord');
const deleteBtn = document.querySelector('#delete');
const likebtn = document.querySelector('#like');
//Opretter en tabel til at indeholde profilens oplysniger
var table = document.getElementById("table");


//Opretter en klasse som er lig med brugerinfo fra localstorage
class Profile {
    constructor(mail, firstname, lastname, age, description, password){
        this.mail = mail;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.description = description;
        this.password = password;
        this.like = [];
        this._match = [];
    }   
        getMatch(Users){ //jhbabj
            if(this.like == Users.like){
            this._match.push(Users);
        }; 
    }//Privat^^
        likeUser(User){
            this.like.push(User)
        };
    }; // 


// En instans af klassen profiler
const profile = new Profile(mail, firstname, lastname, age, description, password);
let newUser = [profile];

//Loop over arr newUser så de kan indsættes i tabel med bruger oplysninger
for(i in newUser){
table.innerHTML += 
    "<tr><td>" + newUser[i].mail+ 
    "</td><td>" + newUser[i].firstname +
    "</td><td>" + newUser[i].lastname + 
    "</td><td>" + newUser[i].age +
    "</td><td>" + newUser[i].description +
    "</td><td>" + newUser[i].password +
    "</td></tr>";
};


// -------------------- Delete virker---------------------
deleteBtn.addEventListener('click', function(){
    alert("Your profile will be deleted");
    // localStorage.removeItem('brugernavn');
    //     localStorage.removeItem('fornavn');
    //     localStorage.removeItem('efternavn');
    //     localStorage.removeItem('alder');
    //     localStorage.removeItem('beskrivelse');
    //     localStorage.removeItem('kodeord');
    deleteUser();
});

function deleteUser(){
    if(localStorage.getItem('brugernavn')){
        

        const user = new Profile(mail, firstname, lastname, age, description, password);
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),
        };    
        // console.log(user);
        fetch(`http://localhost:4000/profile/${mail}`, option).then(function() {
            console.log("ok");
        }).catch(function() {
            console.log("error");
        });
        
        localStorage.removeItem('brugernavn');
        localStorage.removeItem('fornavn');
        localStorage.removeItem('efternavn');
        localStorage.removeItem('alder');
        localStorage.removeItem('beskrivelse');
        localStorage.removeItem('kodeord');
        
        window.location.href = "/";

        
        // h1.textContent = "Velkommen stranger";
        // p.textContent = "Din bruger er nu slettet";
        // personalGreeting.textContent = "Vi håber du har fundet din soulmate";
        // personalInfo.textContent = "Vi har ingen info om dig, Opret en bruger";

    };
};



//---------------------Display likes----------------------------


//https://howtocreateapps.com/fetch-and-display-json-html-javascript/
// ---------------------Display Matches-----------------
fetch(`http://localhost:4000/profile/:${mail}`)
.then(function(response){
    //the json data will arrive here
    console.log("test");
    return response.json(); // it also returns a promise
})
.then(function(data){
    appendData(data); //creating code that appends the data to our page
})
.catch(function(err){
    //if error occoured , catch it here
    console.log(err);
})
// ----------------Show amount of matches and see profiles------------
// function countMatch(data){ 
//     let match = document.getElementById("match");
//     for(let i = 0; i < data.length;i++){
//         // if(data[i].mail )
//         // match.innerHTML = "You have " + count + 
//     }
// }



// Viser andre brugers data, skal gerne ske pr gang
function appendData(data){

let users = document.getElementById("likes");
for( let i = 0; i<data.length; i ++){
    if(data[i].mail == mail){
        continue
    } 

    let div = document.createElement("div");
    div.innerHTML = "Name: " + data[i].firstname +  " Age: " + data[i].age + " Description: " + data[i].description;
    users.appendChild(div);
    break;
     }

    //https://www.xspdf.com/resolution/56060953.html
    var buttonsCount = 0;
// ----------------- Like or dislike users--------------------
likebtn.addEventListener("click", function countCLick() {
    
   
    buttonsCount++;
    console.log(buttonsCount)
    if (buttonsCount > 0){
        newUser.likeUser(data[i].mail)
        console.log(newUser.like)
    }
    
    //newUser.likeUser(data[i].mail)
 }) 


}

  

 