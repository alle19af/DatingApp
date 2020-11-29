const loginDiv = document.querySelector('.login');
const logoutDiv = document.querySelector('.logout');
const form = document.querySelector('form');
const nameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');

const descrInput = document.querySelector('#description');
const passCodeInput = document.querySelector('#password');
const loginBtn = document.querySelector('#submitlogin');
const logoutBtn = document.querySelector('#submitlogout');
const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');
const personalInfo = document.querySelector('.personal-information');

class User {
    constructor(firstname, lastname, description, password){
        this.firstName = firstname;
        this.lastname = lastname;
        this.description = description;
        this.password = password;
    }
}
//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('submit', function(e){
    e.preventDefault();
});

loginBtn.addEventListener('click', function(){
    localStorage.setItem('navn', nameInput.value);
    localStorage.setItem('efternavn', lastnameInput.value);
    
    localStorage.setItem('beskrivelse', descrInput.value);
    localStorage.setItem('kodeord', passCodeInput.value);
    nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på

    let newUser = new User(firstname, lastname, description, password);
            uploadUser(newUser);
        
});

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('navn');
    localStorage.removeItem('efternavn');
    localStorage.removeItem('beskrivelse');
    localStorage.removeItem('kodeord');
    nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på
});

function nameDisplayCheck(){
    if(localStorage.getItem('navn')){
        let name = localStorage.getItem('navn');
        let lastname = localStorage.getItem('efternavn');
        let description= localStorage.getItem('beskrivelse');
        let code = localStorage.getItem('kodeord');
        h1.textContent = "Velkommen "+ name  + " " +lastname;
        personalGreeting.textContent = "Velkommen til vores hjemmeside " + name;
        personalInfo.textContent = " Her er lidt info om dig " + name + " : " + description +  ". Dit valgte kodeord er: " + code;
        logoutDiv.style.display = 'block';
        loginDiv.style.display = 'none';
        //hvis ikke den eksistere
    } else {
        h1.textContent = "Velkommen stranger";
        personalGreeting.textContent = "Hej person som jeg ikke kender endnu"
        personalInfo.textContent = "Vi har ingen info om dig, før du er logget ind!"
        logoutDiv.style.display = 'none';
        loginDiv.style.display = 'block';
    }
}

function uploadUser(user){
    
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }

document.body.onload = nameDisplayCheck;