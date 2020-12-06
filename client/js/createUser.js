// ----------- localstorage for createUser page-------------
const form = document.querySelector('form');
const loginDiv = document.querySelector('.createUser');
const logoutDiv = document.querySelector('.logout');
const usernameInput = document.querySelector('#username');
const nameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const ageInput = document.querySelector('#age');
const descrInput = document.querySelector('#description');
const passCodeInput = document.querySelector('#password');
const loginBtn = document.querySelector('#submitUser');
const logoutBtn = document.querySelector('#submitlogout');
const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');
const personalInfo = document.querySelector('.personal-information');

// --------------- FOR JSON--------------
class User {
    constructor(mail, firstname, lastname, description, password){
        this.mail = mail;
        this.firstName = firstname;
        this.lastname = lastname;
        this.description = description;
        this.password = password;
    }
};

//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('submit', function(e){
    e.preventDefault();
});

// Sætter "item, til at være værdien af input fra useren og bruger dem senere"
loginBtn.addEventListener('click', function(){
    localStorage.setItem('brugernavn', usernameInput.value);
    localStorage.setItem('fornavn', nameInput.value);
    localStorage.setItem('efternavn', lastnameInput.value);
    localStorage.setItem('alder', ageInput.value);
    localStorage.setItem('beskrivelse', descrInput.value);
    localStorage.setItem('kodeord', passCodeInput.value);
    nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på

//-----------------FOR JSON-----------------------------------
    // let newUser = new User(firstname, lastname, description, password);
    //         uploadUser(newUser);
        
});

// -------------- Hva der skal slettes ved logout.-----------
logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('brugernavn');
    localStorage.removeItem('fornavn');
    localStorage.removeItem('efternavn');
    localStorage.removeItem('alder');
    localStorage.removeItem('beskrivelse');
    localStorage.removeItem('kodeord');
    nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på
});

//------------------ved tryk på submit user  kør denne funktion--------------
function nameDisplayCheck(){
    if(localStorage.getItem('fornavn')){
        let mail = localStorage.getItem('brugernavn');
        let firstname = localStorage.getItem('fornavn');
        let lastname = localStorage.getItem('efternavn');
        let age = localStorage.getItem('alder');
        let description= localStorage.getItem('beskrivelse');
        let password = localStorage.getItem('kodeord');
        h1.textContent = "Velkommen "+ firstname  + " " +lastname;
        personalGreeting.textContent = "Velkommen til vores hjemmeside " + firstname;
        personalInfo.textContent = " Her er lidt info om dig " + firstname + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + password;
        logoutDiv.style.display = 'block';
        loginDiv.style.display = 'none';

        const user = new User(mail, firstname, lastname, description, password);

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),
        
        };    
        console.log(user);
        fetch('http://localhost:4000/createUser', option)

        //hvis ikke den eksistere
    } else {
        h1.textContent = "Velkommen stranger";
        personalGreeting.textContent = "Du er ikke logget ind endnu"
        personalInfo.textContent = "Vi har ingen info om dig, Opret en bruger eller login"
        logoutDiv.style.display = 'none';
        loginDiv.style.display = 'block';
    }
}

// ---------------------FOR JSON--------------
// function uploadUser(user){
    
//     fetch('http://localhost:4000/', {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
      
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//     }

//For create user page -with localstorage
document.body.onload = nameDisplayCheck;

