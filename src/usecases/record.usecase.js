const Record = require("../models/record.model");

const createRecord = async (recordData) => {
  const record = Record.create(recordData);
  return record;
};

const getRecord = (id) => {
  const record = Record.findById(id).populate({
    path: "attachments",
    model: "attachment",
  });
  return record;
};

const updateRecord = (id, recordData) => {
  const record = Record.findByIdAndUpdate(id, recordData, {
    returnDocument: "after",
  });
  return record;
};

const deleteRecord = (id) => {
  const record = Record.findByIdAndDelete(id);
  return record;
};

const updateRecordAttachments = (id, attachmentID) => {
  const record = Record.findByIdAndUpdate(
    id,
    { $addToSet: { attachments: { $each: attachmentID } } },
    { returnDocument: "after" }
  );
  return record;
};

const removeRecordAttachments = (id, deleted) => {
  let deletedArr = deleted.split(",");
  const record = Record.findByIdAndUpdate(id, {
    $pull: {
      attachments: {
        $in: deletedArr,
      },
    },
  });
  return record;
};

module.exports = {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  updateRecordAttachments,
  removeRecordAttachments,
};
