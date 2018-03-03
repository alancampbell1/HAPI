//This function handles the Sign In.
function toggleSignIn() {
  //This conditional checks to see if the user is already logged in.
    if (firebase.auth().currentUser) {
        //If so then sign them out
        firebase.auth().signOut();
        } else {
          //The email and password inputted by the user are stored in two corresponding variables
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;

        //localStorage.setItem("email",email);

        //This conditional prompts the user to enter a email greater than 4 characters
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        //This conditional prompts the user to enter a password greater than 4 characters
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
          }
        // Sign in with email and pass.
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          //conditional executed if the passwords do not match, prompts the user that they entered the wrong password
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } 
          else {
            alert(errorMessage);  
          }
          console.log(error);
          document.getElementById('sign-in').disabled = false;
        });
      }
  document.getElementById('sign-in').disabled = true;
  //This local storage stores the email on the computer to display to the user
  localStorage.setItem("vOneLocalStorage", email); 
}


//This function is concerned with re-setting the password if incorrect
  function sendPasswordReset() {
    //Email input is stored in local variable
      var email = document.getElementById('email').value;
      //firebase library function called that sends an email to the address specified to reset it
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        alert('Password Reset Email Sent!');
          }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
            } 
          else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
      console.log(error);
  });
}

function initApp() {
      // Checks to see if the user is signed in or not
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //These two lines change the text in the buttons and text line depending on who is signed in or not
          document.getElementById('sign-in').textContent = 'Sign out';
          console.log('The user is signed in');

          //TODO: a return to the sign in page when signed in forces the user back to the home page.
          //
          window.location='Home';
        } 

        else {
          // User is signed out.
          document.getElementById('sign-in').textContent = 'Sign in';
          console.log('The user is signed out');
        }
        document.getElementById('sign-in').disabled = false;
      });

      //These two lines activates the two corresponding functions when clicked through an event listener
      document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
    }

    //This activates the initApp() function when the window is loaded
    window.onload = function() {
      initApp();
    };
