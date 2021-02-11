// ----------- localstorage for EDITUSER page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
let mail = localStorage.getItem('brugernavn');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let age = localStorage.getItem('alder');
let description= localStorage.getItem('beskrivelse');
let password = localStorage.getItem('kodeord');
const deleteBtn = document.querySelector('#delete'); // en Variabel for slet knappen
const acceptEditBtn = document.querySelector('#submitEdit'); // en variabel for at ændre bruger knappen
var table = document.getElementById("table"); // En variabel for tabellen 



// ------------------ Opretter klassen Profile--------------------
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

    //Opretter en instans af klassen Profile - med oplysninger fra local storage
const profile = new Profile(mail, firstname, lastname, age, description, password);
let newUser = [profile]; // indsætte instansen profile i et array

    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
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

// -------------------- SLET BRUGER ---------------------

    //----------------- 01. Knap der starter slet bruger--------------------
deleteBtn.addEventListener('click', function(){ // Ved klik på knappen delete user
    alert("Warning - Your profile will be deleted"); //Sender advarsel ud til brugeren
    deleteUser(); //køre funktionen deleteUser hver gang knappen trykkes på
});
    
    // ---------------- 02. Funktion der sletter brugeren--------------------
function deleteUser(){
    // ------------ 01. hvis brugernavn/ mail er at finde i localstorage -----------------------------------
    if(localStorage.getItem('brugernavn')){

        // -------- 02. Denne instans profile af klassen Profile  bruges til at sende en delete request til databasen ved hjælp af HTTP req DELETE
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(profile), // Konvertere klassen til en json string - det er denne instans der skal fjernes fra DB
        };    
       
        // --------- 03. Her benyttes fetch til at kontakte API og dermed fjerne bruger i DB--------------
        fetch(`http://localhost:4000/profile/${mail}`, option)
        .then(function() {
            console.log("ok"); // Hvis det lykkes console logges ok i browser konsol
        }).catch(function() {
            console.log("error"); // Ellers vil outputtet i browser kontrol være error
        });
        
        // ---------- 04. Her fjernes den information om brugeren gemt i localstorage----------------------
        localStorage.removeItem('brugernavn');
        localStorage.removeItem('fornavn');
        localStorage.removeItem('efternavn');
        localStorage.removeItem('alder');
        localStorage.removeItem('beskrivelse');
        localStorage.removeItem('kodeord');
        
        // ----------- 05. Bruger vidersendes til forside------------------------------
        window.location.href = "/";
    };
};


//--------------------- REDIGER BRUGER----------------------------

    // ---------------------01. Opretter felter som kan redigeres i -------------------
for(i in newUser){ // Looper igennem 
    table.innerHTML += // Tilføjer i html filen redigerings felterne
    "<tr><td>Cannot be changed" + 
    "</td><td><input id='fname'>"  +
    "</td><td><input id='lname'>" + 
    "</td><td><input id='alder'>" + 
    "</td><td><input id='descr'>" + 
    "</td><td><input id='code'>" + 
    "</td></tr>"
}

    // -------------------- 02. Ved klik på submit ændringer---------------------------
acceptEditBtn.addEventListener('click', function(){
    
    //Henter værdierne der er blevet indtastet i redigeringsfelterne
    let fName = document.getElementById('fname').value
    let lName = document.getElementById('lname').value
    let alder = document.getElementById('alder').value
    let descr = document.getElementById('descr').value
    let code = document.getElementById('code').value
    
    // Sætter de værdier i localstorage
    localStorage.setItem('fornavn', fName);
    localStorage.setItem('efternavn',lName);
    localStorage.setItem('alder', alder);
    localStorage.setItem('beskrivelse', descr);
    localStorage.setItem('kodeord', code);

    // Opretter ny instans af Profile klassen
    let updUser = new Profile(mail, fName, lName, alder, descr, code);
    let update = [updUser]; //indsætter denne i arr

    //Kalder funktionen edit(user)
    edit(update);
    
})

    //--------------------- 03. Funktionen edit(user) -------------------------
function edit(user){
    //Hvis email/brugernavn eksistere - lav gammel info om til opdateret info
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
        
        
        // Henter nye oplysninger om bruger fra localstorage sætter det li en ny variabel
        let fornavn = localStorage.getItem('fornavn');
        let efternavn = localStorage.getItem('efternavn');
        let aar = localStorage.getItem('alder');
        let beskrivelse = localStorage.getItem('beskrivelse');
        let kodeord = localStorage.getItem('kodeord');

        // Opretter en instans af klassen Profile som består af de nye værdier
        const finish = new Profile(mail, fornavn, efternavn, aar, beskrivelse, kodeord)
        const option = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(finish),// Konvertere klassen til en json string
        };    
        
        // --------- Her benyttes fetch til at kontakte API og dermed indsætte bruger i DB
         fetch(`http://localhost:4000/edit/${mail}`, option).then(function() {
            console.log("ok");
            alert("Succes!")
            alert("You will be directed back to your profile");
            // Naviger til brugerens profil hvis alt ovenstående lykkes
            window.location.href = "/profile"; 
        }).catch(function() {
            // lykkedes det ikke 
            console.log("error");
        }); // Kunne indsætte window.location.href her - efter en finally blok
    }   
}

