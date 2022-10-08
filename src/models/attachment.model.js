const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String
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