//require express
var express = require('express');
var path = require('path');

//create our router object
var router = express.Router();

//export our router
module.exports = router;

//route for our home page
router.get('/', function(req, res){
	//res.send('hello World');
	res.sendFile(path.join(__dirname, '../SplashScreen.html'));
});
/*
//route for the about page
router.get('/about', function(req, res){
	res.send('about page');
});
*/
//route for the LoginOptions page
router.get('/LoginOptions', function(req, res){
	res.sendFile(path.join(__dirname, '../LoginOptions.html'));
});

//route for the SignIn page
router.get('/SignIn', function(req, res){
	res.sendFile(path.join(__dirname, '../SignIn.html'));
});

//route for the SignUp page
router.get('/SignUp', function(req, res){
	res.sendFile(path.join(__dirname, '../SignUp.html'));
});

//route for the Home page
router.get('/Home', function(req, res){
	res.sendFile(path.join(__dirname, '../Home.html'));
});

router.get('/email', function(req, res){
	res.sendFile(path.join(__dirname, '../email.html'));
});

router.get('/textMessage', function(req, res){
	res.sendFile(path.join(__dirname, '../textMessage.html'));
});
/*
router.get('/uploadImages', function(req, res){
	res.sendFile(path.join(__dirname, '../uploadImages.html'));
});*/

router.get('/newPatient', function(req, res){
	res.sendFile(path.join(__dirname, '../newPatient.html'));
});

router.get('/newRecord', function(req, res){
	res.sendFile(path.join(__dirname, '../newRecord.html'));
});

router.get('/patients', function(req, res){
	res.sendFile(path.join(__dirname, '../patients.html'));
});


//router.get('/contact');
//router.post('/contact');
