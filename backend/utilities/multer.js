const multer = require("multer");
const path=require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/images'));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    },
  });
  const upload = multer({ storage });

  module.exports=upload;