const express = require("express");
const DataUserManager = require("../../module/data/userManager.js");
const router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    console.log("get register url");
    res.sendFile(path.join(__dirname, "../../../public/register.html"));
});

router.post("/", (req, res) => {
    const userId = req.body.user_id;
    const userPwd = req.body.user_pwd;
    const userName = req.body.user_name;

    console.log(`input value: ${userId}, ${userPwd}, ${userName}`);

    if (userId === undefined || userPwd === undefined || userName === undefined) {
        return res.json({ code: 410 });
    }

    if (!DataUserManager.register(userId, userPwd, userName)) {
        return res.json({ code: 500 });
    }

    return res.json({ code: 200 });
});

module.exports = router;
