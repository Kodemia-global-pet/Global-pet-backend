const Pet = require("../models/pet.model");

//Create
const createPet = async (petData) => {
  const pet = Pet.create(petData);
  return pet;
}

//Get Pet
const getPet = (id) => {
    const pet = Pet.findById(id);
    return pet;
}

//Get Pet Appointments
const getAppointmentsbyPetID = (id) => {
    const appt = Pet.findById(id).populate('appointments');   
    console.log(appt)
    return appt;
}

//& Update pet
const updatePet = (id, petData) => {
    const pet = Pet.findByIdAndUpdate(id, petData, { returnDocument: "after" })
    return pet;
}
const updatePetAppointments  = (id, apptID) => {
    const pet = Pet.findByIdAndUpdate(id, { $addToSet: { appointments : apptID  } }, { returnDocument: "after" })
    return pet;
}

//& Delete pet
const deletePet = (id) => {
    const pet = Pet.findByIdAndDelete(id)
    return pet;
}

module.exports = { createPet, getPet, updatePet, deletePet, updatePetAppointments, getAppointmentsbyPetID }