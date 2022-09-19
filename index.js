//DB
//Server
//Route logic
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/server");

const {
    DB_USERNAME, 
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;
const PORT = process.env.PORT || 8080;
const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}`;

mongoose.connect(URL)
.then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
        console.log("Server listening...");
    });    
})
.catch((error) => {
    console.log("Error", error);
});