//Two local variables are created to store email and username from the user's input. These will be sent to their own corresponding 
//Firebase database for further use in the application later on.
var email;
var username;
var user;
var selectedFile;
var GUID;

//var messagesRef = firebase.database().ref('userRecords');

/*
 * This function is designed to sign up the user to the Application, storing their email and password to
 * the Firebase Authentication and storing their email, username and unique ID to Firebase Database under 'Users'
 */
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
      
      if( document.getElementById("file").files.length == 0 ){
          alert('Please enter a PhotoID');
          console.log("no files selected");
          return;
      }

      var fileInput = document.getElementById("file");
      var filePath = fileInput.value;
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        //fileInput.value = '';
        return;
    }

      /*
       * This block of code checks the users entry and makes sure they enter their title
       */
      var res = username.split(" ");
      console.log(res[0]);
      if(res[0] == "Dr" || 
        res[0] == "Dr." || 
        res[0] == "dr" || 
         res[0] == "Doctor" || 
         res[0] == "Nr" || 
         res[0] == "Nurse" ||
         res[0] == "nr" || 
         res[0] == "Nr."){}

      else {
        alert("Please include Doctor, Nurse, Dr or Nr in your username. Example: Doctor Campbell");
        return;
      }

    
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
        username:username,
        GUID: GUID
        });

      localStorage.setItem("vOneLocalStorage", email); 
    }

/*
 * The following functions create a unique ID code for each user that signs up and will be stored in Firebase
 * Database
 */
function createGuid() {
  GUID = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}    

/*
 * This function takes the uploaded image file from the user and stores it in Firebase Storage
 * under the 'staff' folder with the ID of their email for future reference.
 */
function confirmUpload() {
  email = document.getElementById('email').value;
    selectedFile = document.getElementById("file").files[0];
    //var uploadTask = firebase.storage().ref().child('/staff/').put(selectedFile, metadata);
    var uploadTask = firebase.storage().ref('/staff/' + email);
    uploadTask.put(selectedFile);
}

    //This function deals with user actions and checking if the user is signed in
function initApp() {
  //When the sign-up button is clicked an event listener is activated causing the handleSignUp function to be activated.
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    //The following checks if the user is already signed in


  firebase.auth().onAuthStateChanged(function(user) {
      if(user){

        //If so the home.html is opened
        //window.location='Home';

        //We delay the loading of the Home.html to allow the data and images to be processes by Firebase
        //on initial setup
        setTimeout(function(){
    		  window.location='Home';
		    }, 5000);
      }
  });
}

    //This function activates the initApp() and createGUID functions upon the launch of the page
     window.onload = function() {
      initApp();
      createGuid();
    };
