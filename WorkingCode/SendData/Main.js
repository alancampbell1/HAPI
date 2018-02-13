// Initialize Firebase
var config = {
    apiKey: "AIzaSyAey-jFFUjHkVV_S4tlXZn6bnVKTdACjHA",
    authDomain: "contactform-9da8f.firebaseapp.com",
    databaseURL: "https://contactform-9da8f.firebaseio.com",
    projectId: "contactform-9da8f",
    storageBucket: "contactform-9da8f.appspot.com",
    messagingSenderId: "900426040550"
  };
  firebase.initializeApp(config);


// Reference messages collection
var messagesRef = firebase.database().ref('patientRecords');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var age = getInputVal('age');
  var email = getInputVal('email');
  var address = getInputVal('address');
  var phone = getInputVal('phone');
  var illness = getInputVal('illness');
  var addnotes = getInputVal('addnotes');

  // Save message
  saveMessage(name, age, email, address, phone, illness, addnotes, rate_Values, lat, lng);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

//Used to store checked box value
var rate_Values;

//Used to store lat and long
var lat = "";
var lng = "";


// Save message to firebase
function saveMessage(name, age, email, address, phone, illness, addnotes, rate_Values, lat, lng){

//stores the current checked box
rate_Values = document.querySelector('input[name="check"]:checked').value;


var location = document.getElementById('address').value;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyA4VZn2_lSvHE9-PCzbTVrw4QTX7_Svp_Q'
        }
      })
      .then(function(response){

        var formattedAddress = response.data.results[0].formatted_address;

        // Address Components
        //var addressComponents = response.data.results[0].address_components;

        // Geometry
        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
        var fullAddress = formattedAddress;

        //console.log(lat);
        //console.log(lng);
        //console.log(fullAddress);

        var newMessageRef = messagesRef.push();
          newMessageRef.set({
            name: name,
            age:age,
            email:email,
            address:address,
            illness:illness,
            addnotes: addnotes,
            rate_Values: rate_Values,
            lat: lat,
            lng: lng
  });

      })
      .catch(function(error){
        console.log(error);
    });
/*
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    age:age,
    email:email,
    address:address,
    illness:illness,
    addnotes: addnotes,
    rate_Values: rate_Values,
    lat: lat,
    lng: lng
  });
  */
}
