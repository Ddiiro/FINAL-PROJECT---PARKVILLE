const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check,validationResult} = require('express-validator');

// router.use(expressValidator);

// requiring our schema
const signup = require('../models/signupmodel');
// const { check } = require('express-validator');
// const signup = require('../models/signupmodel');

// handling the sign up route for get
router.get('/signup', (req, res) => {
    res.render('signup');
});

// posting using catch, async and await

router.post('/signup',
[
    check("firstName").notEmpty().withMessage('First name is required.'),
    check("lastName").notEmpty().withMessage('Last name is required.'),
    check("email").notEmpty().withMessage('Email is required.'),
    check("phoneNumber").notEmpty().withMessage('Phone number is required.'),
    check("password").notEmpty().withMessage('Password is required.')


 ], async (req, res) => {
   
    try {
        let newsignup = new signup({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            password:req.body.password

        });

        let errors = validationResult(req);
        if (errors) {
            res.status(400).json({errors:errors.array()})
        }

        let user = await signup.findOne({email:req.body.email});
        if(user){
            return res.status(400).send({message:'Registration failed!!, Email has already been used for registeration.'})
        }
        else{
            newsignup.save();
            res.status(201).send({message:"Success"}); 
    }
       
    } catch (err) {
        console.log(err)
        res.send('data entry failed.');
    }
});

// // Login form
// router.get('/login', function(req, res) {
//     res.render('login');
//   });
  
//   // Login process
//   router.post('/login', function(req, res){
//     passport.authenticate('local', { 
//       successRedirect: '/',
//       failureRedirect: '/login',
//       failureFlash: true
//     })(req, res);
//   });
  

//   // Logout form
//   router.get('/logout', function(req, res) {
//     req.logout();
//     req.flash('success', 'You are logged out');
//     res.redirect('/signup/login');
//   });


module.exports = router;