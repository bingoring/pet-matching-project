const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");
const { tempFilePath } = require("../config/upload.config");
const { isExists } = require("../module/data/fileManager");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!isExists(tempFilePath)) {
            fs.mkdirSync(tempFilePath, { recursive: true });
        }
        cb(null, tempFilePath);
    },
    filename: (req, file, cb) => {
        req.upload = { uuid: uuid() };
        cb(null, req.upload.uuid);
    },
});
const upload = multer({ storage: storage });

module.exports = upload;
