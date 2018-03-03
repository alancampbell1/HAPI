//Stores the email variable from the SignIn or SignUp html pages
var userEmail = localStorage.getItem("vOneLocalStorage");


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
  
//This function is a test to see if you can extract the title of the user from Firebase and dynamically
//change their page styling accordingly
function changeColourScheme(correctUsername){
  console.log("The actual answer " + correctUsername);
  var res = correctUsername.split(" ");
  console.log(res[0]);

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
