// Endpoint
const express = require("express");
const auth = require ("../middlewares/auth.middleware");

const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
} = require("../usecases/user.usecase");

//Haciendo router
const router = express.Router();

//router
//router.use(auth); solo se usa si aplica para todos los endpoints

//Create
router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const user = await createUser(body);
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


router.get("/:id", async(request,response) =>{
    try{
        const { params } = request
        const user = await getUser(params.id)
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
router.patch("/:id", auth, async (request,response) =>{
    try{
        const { params, body } = request
        const user = await updateUser(params.id, body)
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
router.delete("/:id", auth, async(request,response) =>{
    try{
        const { params } = request
        const user = await deleteUser(params.id)
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