//The Model component corresponds to all the data-related logic 
// that the user works with. This can represent either the data 
// that is being transferred between the View and Controller components 
// or any other business logic-related data. For example, 
// a Customer object will retrieve the customer information from the database, 
// manipulate it and update it data back to the database or use it to render data.

class User {
    constructor(firstname, lastname, mail, age, description, password){
        this.firstname;
        this.lastname;
        this.mail;
        this.age;
        this.description;
        this.password;
    }
};

