const express = require('express');
const router = express.Router();
const passport = require('passport');
const expressValidator = require('express-validator');
const mongoose = require('mongoose')

// router.use(expressValidator());

// requiring schema
const Register = require('../models/registermodel')

// handling the get route

router.get('/register', (req, res) => {
    res.render('register');
});

// route for posting
router.post('/register', (req, res) => {
    // declare variables that match your form input names
    // we assign them to req because we are requesting node js to forward data
    const name = req.body.name;
    const receipt = req.body.receipt;
    const phone = req.body.phone;
    const time = req.body.time;
    const date = req.body.date;
    const plateNo = req.body.plateNo;
    const ninNo = req.body.ninNo;
    const service = req.body.service;
    const shift = req.body.shift;
    const details = req.body.details;
    const duration = req.body.duration;
    const price = req.body.price;

    // // checking for errors/handling errors
    // Incase of an error send back the form
    const errors = req.validationErrors()
    if (errors) {
        res.render('register')
    }

    else {
        let newRegister = new Register({
            name:name,
            receipt: receipt,
            phone: phone,
            time: time,
            date: date,
            plateNo: plateNo,
            ninNo: ninNo,
            service: service,
            shift: shift,
            details: details,
            duration: duration,
            price: price,

        });
        // saving
        newRegister.save((err) => {
            if (err) {
                console.error(err);
                return;
            }
            else {
                req.flash('Great!!', 'Client added successfully.')
                console.log('Client has been successfully added');
                res.redirect('/dashboard')
            }
        })
    }

});

module.exports = router;