
let mail = localStorage.getItem('brugernavn');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let age = localStorage.getItem('alder');
let description= localStorage.getItem('beskrivelse');
let password = localStorage.getItem('kodeord');
const deleteBtn = document.querySelector('#delete');
const acceptEditBtn = document.querySelector('#submitEdit');
const startEditBtn = document.querySelector('#edit');

var table = document.getElementById("table");
acceptEditBtn.style.display = 'none';
startEditBtn.style.display = 'block';

//Her henter vi fra localstorage login.js har ikke andet en usernam og pasword

class Profile {
    constructor(mail, firstname, lastname, age, description, password){
        this.mail = mail;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.description = description;
        this.password = password;
    }
};


const profile = new Profile(mail, firstname, lastname, age, description, password);

let newUser = [profile];


for(i in newUser){
table.innerHTML += 
    "<tr><td>" + newUser[i].mail + 
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
        //console.log(user);
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


//---------------------Mangler----------------------------

    let updUser = new Profile(mail, firstname, lastname, age, description, password);
        acceptEditBtn.style.display = 'block';
        startEditBtn.style.display = 'none';
    let update = [updUser]
    for(i in update){
        table.innerHTML += 
        "<tr><td><input>" + 
        "</td><td><input>"  +
        "</td><td><input>" + 
        "</td><td><input>" + 
        "</td><td><input>" + 
        "</td><td><input>" + 
        "</td></tr>"
    }


// -------------------- Mangler---------------------------
acceptEditBtn.addEventListener('click', function(){
    // acceptEditBtn.style.display = 'none';
    // startEditBtn.style.display = 'block';
    edit();
    
})

//--------------------- Mangler -------------------------
function edit(){
    let user = new Profile(mail, firstname, lastname, age, description, password);

        const option = {
            method: 'Patch',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),
        
        };    
        //console.log(user);
        fetch(`http://localhost:4000/edit/${mail}`, option).then(function() {
            console.log("ok");
        }).catch(function() {
            console.log("error");
        });
        
        

        if(localStorage.getItem('brugernavn')){
            if(mail) {
                newUser.mail = mail;
            }
            if(firstname) {
                newUser.firstname = firstname;
            };
            if(lastname) {
                newUser.lastname = lastname;
            };
            if(age) {
                newUser.age = age;
            };
            if(description) {
                newUser.description = description;
            };
            if(password) {
                newUser.password = password;
            };
        alert("Your profile has been updated!");
        window.location.href = "/profile"; 
        
    // for(i in user){
    //     table.innerHTML += "<tr><td>" + 
    //     user[i].mail + 
    //         "</td><td>" + user[i].firstname +
    //         "</td><td>" + user[i].lastname + 
    //         "</td><td>" + user[i].age +
    //         "</td><td>" + user[i].description +
    //         "</td><td>" + user[i].password +
    //         "</td></tr>"
    //         break;
    // }
        // alert('your change has been saved') 
// } else {
//     acceptEditBtn.style.display = 'block';
//     startEditBtn.style.display = 'none';
}

}

