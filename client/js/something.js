

// // --------------- FOR JSON--------------
// class Profile {
//     constructor(mail, firstname, lastname, age, description, password){
//         this.mail = mail;
//         this.firstName = firstname;
//         this.lastname = lastname;
//         this.age = age;
//         this.description = description;
//         this.password = password;
//     }
// };

// // // ----------- localstorage for createUser page-------------
// const submit = document.querySelector('form');
// // const loginDiv = document.querySelector('.createUser');
// // const logoutDiv = document.querySelector('.logout');
// const mail = document.getElementById('username');
// const firstname = document.querySelector('#firstname');
// const lastname = document.querySelector('#lastname');
// const age = document.querySelector('#age');
// const description = document.querySelector('#description');
// const password = document.querySelector('#password');
// const login = document.querySelector('#submitUser');
// // const logoutBtn = document.querySelector('#submitlogout');
// // const h1 = document.querySelector('h1');
// // const personalGreeting = document.querySelector('.personal-greeting');
// // const personalInfo = document.querySelector('.personal-information');
// // submit.addEventListener('submit', function(e){
// //     e.preventDefault();
// // });

// let user = new Profile(mail, firstname, lastname, age, description, password)
// console.log(user)

// login.addEventListener('submit', function(){
//     getdata();
// });
//     function getdata(){
//         fetch('http://localhost:4000/createUser')
//  }

// document.body.onload = getdata;

// //sikre at submit knap kan gøre som vi vil og ikke som default adfærd
// form.addEventListener('submit', function(e){
//     e.preventDefault();
// });

// // Sætter "item, til at være værdien af input fra useren og bruger dem senere"
// loginBtn.addEventListener('click', function(){
//     localStorage.setItem('brugernavn', usernameInput.value);
//     localStorage.setItem('fornavn', nameInput.value);
//     localStorage.setItem('efternavn', lastnameInput.value);
//     localStorage.setItem('alder', ageInput.value);
//     localStorage.setItem('beskrivelse', descrInput.value);
//     localStorage.setItem('kodeord', passCodeInput.value);
//     nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på

//-----------------FOR JSON-----------------------------------
    // let newUser = new User(firstname, lastname, description, password);
    //         uploadUser(newUser);
        
// });

// -------------- Hva der skal slettes ved logout.-----------
// logoutBtn.addEventListener('click', function(){
//     localStorage.removeItem('brugernavn');
//     localStorage.removeItem('fornavn');
//     localStorage.removeItem('efternavn');
//     localStorage.removeItem('alder');
//     localStorage.removeItem('beskrivelse');
//     localStorage.removeItem('kodeord');
//     nameDisplayCheck() //køre denne funktion hver gang knappen trykkes på
// });

//------------------ved tryk på submit user  kør denne funktion--------------
// function nameDisplayCheck(){
//     if(localStorage.getItem('fornavn')){
//         let mail = localStorage.getItem('brugernavn');
//         let firstname = localStorage.getItem('fornavn');
//         let lastname = localStorage.getItem('efternavn');
//         let age = localStorage.getItem('alder');
//         let description= localStorage.getItem('beskrivelse');
//         let password = localStorage.getItem('kodeord');
//         h1.textContent = "Velkommen "+ firstname  + " " +lastname;
//         personalGreeting.textContent = "Velkommen til vores hjemmeside " + firstname;
//         personalInfo.textContent = " Her er lidt info om dig " + firstname + " : Din alder er " + age + ", din mail er:  " + mail + ".  " +  ". Dit valgte kodeord er: " + password;
//         logoutDiv.style.display = 'block';
//         loginDiv.style.display = 'none';


        // const option = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        // }, 
        // body: JSON.stringify(user),
        
        // };    
        // //console.log(user);
        // fetch('http://localhost:4000/createUser', option).then(response => {
        //     console.log(response);
        // });
        // function fetchUser(user){
            
        // fetch('http://localhost:4000/createUser').then( response => {
        //     console.log(response);
        // })

        // }
        // fetchUser();

            // method: 'POST', // or 'PUT'
            // headers: {
            //         'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({username: submit.mail, firstname: submit.firstname, lastname: submit.lastname, age: submit.age, description: submit.description, password: submit.password}),
            // })
            // .then(response => response.json())
            // .then(data => {
            // console.log('Success:', data);
                
            // })
            // .catch((error) => {
            // console.error('Error:', error);
            // });
    

            //    return response.json();
                
        
            // ).then(data => {
            //     console.log(data);
            // });
            
       
//         //hvis ikke den eksistere
//     } else {
//         h1.textContent = "Velkommen stranger";
//         personalGreeting.textContent = "Du er ikke logget ind endnu"
//         personalInfo.textContent = "Vi har ingen info om dig, Opret en bruger eller login"
//         logoutDiv.style.display = 'none';
//         loginDiv.style.display = 'block';
//     }
// }

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
// document.body.onload = nameDisplayCheck;
