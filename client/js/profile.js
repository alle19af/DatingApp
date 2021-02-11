// ----------- localstorage for PROFILE page-------------
// Henter oplysningerne igennem id eller class fra HTML siden
let mail = localStorage.getItem('brugernavn');
let firstname = localStorage.getItem('fornavn');
let lastname = localStorage.getItem('efternavn');
let age = localStorage.getItem('alder');
let description= localStorage.getItem('beskrivelse');
let password = localStorage.getItem('kodeord');
const deleteBtn = document.querySelector('#delete'); // en Variabel for slet knappen
const likebtn = document.querySelector('#like'); // en variabel for like knappen
const viewMatch = document.querySelector('#viewMatch'); // en variabel for like knappen
var table = document.getElementById("table"); // en variabel for tabellen


// ------------------ Opretter klassen Profile--------------------
class Profile {
    constructor(mail, firstname, lastname, age, description, password){
        this.mail = mail;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.description = description;
        this._password = password;
        this.like = []; // Her er like og match også en del af attributterne
        this.match = []; 
    }   // Der er også tilføjet 3 metoder sammenlignet med de andre JS filer
    get password(){
        return this._password;
    };
    getMatch(Users){ //Er ikke færdig endnu
            this.match.push(Users);//Privat 
    };
    likeUser(User){
        this.like.push(User); //pusher den likede bruger ind i this.like array.
        //console.log(this.like); //Tester om like kommer ind i attributten
    };
    delMatch(matches){ // fjerner brugeren indsat som argument i deletematch metoden
        let newArr = this.match.filter( user  => user !== matches.mail)
        this.match = newArr;
    };
}; 


    //Opretter en instans af klassen Profile - med oplysninger fra local storage
const profile = new Profile(mail, firstname, lastname, age, description, password, [], []);
let newUser = [profile]; // indsætte instansen profile i et array

    //Det omdannes til array således vi kan loope igennem det og indsætte i tabel i HTML------------
for(i in newUser){
table.innerHTML += 
    "<tr><td>" + newUser[i].mail+ 
    "</td><td>" + newUser[i].firstname +
    "</td><td>" + newUser[i].lastname + 
    "</td><td>" + newUser[i].age +
    "</td><td>" + newUser[i].description +
    "</td><td>" + profile.password + // tester om password er privat
    "</td></tr>";
};


// ---------------------------- SLET BRUGER ----------------------------
deleteBtn.addEventListener('click', function(){ // eventlistener på slet bruger knappen
    alert("Warning - Your profile will be deleted"); //Sender advarsel ud til brugeren
    deleteUser(); //køre funktionen deleteUser hver gang knappen trykkes på
});

function deleteUser(){
    // ------------ 01. hvis brugernavn/ mail er at finde i localstorage -----------------------------------
    if(localStorage.getItem('brugernavn')){
        
         // -------- 02. Denne instans profile af klassen Profile  bruges til at sende en delete request til databasen ved hjælp af HTTP req DELETE
        const option = {
            method: 'DELETE', // delete request
            headers: {
                'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(profile),// Konvertere klassen til en json string -  det er denne instans der skal fjernes fra DB
        };    

        // --------- 03. Her benyttes fetch til at kontakte API og dermed fjerne bruger i DB--------------
        fetch(`http://localhost:4000/profile/${mail}`, option)
        .then(function() {
            console.log("ok");  // Hvis det lykkes console logges ok i browser konsol
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


//------------------------------ LIKE BRUGERE -------------------------------

// ------------------------ 01. Fetcher alle potentielle match---------------------
fetch(`http://localhost:4000/profile/:${mail}`)
.then(function(response){
    return response.json(); // returnere et promise
})
.then(function(data){ 
    displayData(data); //Kunne Kalde funktionen displayData, med parametrene: storage( alle brugerne i DB & 0 der bruges som counter)
    //checkIfMatch(data); // kalder funktionen check om de matcher  
    
})
.catch(function(err){
    //Hvis der opstår en fejl fanges den her
    console.log(err);
}).finally((data) => {
    displayMatch(data); // viser antal matches
});


//----------------- 02. Viser de potentielle match  / Her ville det være muligt at like/ dislike eller se brugerens profil------------
function displayData(data){
   
    let users = document.getElementById("likes");
    for(let i = 0; i<= data.length; i++){       
        if(data[i].mail == profile.mail) { // springer sin egen bruger over da denne ikke skal vises
            continue
        } else {
            let div = document.createElement("div");
            div.innerHTML = "Name: " + data[i].mail +  
            " Age: " + data[i].age + 
            " Description: " + data[i].description;
            users.appendChild(div);
        };
    };   
};

//-------------- 03. eventlistener ved tryk på like knappen------------------------------------------
likebtn.addEventListener("click", function() {
        
    // Bruger metoden fra klassen til at - push potentielt match til LIKE array
    profile.likeUser(storage[i].mail) // kan ikke tilgå storage[i].mail her fra
    
    // kalder updLikes(user) - funktionen
     updLikes(profile);
    //  displayData(data, count++); // Rekursiv funktion kald, så frem jeg benyttede mig af counteren i fetch
})



// ------------------ 04. Opdatere arr m. likes og sender det til DB-------------------
function updLikes(profile){
    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(profile),
    };
    fetch(`http://localhost:4000/profile/${mail}`, option)
    .then(function() {
        console.log("ok");
        alert("Your profile has been updated!");
    }).catch(function() {
        console.log("error");
    });
}   

/* MANGLER */
//------------------------------ MATCHES -------------------------------------------

// ------------------------------01. Check for matches------------------------------
function checkIfMatch(users){
    for( i = 0; i<= users.length; i++){
        if(users[i].like.length < 1){
            continue; // Hvis arr er tomt spring over denne bruger
        } else if( users[i].like.includes(profile.mail) && profile.like.includes(users[i].mail)) {
            getMatch(users[i].mail); // kalder profilens metode og pusher matchet i match array
        };
    };
};


//-------------------------- 02. match eventlistener ------------------------------------
viewMatch.addEventListener("click", function() {
    // Viderdirigere til en profil side - hvor det er matchets profil fremfor brugerens egen.
    //displayMatch();
});
// ---------------------03. Show amount of matches and see profiles-----------------

// -------Viser antal matches----------------
function displayMatch(data){
    let count = 0;
    let match = document.getElementById("match");
    for(let i = 0; i < profile.match.length; i++){
        count++; 
    }  
    if( profile.match.length < 1){
        console.log("Tjekker hvis arr er tomt")
        let div = document.createElement("div");
        div.innerHTML = "You have " + count + " matches";
        match.appendChild(div);
    }
    // else if(profile.match.includes(data[i].mail) ){
    //     console.log(" Tjekker om match er includeret i arr")
    //     let div = document.createElement("div");
    //     div.innerHTML = "You have " + count + "match" + data[i].mail;
    //     match.appendChild(div);
    // }
};


//------------------------------- 03. Fjern match----------------------------------
function removeMatch(user){
    profile.delMatch(user);
};