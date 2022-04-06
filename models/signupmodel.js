const mongoose = require('mongoose')

const passportLocalmongoose = require('passport-local-mongoose')

const signupSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true
    },
    lastName: {
        type:String,
        required:true,
        trim:true
    },
    phoneNumber: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
});

signupSchema.plugin(passportLocalmongoose, {
    usernameField: "email",
  });
const signup = module.exports = mongoose.model('signup', signupSchema  );