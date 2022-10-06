const mongoose = require("mongoose");
//const { StringDecoder } = require("string_decoder");

const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    last_name:{
        type: String,
        minlength: 3,
        maxlength: 100
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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pet' }]
    } 
})

module.exports = mongoose.model("user", userSchema);