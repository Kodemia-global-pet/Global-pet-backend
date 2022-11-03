const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: [
      "Consulta",
      "Vacuna",
      "Desparacitación",
      "Estetica",
      "Otra",
      "Registro",
    ],
  },
  vet: {
    type: String,
  },
  other_info: {
    type: String,
  },
  attachments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "attachment" }],
  },
});

module.exports = mongoose.model("record", recordSchema);
