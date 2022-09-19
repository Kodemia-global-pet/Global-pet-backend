const express = require("express");
const { login } = require("../usecases/auth.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const token = await login(body.email, body.password);
        response.status(201)
        response.json({
            success: true,
            data: {
                token
            }
        });
    }
    catch(error){
        response.status(error.status || 500)
        response.json({
            success: false,
            message: error.message
        });
    }    
});

//Export
module.exports = router;