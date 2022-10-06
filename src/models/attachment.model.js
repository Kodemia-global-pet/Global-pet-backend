const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    }   
    
})

module.exports = mongoose.model("attachment", attachmentSchema);