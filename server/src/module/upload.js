const multer = require("multer");
var path = require("path");
const moment = require("../config/moment.config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(appRoot, "static"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//const upload = multer({
//    dest: path.join(appRoot, "static"),
//})
module.exports = upload;
