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

		});
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
