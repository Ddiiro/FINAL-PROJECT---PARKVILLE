const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  receiptNo: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  plateNo: {
    type: String,
    required: true,
    trim: true,
  },
  ninNo: {
    type: String,
    required: true,
    trim: true,
  },
  service: {
    type: String,
    enum:['parking','battery','tyre'],
    required: true,
    trim: true,
  },
  shift: {
    type: String,
    required: true,
    trim: true,
  },
  detail: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
});

const register = module.exports = mongoose.model('Client', registerSchema );