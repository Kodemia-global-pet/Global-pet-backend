const mongoose = require("mongoose");
//const { StringDecoder } = require("string_decoder");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: "Email address is required",        
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
        ],
    },
    password:{
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    zip_code:{
        type: String,
    },
    photo:{
        type: String,
    } ,
    phone_number: {
        type: String,
    },
    pets:{
        type: [String]
    } 
})

module.exports = mongoose.model("user", userSchema);