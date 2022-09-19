// Endpoint
const express = require("express");

const { createAppointment, getAppointment, updateAppointment, deleteAppointment } = require("../usecases/appointment.usecase");
const { updatePetAppointments, getAppointmentsbyPetID } = require("../usecases/pet.usecase");

const router = express.Router();

//Create
router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const appt = await createAppointment(body);
        response.status(201);
        response.json({
            success: true,
            data: {appt}
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

//Add apointment by Pet ID
router.post("/pet/:id", async (request, response) => {
    const { body, params } = request;
    
    try{
        const appt = await createAppointment(body);        
        //Update pet with appt ID
        const pet = await updatePetAppointments(params.id, appt._id)
        response.status(201);
        response.json({
            success: true,
            data: {appt, pet}
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

//Get Appt by ID
router.get("/:id", async (request, response) => {
    try {
        // Path params
        const { params } = request;
        const appt = await getAppointment(params.id);
        response.json({
            success: true,
            data: { appt }
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.message
        });
    }
});

//Get Appointments by Pet ID
router.get("/pet/:id", async (request, response) => {
    try {
        // Path params
        const { params } = request;
        const appt = await getAppointmentsbyPetID(params.id);
        response.json({
            success: true,
            data: { appt }
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
        const appt = await updateAppointment(params.id, body)

        response.json({
            success: true,
            data: {
                appt
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
      const appt = await deleteAppointment(params.id)
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