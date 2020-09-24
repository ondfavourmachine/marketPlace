const aws = require("aws-sdk");
import multer from "multer";
const multers3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

// instantiate a storage
const s3 = new aws.S3();

// create upload using multer

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: "marketplace-v1",
    acl: "public-read",
    metadata: (req: any, file: any, cb: Function) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req: any, file: any, cb: Function) => {
      cb(null, Date.now().toString());
    }
  })
});

export default upload;
