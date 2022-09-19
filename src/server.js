const express = require("express");
const cors = require("cors");

const app = express();

//Routes

const routerPets = require("./routes/pet.route");
const routerAppt = require("./routes/appointment.route");
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");


//JSON Middleware
app.use(cors());
app.use(express.json());

app.use("/pets", routerPets);
app.use("/appointments", routerAppt);
app.use("/users", routerUser);
app.use("/auth", routerAuth);

//Export
module.exports = app

