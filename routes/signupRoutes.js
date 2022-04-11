const express = require("express");
const router = express.Router();
const {signupSchema} = require('../validators/signup');


// importing our schema
const User = require("../models/userModel");

//working on our signup validation
router.post("/signup", async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Check if the user is already in the db using the email as the unique identifer
    const emailExists = await User.findOne({ email: req.body.email });
  
    if (emailExists) return res.status(400).send({meaasge:"Email already exists"});
  
  
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
      res.status(201).send({message:"Success", user:savedUser}); 
    } catch (err) {
      res.status(400).send(err);
    }
});

router.get('/signup', (req,res) => {
  res.render('signup');
});

module.exports = router;
