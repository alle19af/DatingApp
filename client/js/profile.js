
let mail = localStorage.getItem('brugernavn');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let age = localStorage.getItem('alder');
let description= localStorage.getItem('beskrivelse');
let password = localStorage.getItem('kodeord');
const deleteBtn = document.querySelector('#delete');

var table = document.getElementById("table");

class Profile {
    constructor(mail, firstname, lastname, age, description, password){
        this.mail = mail;
        this.firstName = firstname;
        this.lastname = lastname;
        this.age = age;
        this.description = description;
        this.password = password;
    }
};

const profile = new Profile(mail, firstname, lastname, age, description, password);

let user = [profile];

for(i in user){
table.innerHTML += "<tr><td>" + 
user[i].mail + 
    "</td><td>" + user[i].firstname +
    "</td><td>" + user[i].lastname + 
    "</td><td>" + user[i].age +
    "</td><td>" + user[i].description +
    "</td><td>" + user[i].password +
    "</td></tr>"



deleteBtn.addEventListener('click', function(){
    localStorage.getItem('brugernavn');
    localStorage.getItem('fornavn');
    localStorage.getItem('efternavn');
    localStorage.getItem('alder');
    localStorage.getItem('beskrivelse');
    localStorage.getItem('kodeord');
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
        window.location.href = "/";
        
        // h1.textContent = "Velkommen stranger";
        // p.textContent = "Din bruger er nu slettet";
        // personalGreeting.textContent = "Vi håber du har fundet din soulmate";
        // personalInfo.textContent = "Vi har ingen info om dig, Opret en bruger";

    };
}};