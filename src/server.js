const express = require("express");
const cors = require("cors");

const app = express();

//Routes
const routerPets = require("./routes/pet.route");
const routerAppt = require("./routes/appointment.route");

//JSON Middleware
app.use(cors());
app.use(express.json());

app.use("/pets", routerPets);
app.use("/appointments", routerAppt);

//Export
module.exports = app

