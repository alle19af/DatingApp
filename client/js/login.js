// ----------- localstorage for LOGIN page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
const userName = document.querySelector('#username');
const passWord = document.querySelector('#password');
const loginBtn = document.querySelector('#submitlogin');

// ------------------ Opretter klassen Profile--------------------
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

// ----------Ved tryk på login knap, sættes mail og kode i localstorage --------
loginBtn.addEventListener('click', function(){
        localStorage.setItem('brugernavn', userName.value);
        localStorage.setItem('kodeord', passWord.value);
        logIn();//køre funktionen logIn hver gang knappen trykkes på
});

// ----------------Log in funktionen der reagere ved klik på login knap--------------------
function logIn() {
    var mail = userName.value;
    var password = passWord.value;
        
    // 01. Et promise, der henter brugeren med denne mail, hele bruger objektet gives tilbage som respons
    fetch(`http://localhost:4000/Login/${mail}`)
    .then((response) => response.json()) // et promise der "resolves" som et javascript object, response skal være json format
    .then((text) => { 
    // console.log(text + "test"); // Her testes text output
          
        // 02. Hvis text.mail = den inputtede mail og text.password = input Passwword
        if (text.mail == mail && text.password == password){

            //03. Så sættes resten af brugeroplysninger i localstorage så de kan hentes og bruges i profilen
            localStorage.setItem('fornavn', text.firstname);
            localStorage.setItem('efternavn', text.lastname);
            localStorage.setItem('alder', text.age);
            localStorage.setItem('beskrivelse', text.description)
            
            //alert(text.firstname) test for at de rigtige informationer blev sat i localstorage

            //04. Naviger til brugerens profil hvis alt ovenstående lykkes
            window.location.href = "/profile";
            alert("Log in succesful! We just can't seem to forget you, so this is just a quick reminder: remember to log out after use if you're on a public computer.")
        } else {
            // 05. lykkes det ikke:
            alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.")
        };
    }).catch( e => {
        alert("User doesnt exist, please create one to find love")
        console.log(e)
    });
};
    
 

