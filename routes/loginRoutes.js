const express = require("express");
const router = express.Router();

const {loginSchema} = require('../validators/login');

const User = require("../models/userModel");

//working on our login validation
router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findOne({ email: req.body.email });
    //checking if the email exists in the database
    if (!user) return res.status(400).send("User doesn't exist");
  
    //checking if password is correct
    if (!req.body.password === user.password) {
      return res.status(400).send("Email or password is wrong");
    }
    console.log('user', user)
    res.redirect("/dashboard") ;
  });

  router.get('/login', (req,res) => {
    res.render('login');
  })
  module.exports = router;