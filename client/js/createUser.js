// ----------- localstorage for createUser page-------------
const form = document.querySelector('form');
const loginDiv = document.querySelector('.createUser');
const logoutDiv = document.querySelector('.changes');
const usernameInput = document.querySelector('#username');
const nameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const ageInput = document.querySelector('#age');
const descrInput = document.querySelector('#description');
const passCodeInput = document.querySelector('#password');
const loginBtn = document.querySelector('#submitUser');
const deleteBtn = document.querySelector('#delete');
const logoutBtn = document.querySelector('#submitlogout');
const h1 = document.querySelector('h1');
const p = document.querySelector('#todo');
const personalGreeting = document.querySelector('.personal-greeting');
const personalInfo = document.querySelector('.personal-information');

// logoutDiv.style.display = 'none';
// loginDiv.style.display = 'none';

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

//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('click', function(e){
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
    saveUser() //køre denne funktion hver gang knappen trykkes på

//-----------------FOR JSON-----------------------------------
    // let newUser = new User(firstname, lastname, description, password);
    //         uploadUser(newUser);
        
});

// deleteBtn.addEventListener('click', function(){
//     localStorage.getItem('brugernavn');
//     localStorage.getItem('fornavn');
//     localStorage.getItem('efternavn');
//     localStorage.getItem('alder');
//     localStorage.getItem('beskrivelse');
//     localStorage.getItem('kodeord');
//     deleteUser();

// });

// // -------------- Hva der skal slettes ved logout.-----------
// logoutBtn.addEventListener('click', function(){
//     localStorage.removeItem('brugernavn');
//     localStorage.removeItem('fornavn');
//     localStorage.removeItem('efternavn');
//     localStorage.removeItem('alder');
//     localStorage.removeItem('beskrivelse');
//     localStorage.removeItem('kodeord');
//     displayUser() //køre denne funktion hver gang knappen trykkes på
// });

//------------------ved tryk på submit user  kør denne funktion--------------
function saveUser(){
    if(localStorage.getItem('fornavn')){
        let mail = localStorage.getItem('brugernavn');
        let firstname = localStorage.getItem('fornavn');
        let lastname = localStorage.getItem('efternavn');
        let age = localStorage.getItem('alder');
        let description = localStorage.getItem('beskrivelse');
        let password = localStorage.getItem('kodeord');
        // h1.textContent = "Velkommen "+ firstname  + " " +lastname;
        // p.textContent = "du kan nu explore the dating world";
        // personalGreeting.textContent = "Velkommen til vores hjemmeside " + firstname;
        // personalInfo.textContent = " Her er lidt info om dig " + firstname + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + password;
        // logoutDiv.style.display = 'block';
        // loginDiv.style.display = 'none';

        const user = new Profile(mail, firstname, lastname, age, description, password);

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),
        
        };    
        //console.log(user);
        fetch(`http://localhost:4000/createUser/${mail}`, option).then(function() {
            console.log("ok");
        }).catch(function() {
            console.log("error");
        });
        window.location.href = "/profile";

        //hvis ikke den eksistere
    } else {
        
        logoutDiv.style.display = 'none';
        loginDiv.style.display = 'block';
    }
}

// function deleteUser(){
//     if(localStorage.getItem('brugernavn')){
//     let mail = localStorage.getItem('brugernavn');
//     let firstname = localStorage.getItem('fornavn');
//     let lastname = localStorage.getItem('efternavn');
//     let age = localStorage.getItem('alder');
//     let description= localStorage.getItem('beskrivelse');
//     let password = localStorage.getItem('kodeord');

//     const user = new Profile(mail, firstname, lastname, age, description, password);
//         const option = {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//         }, 
//         body: JSON.stringify(user),
//         };    
//         //console.log(user);
//         fetch(`http://localhost:4000/createUser/${mail}`, option).then(function() {
//             console.log("ok");
//         }).catch(function() {
//             console.log("error");
//         });
        
//         h1.textContent = "Velkommen stranger";
//         p.textContent = "Din bruger er nu slettet";
//         personalGreeting.textContent = "Vi håber du har fundet din soulmate";
//         personalInfo.textContent = "Vi har ingen info om dig, Opret en bruger";

//         logoutDiv.style.display = 'none';
//         loginDiv.style.display = 'block';
//     };
// };


//For create user page -with localstorage
// document.body.onload = 

// document.body.onload = 



