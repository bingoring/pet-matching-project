const express = require("express");
const uploadImg = require("../../module/upload");
const moment = require("../../config/moment.config")
const path = require("path");

const router = express.Router();

router.get("/", (req, res)=>{
    res.render('uploadImg');
})

router.post("/", uploadImg.single("img"), async (req, res) => {
    console.log("fileinfo: ", JSON.stringify(req.file));
    res.send({ code: 200, filename: moment().format("YYYY-MM-DD_HH") + "-" + req.file.originalname, });
});

module.exports = router;

