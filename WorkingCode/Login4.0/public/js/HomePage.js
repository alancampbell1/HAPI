//Stores the email variable from the SignIn or SignUp html pages
var userEmail = localStorage.getItem("vOneLocalStorage");

/*
 * The following gets the email address entered by the user that has brought them to this page and
 * checks to see if the user is logged in. If so, a message is printed to the console, else the user
 * is not signed in and is therefore re-directed back to the Login Options HMTL page.
 */

function checkLogin() {
  document.getElementById("demo").innerHTML = userEmail;
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    //This function checks to see if the user is logged in or not
    if (user) {
                console.log('The user is signed in');
                //console.log(user);
              } 
              else {
                    console.log('The user is signed out');
                    window.location='LoginOptions';
              }
  });
}

/*
 * The purpose of the following function is to create a welcome greeting to the user once logged,
 * to print their username. This is achieved by linking their email to their username in the Firebase
 * Database child specific to staff details and pull back the corresponding one.
 */

var sample;
var correctUsername = "";

  function getDetails(){
    var database = firebase.database();
    var leadsRef = database.ref('userRecords');
	    leadsRef.on('value', function(snapshot) {
    	    snapshot.forEach(function(childSnapshot) {
     		    var childData = childSnapshot.val();
            sample = childData.email;
            //console.log(childData.username);
            if(sample == userEmail){
                  correctUsername = childData.username;
            }
    		  });
         console.log(correctUsername);
         document.getElementById("demo2").innerHTML = correctUsername;

         changeColourScheme(correctUsername);
		  });
  }
  
/* 
 * This function can extract the title of the username from the Firebase database and dynamically
 * change their page styling accordingly. This helps indicate who is signed in or not.
 */

function changeColourScheme(correctUsername){
  //console.log("The actual answer " + correctUsername);
  var res = correctUsername.split(" ");
  //console.log(res[0]);

  //This conditional recognises if you are a Doctor or a nurse and adjusts the CSS appropriately
  if(res[0] == "Dr" || res[0] == "Doctor"){
      console.log("You are a Doctor");
      //document.getElementById("demo").style.color = "red";
      //document.getElementById("demo2").style.color = "red";
      var el = document.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = "/css/DocHome.css";
      document.getElementsByTagName("head")[0].appendChild(el);
  }
  else if(res[0] == "Nurse" || res[0] == "Nr"){
      console.log("You are a Nurse");
      //document.getElementById("demo").style.color = "blue";
      //document.getElementById("demo2").style.color = "blue";
      var el = document.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = "/css/NurseHome.css";
      document.getElementsByTagName("head")[0].appendChild(el);
  }
  else{
      console.log("You are a visitor");
      var el = document.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = "/css/main.css";
      document.getElementsByTagName("head")[0].appendChild(el);
  }
}

/*
 * This is a function that allows the user to print the HTML using an installed printer.
 */

function forprint(){
if (!window.print){
  return
  }
  window.print()
}

/*
 * This function pulls back the image uploaded to Firebase Storage associated with the user.
 * This image is stored in the 'staff' folder in Firebase Storage
 *
 */

function showimage() {
         var storageRef = firebase.storage().ref();
         var spaceRef = storageRef + 'staff/' + userEmail;
         console.log(spaceRef);
         var spaceRef = storageRef.child('staff/' + userEmail);
         console.log(spaceRef);
         storageRef.child('staff/' + userEmail).getDownloadURL().then(function(url) {
             var test = url;
             //alert(url);
             console.log(url);
             document.querySelector('img').src = test;

        }).catch(function(error) {
  });
}
