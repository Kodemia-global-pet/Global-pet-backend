const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    breed: {
        type: String        
    },
    birthdate: {
        type: Date
    },
    size: {
        type: String,
        enum: ['xs','s','m','lg','xl','xxl']
    },
    feeding: {
        type: String
    },    
    activity_level: {
        type: String,
        enum: ['Low','Moderate','High']
    },
    allergies: {
        type: String
    },
    visibility_status: {
        type: String,
        enum: ['disabled','contact','record'],
        default: "disabled"
    },
    other_info: {
        type: String
    },
    records:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'record' }]
    }
})

module.exports = mongoose.model("pet", petSchema);
