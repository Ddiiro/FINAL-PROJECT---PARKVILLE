const express = require('express');
const router = express.Router();

const Client = require('../models/registermodel');

router.get('/dashboard', async (req, res) => {
    try{
        const receipts = await Client.find();
        // res.status(200).send({message:'Success', receipts});

        const batteryReceipts = [];
        const tyreReceipts = [];
        const parkingReceipts = [];

        let batteryPrice = 0;
        let tyrePrice = 0;
        let parkingPrice = 0;

        receipts.forEach(customer => {
            const service = customer.service;
            const price = parseInt(customer.price, 10) || 0;
            if (service==='battery'){
                batteryReceipts.push(customer);
                batteryPrice = batteryPrice + price;
            }
            if (service==='tyre'){
                tyreReceipts.push(customer);
                tyrePrice = tyrePrice + price;
            }
            if (service==='parking'){
                parkingReceipts.push(customer);
                parkingPrice = parkingPrice + price;
            }
        })


        res.render('dashboard', { batteryReceipts,tyreReceipts,parkingReceipts,batteryPrice,tyrePrice,parkingPrice });
    }catch (err) {
        res.status(400).send({message:err.message})
    }
});

module.exports = router;