// Endpoint
const express = require("express");

const { createPet, getPet, updatePet, deletePet } = require("../usecases/pet.usecase");

const router = express.Router();

//Create
router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const pet = await createPet(body);
        response.status(201)
        response.json({
            success: true,
            data: {pet}
        });
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: error.message
        });
    }    
});

//Get Pet by ID
router.get("/:id", async (request, response) => {
    try {
        // Path params
        const { params } = request;
        const pet = await getPet(params.id);
        response.json({
            success: true,
            data: { pet }
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.message
        });
    }
});

//Update
router.patch("/:id", async (request, response) => {
    try {
        const { params, body } = request
        const pet = await updatePet(params.id, body)

        response.json({
            success: true,
            data: {
                pet
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
});

// Delete Pet 
router.delete("/:id", async (request, response) => {
    try{
      const { params } = request
      const pet = await deletePet(params.id)
      response.json({
        success: true,
      })
  
    }catch(error){
      response.status(400)
      response.json({
        success: false,
        message: error.message
      })
    }
});


//Export
module.exports = router;// Endpoints