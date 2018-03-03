//Two local variables are created to store email and username from the user's input. These will be sent to their own corresponding 
//Firebase database for further use in the application later on.
var email;
var username;

//var messagesRef = firebase.database().ref('userRecords');
//This function is designed to sign up the user to the Application
function handleSignUp() {
  var messagesRef = firebase.database().ref('userRecords');
  //The inputted data from the user is stored in the following variables
    email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    username = document.getElementById('username').value;
      //The following three conditionals are designed to make sure the user inputs the right type of information
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      if(username.length < 2){
        alert('Please enter a Username.');
        return;
      }
      /*
      var res = username.split(" ");
      console.log(res[0]);

      if(!res == "Dr" || !res == "Doctor" || !res == "Nr" || !res == "Nurse"){
        alert("Please include Doctor, Nurse, Dr or Nr in your username. Example: Doctor Campbell");
        return;
      }
    */
  //The following in-built Firebase functions are designed to create an account for a user and sign them in.
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
  });
  //This object links all the new user information and sends it to a specific table for user information
  var newMessageRef = messagesRef.push();
        newMessageRef.set({
        email: email,
        username:username
        });

      localStorage.setItem("vOneLocalStorage", email); 
    }
    //This function deals with user actions and checking if the user is signed in
function initApp() {
  //When the sign-up button is clicked an event listener is activated causing the handleSignUp function to be activated.
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    //The following checks if the user is already signed in
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){  
        //If so the home.html is opened
        window.location='Home';
        }
      });
    }
    //This function activates the initApp() function upon the launch of the page
     window.onload = function() {
      initApp();
    };
