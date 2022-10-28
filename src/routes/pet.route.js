const express = require("express");
const uploadAttachments = require("../lib/upload-attachments");
const auth = require("../middlewares/auth.middleware");
const uploadPhoto = require("../lib/upload-images");
const singleUploader = uploadPhoto.array("photo");
const fileUploader = uploadAttachments.array("file");

const {
  createPet,
  getPet,
  updatePet,
  deletePet,
  updatePetRecords,
  getRecordsbyPetID,
} = require("../usecases/pet.usecase");
const { createAttachment } = require("../usecases/attachment.usecase");

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

router.patch("/:id", auth, singleUploader, async (request, response) => {
  const { params, body } = request;
  const files = request.files;

  const fileURL = files ? files[0]?.location : undefined;
  try {
    const pet = await updatePet(params.id, { ...body, photo: fileURL });

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

router.delete("/:id", auth, async (request, response) => {
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

router.post("/:id/records", auth, fileUploader, async (request, response) => {
  const { body, params } = request;
  const files = request.files;
  try {
    let attachmentsArr = files.map((file) => {
      return createAttachment({
        date: new Date(),
        title: file.name,
        url: file.location,
      });
    });
    let attachments = await Promise.all(attachmentsArr);
    const record = await createRecord({
      ...body,
      attachments: attachments.map(({ _id }) => _id),
    });
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
