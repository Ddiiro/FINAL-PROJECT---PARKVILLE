const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require ('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require ('cors')
const signup = require('./models/signupmodel')
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});


// Import database configurations
const config = require('./config/database');

// Importing Routes
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const signupRoutes = require('./routes/signupRoutes');
const dashboardRoutes = require('./routes/dashboardRoute');
// post route variable for my sign up form is similar to the get route variable 
// because they are in the same file


// Instantiating the app/server
const app = express();

// creating a connection between the controller and database
mongoose.connect(config.database)
const db = mongoose.connection
// checking if we've connected
db.once('open',()=>{
    console.log('Successfully connected to mongodb');
});

db.on('error', (err)=>{
console.error(err);
});+

// Setting up the view engine
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views')); 

// Setting directory for static files
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARE SECTION
// body Parser middleware section
// we are telling node to focus on information in the input fields
app.use(express.urlencoded({extended:false}));
// telling body parser to use json format
app.use (express.json());

// 
app.use(expressSession);
// initialise
app.use(passport.initialize());
// this creates a session when initialisation has taken place
app.use(passport.session());
app.use(cors())

passport.use(signup.createStrategy());
passport.serializeUser(signup.serializeUser());
passport.deserializeUser(signup.deserializeUser());


// EXPRESS MESSAGE MIDDLEWARE FLASH
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

  
// use imported routes
app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/', signupRoutes);
app.use('/', dashboardRoutes);


// For invalid routes as in if someone hits a non existent route.This should always be the last route after all other routes are excecuted.
// the message that appears in case someone searches for a route that doesnt exist on my server

app.get('*', (req, res) => {
  res.status(404).send('This is an invalid URL')
})

// server listening port

app.listen(4000,()=>{
    console.log('Parkville Server is running at port 4000')
});


