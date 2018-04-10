  var config = {
    apiKey: "AIzaSyAey-jFFUjHkVV_S4tlXZn6bnVKTdACjHA",
    authDomain: "contactform-9da8f.firebaseapp.com",
    databaseURL: "https://contactform-9da8f.firebaseio.com",
    projectId: "contactform-9da8f",
    storageBucket: "contactform-9da8f.appspot.com",
    messagingSenderId: "900426040550"
  };
  firebase.initializeApp(config);

function checkLogin() {
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
checkLogin();




// this sends all this data collected into the firebase underneath the patient id.
function sendNewRecord(Day) {
  var idVal = document.getElementById('userId').value;
  var day = "Day"+document.getElementById('Day').value;

  var d = new Date();
  var dateLevel = d;
  var time = ""+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

  var painLevel = document.getElementById('PL').value;
  var comments= document.getElementById('Comments').value;
  var tempature = document.getElementById('temp').value;
  var respiratory = document.getElementById('respiratory').value;
  var ivCheck = document.getElementById('iv').value;
  var WoundCheck= document.getElementById('wound').value;
  var nurseNumber = document.getElementById('nurseNumber').value;
  var intakeTime = document.getElementById('timeOfFluid').value;
  var typesOfFluid = document.getElementById('typesOfFluid').value;
  var outType = document.getElementById('outType').value;

  var painActivity = parseInt(document.getElementById('painActivity').value);
  var painRespiration = parseInt(document.getElementById('painRespiration').value);
  var painConciousness = parseInt(document.getElementById('painConciousness').value);
  var painCirculation = parseInt(document.getElementById('painCirculation').value);
  var painOxygenSaturation = parseInt(document.getElementById('painOxygen').value);
  var painDressing = parseInt(document.getElementById('painDressing').value);
  var painPain = parseInt(document.getElementById('painPain').value);
  var painAmbutation = parseInt(document.getElementById('painAmbutation').value);
  var painFastFeed = parseInt(document.getElementById('painFastFeed').value);
  var painUrineOutput= parseInt(document.getElementById('painUrineOutput').value);
  var verdict;
  var result = parseInt(painActivity+painRespiration+painConciousness+painCirculation+painOxygenSaturation+painDressing+
  painPain+painAmbutation+painFastFeed+painUrineOutput);
  if (result>=18){
    verdict="Discharge Patient at next Opportunity";
    alert(verdict);

  }
  else {
    verdict="Denied";
  }
  result=parseInt(result);

  var ref = firebase.database().ref().child('Patients').child(idVal).child("Records").child(day);

   ref.update({
                                Comments:comments,
                                Date:dateLevel,
                                Day:day,
                                PainLevels:painLevel,
                                Time:time,
                                Tempature:tempature,
                                RespitoryRate:respiratory,
                                IVCheck:ivCheck,
                                WoundCheck:WoundCheck,
                                NurseNo:nurseNumber,
                                IntakeTime:intakeTime,
                                IntakeFluid:typesOfFluid,
                                OutType:outType
  });

   var ref2 =firebase.database().ref().child('Patients').child(idVal).child("Records").child(day).child("PS");

   ref2.update({
          Activity:painActivity,
          Respiration:painRespiration,
          Circulation:painCirculation,
          Conciousness:painConciousness,
          OxygenSaturation:painOxygen,
          Dressing:painDressing,
          Pain:painPain,
          Ambutation:painAmbutation,
          Fast_Feed:painFastFeed,
          UrineOutput:painUrineOutput,
          Result:result,
          Verdict:verdict
   });
   //result=0;
}
