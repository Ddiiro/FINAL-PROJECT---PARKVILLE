const Joi = require('joi');

const loginSchema = Joi.object({
    email:Joi.string().min(5).max(20).required().email(),
    password:Joi.string().min(8).max(20).required(),
});

module.exports = {
    loginSchema
}