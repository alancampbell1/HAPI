//This file works as the server. It runs on port 8080. 

//The initial server needed the following dependencies installed. This can be done in the terminal
var express = require('express');
var app = express();
var port = 8080;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//setting our static files: css, js etc
app.use(express.static(__dirname + '/public'));

//route our app
var router = require('./app/routes');
app.use('/', router);

//Start the server
app.listen(port, function(){
	console.log('app started');
});

app.get('/email', (req, res) => {
  res.render('contact');
});

///////////The following code is concerned with nodemailer//////////////////

//First we must install the following dependencies, body-parser, handlebars, nodemailer from the terminal

app.get('/email', (req, res) => {
  res.render('contact');
  console.log(req.body.sampleText);
});

//you can send sample
var sample = "Hello World";

app.post('/send', (req, res) => {


  //The following variable, takes all the code from the email html page and uses body-parser to format it 
  const output = `
    <p>HAPI Team Update</p>
    <h3>Patient Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Hospital: ${req.body.company}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    //TODO: Get Sample Text to pick up the contents in the HTML

  	//This variable stores the email address inputted by the user
    const userEmail = `${req.body.email}`;

    //This function sets up the initial email address from which content is sent from.
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'XXXXX@gmail.com',		//You will need to add your own email address here
        pass: 'xxxxx'						//You will need to provide your password in order for nodemailer
      },											//to send content from
      tls: {
        rejectUnauthorized: false
      }
    });

    let HelperOptions = {							          //This variable formats the data in the output email and sets
      from: '"HAPI Team" <TeamHAPI@MaynoothUni',			  //the correct email data 
      to: userEmail,
      subject: 'Welcome to HAPI',
      text: 'This was sent from NodeJS',
      html: output
    };

      transporter.sendMail(HelperOptions, (error, info) => {	//This section deals with if the message was sent or not
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");					//Informs us if the message was sent
        console.log(info);										//Prints additional information
      });
  });
