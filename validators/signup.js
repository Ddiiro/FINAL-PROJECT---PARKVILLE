
const Joi = require('joi');

const signupSchema = Joi.object({
    firstName:Joi.string().min(2).max(20).required(),
    lastName:Joi.string().min(5).max(20).required(),
    email:Joi.string().min(5).max(20).required().email(),
    phoneNumber:Joi.string().min(5).max(20).required(),
    password:Joi.string().min(8).max(20).required(),
    confirmPassword:Joi.string().min(8).max(20).valid(Joi.ref('password')).required(),
});

module.exports = {
    signupSchema
}