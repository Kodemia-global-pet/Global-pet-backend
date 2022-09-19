const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    vet: {
        type: String
    },    
    other_info: {
        type: String
    },
    attachment:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'document' }]
    }
})

module.exports = mongoose.model("appointment", appointmentSchema);