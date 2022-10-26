const express = require("express");
const auth = require("../middlewares/auth.middleware");
const uploadPhoto = require("../lib/upload-images");
const singleUploader = uploadPhoto.array("photo");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserPets,
} = require("../usecases/user.usecase");
const { createPet } = require("../usecases/pet.usecase");

const router = express.Router();

router.post("/", async (request, response) => {
  const { body } = request;
  try {
    const user = await createUser(body);
    response.status(201);
    response.json({
      success: true,
      data: {
        user,
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

router.get("/:id", async (request, response) => {
  try {
    const { params } = request;
    const user = await getUser(params.id);
    response.status(200);
    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", auth, async (request, response) => {
  try {
    const { params, body } = request;
    const user = await updateUser(params.id, body);
    response.status(200);
    response.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
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
    const user = await deleteUser(params.id);
    response.status(200);
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

router.post("/:id/pet", auth, singleUploader, async (request, response) => {
  const { body, params } = request;

  const files = request.files;
  const fileURL = files ? files[0]?.location : undefined;
  try {
    const pet = await createPet({
      ...body,
      photo: fileURL,
    });
    const user = await updateUserPets(params.id, pet._id);
    response.status(201);
    response.json({
      success: true,
      data: { user, pet },
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
