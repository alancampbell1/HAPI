var userEmail = localStorage.getItem("vOneLocalStorage");
var sample;
var correctUsername = "";

/*
 * This function pulls in all the data relating to the userRecords database on Firebase and returns
 * a specific piece of data relating to a user which will be displayed in the textarea and then forwarded
 * onto the user via email.
 */
function getDetails(){
    var database = firebase.database();
    var leadsRef = database.ref('userRecords');
	    leadsRef.on('value', function(snapshot) {
    	    snapshot.forEach(function(childSnapshot) {
     		    var childData = childSnapshot.val();
                sample = childData.email;
                //console.log(childData.username);
                //console.log(childData.email);
                //It picks out child relating to the user signed in email
                if(sample == userEmail){
                    //Picks out the username and assigns it to correctUsername
                    correctUsername = childData.username;
                }
     		    //console.log(childData);
    		});
            //console.log(sample);
            console.log(correctUsername);
            //sends the captured data to the Textarea box in the HTML
            document.getElementById("myTextarea").innerHTML = correctUsername;
            permissions(correctUsername);
		});
}

function permissions(correctUsername){
    var res = correctUsername.split(" ");
  //console.log(res[0]);

  //This conditional recognises if you are a Doctor or a nurse and adjusts the CSS appropriately
  if(res[0] == "Dr" || res[0] == "Doctor" || res[0] == "Dr." || res[0] == "dr"){
      console.log("You are a Doctor");
      //document.getElementById("demo").style.color = "red";
      //document.getElementById("demo2").style.color = "red";
      
  }
  else if(res[0] == "Nurse" || res[0] == "Nr" || res[0] == "nr" || res[0] == "Nr."){
      console.log("You are a Nurse");
      //document.getElementById("demo").style.color = "blue";
      //document.getElementById("demo2").style.color = "blue";
      window.location='Home';
      
  }
  else{
      console.log("You are a visitor");
      window.location='Home';
  }
}
