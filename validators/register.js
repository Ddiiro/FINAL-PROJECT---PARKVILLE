const Joi = require('joi');

const registerSchema = Joi.object({
    fullName:Joi.string().min(5).max(20).required(),
    receiptNo:Joi.string().min(5).max(20).required(),
    phoneNo:Joi.string().min(5).max(20).required(),
    time:Joi.string().required(),
    date:Joi.string().required(),
    plateNo:Joi.string().min(3).max(20).required(),
    ninNo:Joi.string().min(3).max(20).required(),
    service:Joi.string().min(3).max(20).valid('parking','battery','tyre').required(),
    shift:Joi.string().min(3).max(20).required(),
    detail:Joi.string().min(8).max(30).required(),
    duration:Joi.string().min(8).max(20).required(),
    price:Joi.string().min(4).max(20).required(),
});

module.exports = {
    registerSchema
}