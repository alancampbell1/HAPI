var userEmail = localStorage.getItem("vOneLocalStorage");
var sample;
var correctUsername = "";

const numberInput = document.getElementById('number'),
	  textInput = document.getElementById('msg'),
	  button = document.getElementById('button'),
	  response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data){
	response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
})


function checkLogin() {
  //document.getElementById("demo").innerHTML = userEmail;
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
            document.getElementById("userInfo").innerHTML = correctUsername;
            permissions(correctUsername);
            //calls function to put firebase info into text box
            getPatientDetails();
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



/*
 * This function carries out the processing of taking the user's input and prepares it for sending via text message.
 */
function send(){
	const number = numberInput.value.replace(/\D/g, '');
	const text = textInput.value;

	fetch('/textMessage', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({number: number, text: text})
	})
	.then(function(res){
		console.log();
	})
	.catch(function(err){
		console.log(err);
	});
}

function getPatientDetails(){
  var x = document.getElementById("userInfo").innerHTML;
  console.log(x);
  document.getElementById('msg').value= x;
}
