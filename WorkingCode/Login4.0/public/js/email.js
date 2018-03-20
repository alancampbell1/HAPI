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
		});
}
