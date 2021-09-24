const express = require("express");
const auth = require("./auth");
const post = require("./post");

const router = express.Router();
const jwtAuth = require("../module/jwt.auth");

router.use("/auth", auth);
router.use("/post", post);

module.exports = router;
