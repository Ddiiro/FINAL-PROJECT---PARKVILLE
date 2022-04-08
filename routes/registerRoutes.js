const express = require('express');
const router = express.Router();
const registerSchema = require('./../models/registermodel');


// importing our schema
const Client = require('../models/registermodel');

//working on our register validation
router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Check if the user is already in the db using the email as the unique identifer
    const receiptNoExists = await Client.findOne({ receiptNo: req.body.receiptNo });
  
    if (receiptNoExists) return res.status(400).send("Client has already been registered for this service");
  
  
    //create client user
    const client = new Client({
      name: req.body.name,
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
      res.send(savedClient);
      res.status(201).send({message:"Client has been registered for this service"}); 
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;