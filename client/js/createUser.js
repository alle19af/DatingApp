// ----------- localstorage for CREATERUSER page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
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


// ------------------ Opretter klassen Profile--------------------
class Profile {
    constructor(mail, firstname, lastname, age, description, password){
        this.mail = mail;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.description = description;
        this.password = password; 
        // Bemærk at der ikke er like eller match eller metoder med, da disse er undværlige ved oprettelse af bruger
    }
};

//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('click', function(e){
    e.preventDefault();
});


// Sætter bruger input i localstorage, til at være værdien af input fra useren og bruger dem senere"
loginBtn.addEventListener('click', function(){ // Dette gøres når der klikkes på submit 
    localStorage.setItem('brugernavn', usernameInput.value);
    localStorage.setItem('fornavn', nameInput.value);
    localStorage.setItem('efternavn', lastnameInput.value);
    localStorage.setItem('alder', ageInput.value);
    localStorage.setItem('beskrivelse', descrInput.value);
    localStorage.setItem('kodeord', passCodeInput.value);
    saveUser() //køre funktionen saveUser hver gang knappen trykkes på
});


//------------------ved tryk på submit user køre denne funktion--------------
function saveUser(){
    // ------------- 01. Først gemmes alle bruger input i localstorage------
    let mail = localStorage.getItem('brugernavn');
    let firstname = localStorage.getItem('fornavn');
    let lastname = localStorage.getItem('efternavn');
    let age = localStorage.getItem('alder');
    let description = localStorage.getItem('beskrivelse');
    let password = localStorage.getItem('kodeord');
        // -------- 02. Dernæst oprettes en instans af klassen Profile
        const user = new Profile(mail, firstname, lastname, age, description, password);

        // -------- 03. Denne instans bruges til at sende til databasen ved hjælp af HTTP req POST
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user),  // Konvertere klassen til en json string
        };    

        // --------- 04. Her benyttes fetch til at kontakte API og dermed indsætte bruger i DB
        fetch(`http://localhost:4000/createUser/${mail}`, option) // option er defineret ovenover hvor klassen er konveretet til korretke format
        .then(function(response) {  //vi tager response og laver det om til text
            response.text()
            .then(function(text) {  // så tager vi texten som parameter i ny funtion
                if(text == "It worked"){    // Tester for succes kriterier
                    alert("You will be directed to your new profile")
                    window.location.href = "/profile"; 
                } else if(text == "User is taken"){ // Hvis ikke succes kan man ikke oprette bruger
                    alert("User is already taken, do you have a user go to login")
                }
        }).catch(e => { // Hvis , error udskriv dette i browser console
            console.log(e + " test");// tilføjet test for at finde ud af hvilken af mange errors der kom frem
            alert("Something went wrong try again later"); //Viser ikke brugeren hvad fejlen er med vilje.
        });
    });
};