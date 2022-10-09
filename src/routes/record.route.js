const express = require("express");

const { createRecord, getRecord, updateRecord, deleteRecord, updateRecordAttachments } = require("../usecases/record.usecase");
const { createAttachment } = require("../usecases/attachment.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
    const { body } = request;
    try{
        const record = await createRecord(body);
        response.status(201);
        response.json({
            success: true,
            data: {record}
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

router.get("/:id", async (request, response) => {
    try {
        const { params } = request;
        const record = await getRecord(params.id);
        response.json({
            success: true,
            data: { record }
        });
    } catch (error) {
        response.status(400);
        response.json({
            success: false,
            message: error.message
        });
    }
});

router.patch("/:id", async (request, response) => {
    try {
        const { params, body } = request
        const record = await updateRecord(params.id, body)

        response.json({
            success: true,
            data: {
                record
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

router.delete("/:id", async (request, response) => {
    try{
      const { params } = request
      const record = await deleteRecord(params.id)
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

router.post("/:id/attachments", async (request, response) => {
    const { body, params } = request;
    
    try{
        const attachment = await createAttachment(body);   
        const record = await updateRecordAttachments(params.id, attachment._id)
        response.status(201);
        response.json({
            success: true,
            data: {record, attachment}
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

//Export
module.exports = router;// Endpoints