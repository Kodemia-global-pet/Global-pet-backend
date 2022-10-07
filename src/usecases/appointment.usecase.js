const Appointment = require("../models/appointment.model");

//Create
const createAppointment = async (petData) => {
  const pet = Appointment.create(petData);
  return pet;
}

//Get Appt
const getAppointment = (id) => {
    const appt = Appointment.findById(id);
    return appt;
}

//& Update Appt
const updateAppointment = (id, petData) => {
    const appt = Appointment.findByIdAndUpdate(id, petData, { returnDocument: "after" })
    return appt;
}

//& Delete Appt
const deleteAppointment = (id) => {
    const appt = Appointment.findByIdAndDelete(id)
    return appt;
}

const updateAppointmetAttachments  = (id, attachmentID) => {
    const appt = Appointment.findByIdAndUpdate(id, { $addToSet: { attachments : attachmentID  } }, { returnDocument: "after" })
    return appt;
}

module.exports = { createAppointment, getAppointment, updateAppointment, deleteAppointment, updateAppointmetAttachments }