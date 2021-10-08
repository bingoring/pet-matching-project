const express = require("express");
const checkDuplicate = require("./checkDuplicate");

const router = express.Router();

router.use("/", checkDuplicate);

module.exports = router;
