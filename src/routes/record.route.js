const express = require("express");
const uploadAttachments = require("../lib/upload-attachments");
const auth = require("../middlewares/auth.middleware");
const fileUploader = uploadAttachments.array("file");
const {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  updateRecordAttachments,
  removeRecordAttachments,
} = require("../usecases/record.usecase");
const { createAttachment } = require("../usecases/attachment.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const record = await createRecord(body);
    response.status(201);
    response.json({
      success: true,
      data: { record },
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
    const record = await getRecord(params.id);
    response.json({
      success: true,
      data: { record },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", fileUploader, async (request, response) => {
  const { params, body } = request;
  const { deleted, ...formData } = body;
  const files = request.files;
  try {
    let attachmentsArr = files.map((file) => {
      return createAttachment({
        date: new Date(),
        title: file.originalname,
        type: file.mimetype,
        url: file.location,
      });
    });
    let attachments = await Promise.all(attachmentsArr);
    let record = await updateRecord(params.id, formData);
    const recordA = await updateRecordAttachments(params.id, attachments);
    if (deleted) record = await removeRecordAttachments(params.id, deleted);
    response.json({
      success: true,
      data: {
        record,
      },
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
    const record = await deleteRecord(params.id);
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

router.post("/:id/attachments", async (request, response) => {
  const { body, params } = request;

  try {
    const attachment = await createAttachment(body);
    const record = await updateRecordAttachments(params.id, attachment._id);
    response.status(201);
    response.json({
      success: true,
      data: { record, attachment },
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
