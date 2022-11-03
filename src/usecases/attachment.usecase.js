const Attachment = require("../models/attachment.model");
const bcrypt = require("bcrypt");

const createAttachment = async (attachmentData) => {
    const attachment = Attachment.create(attachmentData);
    return attachment;
}

const getAttachment = (id) => {
    const attachment = Attachment.findById(id)
    return attachment;
}

const updateAttachment = async (id, attachmentData) => {
    const attachment = Attachment.findByIdAndUpdate(id, attachmentData, { returnDocument: "after" });
    return attachment;
}
   
const deleteAttachment = (id) => {
    const attachment = Attachment.findByIdAndDelete(id);
    return attachment;
}
   

module.exports = { createAttachment, getAttachment, updateAttachment, deleteAttachment }