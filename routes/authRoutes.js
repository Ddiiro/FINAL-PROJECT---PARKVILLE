const express = require('express');
const router = express.Router();
const signupSchema = require('./../models/userModel');
const loginSchema = require('./../models/userModel');

// importing our schema
const User = require('../models/userModel');

router.post("/signup", async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Check if the user is already in the db
    const emailExists = await User.findOne({ email: req.body.email });
  
    if (emailExists) return res.status(400).send("Email already exists");
  
  
    //create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
  
    try {
      const savedUser = await user.save();
      res.send(savedUser);
      res.status(201).send({message:"Success"}); 
    } catch (err) {
      res.status(400).send(err);
    }
  });

//   working on our login
  router.post('/login', async (req, res) =>{
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
//check email
    if (!user) return res.status(400).send("User doesn't exist");
    
//check password
if (!req.body.password === user.password) return res.status(400).send("Email or password is wrong");
return res.status(200).send({message:"Successfully logged in"}); 

})


    

  module.exports = router;