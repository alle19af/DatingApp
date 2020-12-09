// ----------- localstorage for createUser page-------------

//Lauras kode
const usernameInput = document.querySelector('#username');

const passCodeInput = document.querySelector('#password');
const loginBtn = document.querySelector('#submitlogin');





loginBtn.addEventListener('click', function(){
         localStorage.setItem('username', usernameInput.value);
         localStorage.setItem('password', passCodeInput.value);
    logIn();
});

    function logIn() {
        var mail = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        fetch(`http://localhost:4000/Login/${mail}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data + "test");
            if (data.mail == mail && data.password == password){
                
                rememberMe(mail, password);
                window.location.href = "/profile";
                alert("Log in succesful! We just can't seem to forget you, so this is just a quick reminder: remember to log out after use if you're on a public computer.")
            } else {
                alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.")
            };
        });
    };
    
    function rememberMe(email, password){
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    };




// // // ----------- localstorage for createUser page-------------
// const form = document.querySelector('form');
// // const logInClass = document.querySelector('.login');
// // const logOutClass = document.querySelector('.logout');
// const UserInput = document.querySelector('#username');
// const passWordInput = document.querySelector('#password');
// const login = document.querySelector('#submitlogin');
// const logout = document.querySelector('#submitlogout');
// // const h1 = document.querySelector('h1');
// // const personalGreeting = document.querySelector('.personal-greeting');
// // const personalInfo = document.querySelector('.personal-information');

// //sikre at submit knap kan gøre som vi vil og ikke som default adfærd
// form.addEventListener('submit', function(e){
//     e.preventDefault();
// });

// // Sætter "item, til at være værdien af input fra useren og bruger dem senere"
// login.addEventListener('click', function(){
//     localStorage.setItem('brugernavn', UserInput.value);

//     localStorage.setItem('kodeord', passWordInput.value);
//    accessProfile(); //køre denne funktion hver gang knappen trykkes på)
// });

// // -------------- Hva der skal slettes ved logout.-----------
// logout.addEventListener('click', function(){
   
//     localStorage.removeItem('brugernavn');
//     localStorage.removeItem('fornavn');
//     localStorage.removeItem('efternavn');
//     localStorage.removeItem('email');
//     localStorage.removeItem('alder');
//     localStorage.removeItem('beskrivelse');
//     localStorage.removeItem('kodeord');

//     accessProfile() //køre denne funktion hver gang knappen trykkes på
// });


// function accessProfile() {
//     var email = document.getElementById("username").value;
//     var password = document.getElementById("submitlogin").value;

//     fetch(`http://localhost:4000/login`)
//     .then((response) => response.json())
//     .then((input) => {
//         if (input.email == email && input.password == password){
//             rememberMe(email, password);
           
//             alert("Log in succesful! We just can't seem to forget you, so this is just a quick reminder: remember to log out after use if you're on a public computer.")
//         } else {
//             alert("Looks like the e-mail or password is incorret. Please try again or sign up to create an account.")
//         };
//     });
// };

// function rememberMe(email, password){
//     localStorage.setItem('email', email);
//     localStorage.setItem('password', password);
// };








//------------------ved tryk på submit user  kør denne funktion--------------
// function userNameDisplayCheck(){
//     if(localStorage.getItem('brugernavn')){
//         let username = localStorage.getItem('fornavn');
//         // let name = localStorage.getItem('fornavn');
//         // let lastname = localStorage.getItem('efternavn');
//         // let mail = localStorage.getItem('email');
//         // let age = localStorage.getItem('alder');
//         // let description= localStorage.getItem('beskrivelse');
//         let code = localStorage.getItem('kodeord');
//         h1.textContent = "Velkommen "+ username;//  + " " +lastname;
//         personalGreeting.textContent = "Velkommen til din profil ";// + name;
//         personalInfo.textContent = " Her kan du ændre din personlige oplysninger ";// + name + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + code;
//         logOutClass.style.display = 'block';
//         logInClass.style.display = 'none';
//         //hvis ikke den eksistere
//     } else {
//         h1.textContent = "Velkommen stranger";
//         personalGreeting.textContent = "Du er ikke logget ind endnu";
//         personalInfo.textContent = "Vi har ingen info om dig, før du er logget ind! Har du ikke en bruger i forvejen gå tilbage til forsiden og opret en."
//         logOutClass.style.display = 'none';
//         logInClass.style.display = 'block';
//     }
// }


// /**
//  * Retrieves input data from a form and returns it as a JSON object.
//  * @param  {HTMLFormControlsCollection} elements  the form elements
//  * @return {Object}                               form data as an object literal
//  */
// const formToJSON = elements => [].reduce.call(elements, (data, element) => {
//     data[element.name] = element.value;
//     return data;
//   }, {});
//   const handleFormSubmit = event => {
//     // Stop the form from submitting since we’re handling that with AJAX.
//     event.preventDefault();
//     // Call our function to get the form data.
//     const data = formToJSON(form.elements);
//     // Demo only: print the form data onscreen as a formatted JSON object.
//     const dataContainer = document.getElementsByClassName('results__display')[0];
//     // Use `JSON.stringify()` to make the output valid, human-readable JSON.
//     dataContainer.textContent = JSON.stringify(data, null, "  ");
//     // ...this is where we’d actually do something with the form data...
//   };
//   const formjson = document.getElementsByClassName('form')[0];
//   formjson.addEventListener('submit', handleFormSubmit);
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

//For Login page -with localstorage
// document.body.onload = accessProfile;
