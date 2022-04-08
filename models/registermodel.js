const mongoose = require('mongoose')
const Joi = require('joi')
const clientSchema = mongoose.Schema({
    name: {
        type:String,
        trim:true
    },
    receiptNo: {
        type:String,
        trim:true
    },
    phoneNo: {
        type:String,
        trim:true
    },
    time: {
        type:String,
        trim:true
    },
    date: {
      type: Date,
      trim:true
    },
    plateNo: {
      type:String,
      trim:true
  },
  ninNo: {
    type:String,
    trim:true
},
service: {
  type:String,
  trim:true
},
shift: {
  type:String,
  trim:true
},
detail: {
  type:String,
  trim:true
},
duration: {
  type:String,
  trim:true
},
price: {
  type:String,
  trim:true
},
});

const registerSchema = Joi.object({
    name:Joi.string().min(5).max(20).required(),
    receiptNo:Joi.string().min(5).max(20).required(),
    phoneNo:Joi.string().min(5).max(20).required(),
    time:Joi.string().required(),
    date:Joi.string().required(),
    plateNo:Joi.string().min(3).max(20).required(),
    ninNo:Joi.string().min(3).max(20).required(),
    service:Joi.string().min(3).max(20).required(),
    shift:Joi.string().min(3).max(20).required(),
    detail:Joi.string().min(8).max(30).required(),
    duration:Joi.string().min(8).max(20).required(),
    price:Joi.string().min(8).max(20).required(),
});

module.exports = mongoose.model('Client', clientSchema);