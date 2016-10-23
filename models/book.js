const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const BookSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required: true
    },
    description : {
        type : String
    },
    cover : {
        type : String,
        validate : {
            validator : (value)=>{
                return validator.isURL(value);
            },
            message : 'You have inserted an invalid url'
        }
    },
    read : {
        type : Boolean,
        required : true
    }
});

module.exports = mongoose.model('Book',BookSchema);