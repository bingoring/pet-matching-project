const express = require("express");
const post = require("./post");

const router = express.Router();

router.use("/", post);

module.exports = router;
