

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
// const personalGreeting = document.querySelector('.personal-greeting');
// const personalInfo = document.querySelector('.personal-information');

// logoutDiv.style.display = 'none';
// loginDiv.style.display = 'none';

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
});


//------------------ved tryk på submit user  kør denne funktion--------------
function saveUser(){
    let mail = localStorage.getItem('brugernavn');
    let firstname = localStorage.getItem('fornavn');
    let lastname = localStorage.getItem('efternavn');
    let age = localStorage.getItem('alder');
    let description = localStorage.getItem('beskrivelse');
    let password = localStorage.getItem('kodeord');
        const user = new Profile(mail, firstname, lastname, age, description, password);

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),
        
        };    

        fetch(`http://localhost:4000/createUser/${mail}`, option).then(function() {
            console.log("ok");
            alert(user.mail);
            // if(user.mail == mail){
            //     alert("Mail is already taken, if you alreadt have an account go to LOGIN")
            //     logoutDiv.style.display = 'none';
            //     loginDiv.style.display = 'block';
            // }else {
        
            // } 
        }).catch(e => {
            console.log(e + " test");
        

        });

        alert("You will be directed to your profile")
        window.location.href = "/profile"; 
        //hvis ikke den eksistere
    // } else {
    //    console.log("test");
    //    alert("Mail is already taken, if you alreadt have an account go to LOGIN")
    // }
  
};
//         fetch(`http://localhost:4000/createUser/${mail}`, option)
//         .then((response) => response.text())
//         .then((text) => {
//             if(!response.ok){
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             } else 
//             alert("You will be directed to your profile")
//             window.location.href = "/profile"; 
        
//         // .then((response) => response.text()) // .json() Parse the brugeren to json
//         // .then((text) => {
        
//             // console.log(text);
//             // if(text === "User already exist" ){
//             //     alert("Mail is already taken, if you alreadt have an account go to LOGIN")
//             // } else {
              
            
//         }).catch(e => {
//             console.log(e + " test");
//             alert("Mail is already taken, if you alreadt have an account go to LOGIN")
//         });
        
// };


        //h1.textContent = "Velkommen "+ firstname  + " " +lastname;
        // p.textContent = "du kan nu explore the dating world";
        // personalGreeting.textContent = "Velkommen til vores hjemmeside " + firstname;
        // personalInfo.textContent = " Her er lidt info om dig " + firstname + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + password;
        // logoutDiv.style.display = 'block';
        // loginDiv.style.display = 'none';
