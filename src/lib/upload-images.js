require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
  region: process.env.REGION_AWS,
});

const s3Config = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
  region: process.env.REGION_AWS,
  Bucket: process.env.BUCKET_NAME_AWS,
});

const multerS3ConfigPhoto = multerS3({
  s3: s3Config,
  bucket: process.env.BUCKET_NAME_AWS,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `photos/${new Date().toISOString()}-${file.originalname}`);
  },
});

function imageFilter(req, file, cb) {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const uploadPhoto = multer({
  storage: multerS3ConfigPhoto,
  imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

module.exports = uploadPhoto;
