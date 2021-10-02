const express = require("express");
const uploadImg = require("./uploadImg");

const router = express.Router();

router.use("/", uploadImg);

module.exports = router;
