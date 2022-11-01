const Pet = require("../models/pet.model");

const createPet = async (petData) => {
  const pet = Pet.create(petData);
  return pet;
};

const getPet = (id) => {
  const pet = Pet.findById(id);
  return pet;
};

const getPetbyRecordID = (recordID) => {
  const pet = Pet.findOne({ records: { $in: [recordID] } });
  return pet;
};

const getRecordsbyPetID = (id) => {
  const record = Pet.findById(id).populate({
    path: "records",
    model: "record",
    populate: {
      path: "attachments",
      model: "attachment",
    },
  });
  return record;
};

const updatePet = (id, petData) => {
  const pet = Pet.findByIdAndUpdate(id, petData, { returnDocument: "after" });
  return pet;
};
const updatePetRecords = (id, recordID) => {
  const pet = Pet.findByIdAndUpdate(
    id,
    { $addToSet: { records: recordID } },
    { returnDocument: "after" }
  );
  return pet;
};

const deletePet = (id) => {
  const pet = Pet.findByIdAndDelete(id);
  return pet;
};

module.exports = {
  createPet,
  getPetbyRecordID,
  getPet,
  updatePet,
  deletePet,
  updatePetRecords,
  getRecordsbyPetID,
};
