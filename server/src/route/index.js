const express = require("express");
const auth = require("./auth");
const post = require("./post");
const register = require("./register");
const uploadImg = require("./uploadImg");

const router = express.Router();
const jwtAuth = require("../module/jwt.auth");

router.use("/auth", auth);
router.use("/post", post);
router.use("/register", register);
router.use("/uploadImg", uploadImg);

module.exports = router;
