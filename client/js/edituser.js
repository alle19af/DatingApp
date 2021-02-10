
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

//SKjuler rediger knappen
acceptEditBtn.style.display = 'block';
startEditBtn.style.display = 'none';

// Opretter felter under bruger oplysninger
//Som der kan redigeres i
for(i in newUser){
    table.innerHTML += 
    "<tr><td>Cannot be changed" + 
    "</td><td><input id='fname'>"  +
    "</td><td><input id='lname'>" + 
    "</td><td><input id='alder'>" + 
    "</td><td><input id='descr'>" + 
    "</td><td><input id='code'>" + 
    "</td></tr>"
}


// -------------------- Mangler---------------------------
//Ved tryk på submit knappen
acceptEditBtn.addEventListener('click', function(){
    
    //Henter værdierne der er blevet indtastet som skal ændres
    // let username = document.getElementById('uname').value
    let fName = document.getElementById('fname').value
    let lName = document.getElementById('lname').value
    let alder = document.getElementById('alder').value
    let descr = document.getElementById('descr').value
    let code = document.getElementById('code').value
    
        // localStorage.setItem('brugernavn', username);
        localStorage.setItem('fornavn', fName);
        localStorage.setItem('efternavn',lName);
        localStorage.setItem('alder', alder);
        localStorage.setItem('beskrivelse', descr);
        localStorage.setItem('kodeord', code);
    // Opretter ny instans af profile klassen
    let updUser = new Profile(mail, fName, lName, alder, descr, code);
    let update = [updUser]; //indsætter denne i arr
    //console.log("Before Update " + update);
    edit(update);
    
})


//--------------------- Mangler -------------------------
function edit(user){
    //Hvis email/brugernavn eksistere - lav info om til opdateret info
    if(localStorage.getItem('brugernavn')){
        if(mail) {
            newUser.mail = user.mail;
        }
        if(firstname) {
            newUser.firstname = user.fName;
        };
        if(lastname) {
            newUser.lastname = user.lName;
        };
        if(age) {
            newUser.age = user.alder;
        };
        if(description) {
            newUser.description = user.descr;
        };
        if(password) {
            newUser.password = user.code;
        };
        // Tester hvordan bruger ser ud nu
        //console.log("After update " + newUser);

        // Tester hvad vores Api sender til os fra DB
        //let userFromDb = new Profile(mail, firstname, lastname, age, description, password);
        
        // let bruger = localStorage.getItem('brugernavn');
        let fornavn = localStorage.getItem('fornavn');
        let efternavn = localStorage.getItem('efternavn');
        let aar = localStorage.getItem('alder');
        let beskrivelse = localStorage.getItem('beskrivelse');
        let kodeord = localStorage.getItem('kodeord');
        const finish = new Profile(mail, fornavn, efternavn, aar, beskrivelse, kodeord)
        const option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(finish),
        
        };    console.log(finish);

         fetch(`http://localhost:4000/edit/${mail}`, option).then(function() {
            console.log("ok");
            // userFromDb.mail = newUser.mail;
            // userFromDb.firstname = newUser.firstname;
            // userFromDb.lastname = newUser.lastname;
            // userFromDb.age = newUser.age;
            // userFromDb.description = newUser.description;
            // userFromDb.password = newUser.password;
        }).catch(function() {
            console.log("error");
        });


        
        
        
        alert("Your profile has been updated!");
        window.location.href = "/profile"; 
        

    }   
}

