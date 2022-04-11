const express = require('express');
const router = express.Router();
const {registerSchema} = require('../validators/register');


// importing our schema
const Client = require('../models/registermodel');

//working on our register validation
router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});
  
    //Check if the user is already in the db using the receipt number as the unique identifer
    const receiptNoExists = await Client.findOne({receiptNo: req.body.receiptNo});
  
    if (receiptNoExists) return res.status(400).send({meaasge:"User has already registered for this service"});
  
  
    //create new user
    const client = new Client({
        fullName:req.body.fullName,
        receiptNo:req.body.receiptNo,
        phoneNo:req.body.phoneNo,
        time:req.body.time,
        date:req.body.date,
        plateNo:req.body.plateNo,
        ninNo:req.body.ninNo,
        service:req.body.service,
        shift:req.body.shift,
        detail:req.body.detail,
        duration:req.body.duration,
        price:req.body.price,
    });
  
    try {
      const savedClient = await client.save();
      res.redirect("/dashboard") ; 
    } catch (err) {
      res.status(400).send({message:err});
    }
  });

router.get('/register', (req,res) => {
    res.render('register');
});

module.exports = router;