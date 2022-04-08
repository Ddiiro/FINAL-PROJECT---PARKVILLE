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

const signupSchema = Joi.object({
    firstName:Joi.string().min(5).max(20).required(),
    lastName:Joi.string().min(5).max(20).required(),
    email:Joi.string().min(5).max(20).required().email(),
    phoneNumber:Joi.string().min(5).max(20).required(),
    password:Joi.string().min(8).max(20).required(),
});

const loginSchema = Joi.object({
    email:Joi.string().min(5).max(20).required().email(),
    password:Joi.string().min(8).max(20).required(),
});

module.exports = mongoose.model('User', userSchema);
