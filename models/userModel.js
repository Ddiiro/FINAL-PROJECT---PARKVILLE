const mongoose = require('mongoose')
const Joi = require('joi')
const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        trim:true
    },
    lastName: {
        type:String,
        trim:true
    },
    phoneNumber: {
        type:String,
        trim:true
    },
    email: {
        type:String,
        trim:true
    },
    password: {
        type:String,
        trim:true
    },
});

module.exports = mongoose.model('User', userSchema);
