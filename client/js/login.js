// ----------- localstorage for createUser page-------------

//Lauras kode
// For fat på brugernavn og kodeord ved login
const userName = document.querySelector('#username');
const passWord = document.querySelector('#password');
const loginBtn = document.querySelector('#submitlogin');

// Skal ikke bruges til noget endnu
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

// Ved login bruges localstorage til at gemme/huske disse værdier
// og vi kalder funktionen login
loginBtn.addEventListener('click', function(){
        localStorage.setItem('brugernavn', userName.value);
        localStorage.setItem('kodeord', passWord.value);
        logIn();//overvej om vi skal indhente bruger og kode som parametrer
});

// Log in function
function logIn() {
    var mail = userName.value;
    var password = passWord.value;
        
    // Et promise, der henter brugeren med denne mail, brugeren gives tilbage som respons
    fetch(`http://localhost:4000/Login/${mail}`)
    .then((response) => response.json()) // .json() Parse the brugeren to json
    .then((text) => {
    console.log(text + "test"); // der console logges ObjecObject
          
        // Hvis objektet.mail = mail og objekt.password = Passwword
        if (text.mail == mail && text.password == password){

            //sætter resten af brugeroplysninger i localstorage så de kan hentes og bruges i profilen
            localStorage.setItem('fornavn', text.firstname);
            localStorage.setItem('efternavn', text.lastname);
            localStorage.setItem('alder', text.age);
            localStorage.setItem('beskrivelse', text.description)
            
            /*test*/ alert(text.firstname)

            //naviger til ny side
            window.location.href = "/profile";
            alert("Log in succesful! We just can't seem to forget you, so this is just a quick reminder: remember to log out after use if you're on a public computer.")
        } else {
            alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.")
        };
    }).catch( e => {
        alert("User doesnt exist, please create one to find love")
        console.log(e)
    });
};
    
 

