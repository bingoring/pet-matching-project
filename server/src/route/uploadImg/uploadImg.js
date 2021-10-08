const express = require("express");
const { uploadFileManage } = require("../../config/upload.config");
const uploadImg = require("../../lib/upload");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("uploadImg");
});

router.post("/", uploadImg.single("img"), async (req, res) => {
    const file_id = req.upload.uuid;
    uploadFileManage[file_id] = req.file;
    res.send({ code: 200, file_id: file_id });
});

module.exports = router;
