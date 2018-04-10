//Stores the email variable from the SignIn or SignUp html pages
var userEmail = localStorage.getItem("vOneLocalStorage");

/*
 * The following piece of JQuery causes the loading buffer to appear whilst
 * JavaScript prepares everything in the background and then disappears
 */

$('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
  $(window).on('load', function(){
    //$(document).ready(function() {
      setTimeout(removeLoader, 4000); //wait for page load PLUS two seconds.
  });
  function removeLoader(){
      $( "#loadingDiv" ).fadeOut(100, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove(); //makes page more lightweight 
      });  
  }

$(document).ready(function () {
          $("#bulk").hide();
          $("#bulk").delay(4000).fadeIn(0);
      });

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
         //console.log("The username is " + correctUsername);
         document.getElementById("demo2").innerHTML = correctUsername;
         changeColourScheme(correctUsername);

         var usertitle = correctUsername.split(" ");

         //The block of code turns button visibility off depending on who is logged in
         if(usertitle[0] == "Dr" || usertitle[0] == "Doctor" || usertitle[0] == "Dr." || usertitle[0] == "dr"){
              console.log("accessed Doctor value");
          }
          else if(usertitle[0] == "Nurse" || usertitle[0] == "Nr"|| usertitle[0] == "nr" || usertitle[0] == "Nr."){
              console.log("accessed Nurse value");
              document.getElementById("SendEmail").style.visibility="hidden";
              document.getElementById("SendTextMessage").style.visibility="hidden";
              document.getElementById("printPage").style.visibility="hidden";
          }    
          else{
              console.log("accessed Visitor value");
              document.getElementById("SendEmail").style.visibility="hidden";
              document.getElementById("SendTextMessage").style.visibility="hidden";
              document.getElementById("printPage").style.visibility="hidden";
          }    
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
  if(res[0] == "Dr" || res[0] == "Doctor" || res[0] == "Dr." || res[0] == "dr"){
      console.log("You are a Doctor");
      //document.getElementById("demo").style.color = "red";
      //document.getElementById("demo2").style.color = "red";
      var el = document.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = "/css/DocHome.css";
      document.getElementsByTagName("head")[0].appendChild(el);
  }
  else if(res[0] == "Nurse" || res[0] == "Nr" || res[0] == "nr" || res[0] == "Nr."){
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


/*
 * The purpose of this function is to pull in JSON data from the NewsAPI registered under my name and print it to the screen
 */


function letsgo() {
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('GET',
                'https://newsapi.org/v2/everything?sources=medical-news-today&apiKey=1b9be030d6904ef88bd1de4a86f31656',
                true);
            ourRequest.onload = function () {
              var concat = "";
                if (ourRequest.status >= 200 && ourRequest.status < 400) {
                    var ourData = JSON.parse(ourRequest.responseText);
                    
                    for(var i = 0; i < ourData.articles.length; i++){
                  console.log(ourData.articles[i].title);
                  concat += ourData.articles[i].title + " | ";
                }

                //document.getElementById('scrollingText').innerHTML = concat;
                //document.getElementById('sample1').innerHTML = ourData.articles[0].title;

                    console.log(ourData.articles[0].url);
                    var link = ourData.articles[0].url;
                    var myText = ourData.articles[0].title;
                    document.getElementById("sample2").innerHTML = myText;
                    document.getElementById("sample2").setAttribute("href",link);

                    var link = ourData.articles[1].url;
                    var myText = ourData.articles[1].title;
                    document.getElementById("sample3").innerHTML = myText;
                    document.getElementById("sample3").setAttribute("href",link);

                    var link = ourData.articles[2].url;
                    var myText = ourData.articles[2].title;
                    document.getElementById("sample4").innerHTML = myText;
                    document.getElementById("sample4").setAttribute("href",link);

                    var link = ourData.articles[3].url;
                    var myText = ourData.articles[3].title;
                    document.getElementById("sample5").innerHTML = myText;
                    document.getElementById("sample5").setAttribute("href",link);

                    var link = ourData.articles[4].url;
                    var myText = ourData.articles[4].title;
                    document.getElementById("sample6").innerHTML = myText;
                    document.getElementById("sample6").setAttribute("href",link);

                    var link = ourData.articles[5].url;
                    var myText = ourData.articles[5].title;
                    document.getElementById("sample7").innerHTML = myText;
                    document.getElementById("sample7").setAttribute("href",link);

                    var link = ourData.articles[6].url;
                    var myText = ourData.articles[6].title;
                    document.getElementById("sample8").innerHTML = myText;
                    document.getElementById("sample8").setAttribute("href",link);

                    var link = ourData.articles[7].url;
                    var myText = ourData.articles[7].title;
                    document.getElementById("sample9").innerHTML = myText;
                    document.getElementById("sample9").setAttribute("href",link);

                    var link = ourData.articles[8].url;
                    var myText = ourData.articles[8].title;
                    document.getElementById("sample10").innerHTML = myText;
                    document.getElementById("sample10").setAttribute("href",link);

                    var link = ourData.articles[9].url;
                    var myText = ourData.articles[9].title;
                    document.getElementById("sample11").innerHTML = myText;
                    document.getElementById("sample11").setAttribute("href",link);

                    var link = ourData.articles[10].url;
                    var myText = ourData.articles[10].title;
                    document.getElementById("sample12").innerHTML = myText;
                    document.getElementById("sample12").setAttribute("href",link);

                } else {
                    console.log("We connected to the server, but it returned an error.");
                }
                //document.getElementById('scrollingText').innerHTML = concat;
            };
            ourRequest.onerror = function () {
                console.log("Connection error");
            };
            ourRequest.send();
    }
