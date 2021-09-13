const express = require("express");
const DataUserManager = require("../../module/data/userManager");
const router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../public/login.html"));
});

router.post("/", (req, res) => {
    const user_id = req.body.user_id;
    const user_pwd = req.body.user_pwd;
    const loginToken = DataUserManager.login(user_id, user_pwd);
    const loginTokenString = JSON.stringify(loginToken);
    console.log(`loginData: ${loginTokenString}`);
    if (loginToken === undefined) {
        return res.json({ code: 500 });
    }
    return res.json({ code: 200, token: loginToken });
});

module.exports = router;