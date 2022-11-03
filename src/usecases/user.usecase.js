const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);
  const user = User.create({ ...userData, password: hashPassword });
  return user;
};

const getUser = (id) => {
  const user = User.findById(id)
    .populate({
      path: "pets",
      model: "pet",
      populate: {
        path: "records",
        model: "record",
        populate: {
          path: "attachments",
          model: "attachment",
        },
      },
    })
    .select("-password");
  return user;
};

const updateUser = async (id, userData) => {
  if (userData.password) {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData = { ...userData, password: hashPassword };
  }

  const user = User.findByIdAndUpdate(id, userData);
  return user;
};

const deleteUser = (id) => {
  const user = User.findByIdAndDelete(id);
  return user;
};

const updateUserPets = (id, petID) => {
  const pet = User.findByIdAndUpdate(
    id,
    { $addToSet: { pets: petID } },
    { returnDocument: "after" }
  );
  return pet;
};

const getUserByPetID = (petID) => {
  const user = User.findOne({ pets: { $in: [petID] } });
  return user;
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserPets,
  getUserByPetID,
};
