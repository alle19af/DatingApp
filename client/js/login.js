// ----------- localstorage for createUser page-------------
const form = document.querySelector('form');
const logInClass = document.querySelector('.login');
const logOutClass = document.querySelector('.logout');
const UserInput = document.querySelector('#username');
const passWordInput = document.querySelector('#password');
const login = document.querySelector('#submitlogin');
const logout = document.querySelector('#submitlogout');
const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');
const personalInfo = document.querySelector('.personal-information');

// --------------- FOR JSON--------------
// class User {
//     constructor(firstname, lastname, description, password){
//         this.firstName = firstname;
//         this.lastname = lastname;
//         this.description = description;
//         this.password = password;
//     }
//}

//sikre at submit knap kan gøre som vi vil og ikke som default adfærd
form.addEventListener('submit', function(e){
    e.preventDefault();
});

// Sætter "item, til at være værdien af input fra useren og bruger dem senere"
login.addEventListener('click', function(){
    localStorage.setItem('brugernavn', UserInput.value);

    localStorage.setItem('kodeord', passWordInput.value);
    userNameDisplayCheck() //køre denne funktion hver gang knappen trykkes på

//-----------------FOR JSON-----------------------------------
    // let newUser = new User(firstname, lastname, description, password);
    //         uploadUser(newUser);
        
});

// -------------- Hva der skal slettes ved logout.-----------
logout.addEventListener('click', function(){
   
        localStorage.removeItem('brugernavn');
        localStorage.removeItem('fornavn');
        localStorage.removeItem('efternavn');
        localStorage.removeItem('email');
        localStorage.removeItem('alder');
        localStorage.removeItem('beskrivelse');
        localStorage.removeItem('kodeord');
      

    userNameDisplayCheck() //køre denne funktion hver gang knappen trykkes på
});

//------------------ved tryk på submit user  kør denne funktion--------------
function userNameDisplayCheck(){
    if(localStorage.getItem('brugernavn')){
        let username = localStorage.getItem('kodeord');
        // let name = localStorage.getItem('fornavn');
        // let lastname = localStorage.getItem('efternavn');
        // let mail = localStorage.getItem('email');
        // let age = localStorage.getItem('alder');
        // let description= localStorage.getItem('beskrivelse');
        let code = localStorage.getItem('kodeord');
        h1.textContent = "Velkommen "+ username;//  + " " +lastname;
        personalGreeting.textContent = "Velkommen til din profil ";// + name;
        personalInfo.textContent = " Her kan du ændre din personlige oplysninger ";// + name + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + code;
        logOutClass.style.display = 'block';
        logInClass.style.display = 'none';
        //hvis ikke den eksistere
    } else {
        h1.textContent = "Velkommen stranger";
        personalGreeting.textContent = "Du er ikke logget ind endnu";
        personalInfo.textContent = "Vi har ingen info om dig, før du er logget ind! Har du ikke en bruger i forvejen gå tilbage til forsiden og opret en."
        logOutClass.style.display = 'none';
        logInClass.style.display = 'block';
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
document.body.onload = userNameDisplayCheck;
