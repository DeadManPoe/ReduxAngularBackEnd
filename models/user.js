
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator : (value)=>{
                return validator.isEmail(value);
            },
            message : 'You have inserted an invalid email address'
        }

    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User',UserSchema);

