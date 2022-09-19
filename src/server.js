const express = require("express");
const cors = require("cors");

const app = express();

//Routes
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");

//JSON Middleware
app.use(cors());
app.use(express.json());

app.use("/users", routerUser);
app.use("/auth", routerAuth);

//Export
module.exports = app