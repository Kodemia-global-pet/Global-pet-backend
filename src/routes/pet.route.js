const express = require("express");
const uploadAttachments = require("../lib/upload-attachments");
const auth = require("../middlewares/auth.middleware");

const {
  createPet,
  getPet,
  updatePet,
  deletePet,
  updatePetRecords,
  getRecordsbyPetID,
} = require("../usecases/pet.usecase");
const { createRecord } = require("../usecases/record.usecase");
const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const pet = await createPet(body);
    response.status(201);
    response.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { params } = request;
    const pet = await getPet(params.id);
    response.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const { params, body } = request;
    const pet = await updatePet(params.id, body);

    response.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { params } = request;
    const pet = await deletePet(params.id);
    response.json({
      success: true,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/:id/records", async (request, response) => {
  const { body, params } = request;

  try {
    const record = await createRecord(body);
    const pet = await updatePetRecords(params.id, record._id);
    response.status(201);
    response.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id/records", async (request, response) => {
  try {
    const { params } = request;
    const pet = await getRecordsbyPetID(params.id);
    response.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

//Export
module.exports = router; // Endpoints
