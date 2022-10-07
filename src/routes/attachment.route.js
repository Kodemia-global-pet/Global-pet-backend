const express = require("express");

const { createAttachment, getAttachment, updateAttachment, deleteAttachment } = require("../usecases/attachment.usecase");

const router = express.Router();

//Create
router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const user = await createAttachment(body);
        response.status(201)
        response.json({
            success: true,
            data: {
                user
            }
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

//Get attachment by ID
router.get("/:id", async(request,response) =>{
    try{
        const { params } = request
        const user = await getAttachment(params.id)
        response.status(200);
        response.json({
            success: true,
            data:({
                user,
            })
        })
    }catch(error){
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
    
});

//Update
router.patch("/:id", async (request,response) =>{
    try{
        const { params, body } = request
        const user = await updateAttachment(params.id, body)
        response.status(200)
        response.json({
            success: true,
            data:({
                user
            })
        })
    }catch(error){
        console.log(error)
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
    
});


//Delete
router.delete("/:id", async(request,response) =>{
    try{
        const { params } = request
        const user = await deleteAttachment(params.id)
        response.status(200)
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