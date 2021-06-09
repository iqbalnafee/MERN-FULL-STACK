const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }



});

module.exports = User = mongoose.model('user',userSchema); //1st parameter is the model name
//Mongoose automatically looks for the plural, lowercased version of your model name...hence table name will be 'users' in mongodb