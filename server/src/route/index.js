const express = require("express");
const auth = require("./auth");
const post = require("./post");
const register = require("./register");
const uploadImg = require("./uploadImg");
const checkDuplicate = require("./checkDuplicate");

const router = express.Router();

router.use("/auth", auth);
router.use("/post", post);
router.use("/register", register);
router.use("/checkDuplicate", checkDuplicate);
router.use("/uploadImg", uploadImg);

module.exports = router;
