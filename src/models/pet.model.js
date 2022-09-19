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
    other_info: {
        type: String
    },
    appointments:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointment' }]
    }
})

module.exports = mongoose.model("pet", petSchema);
