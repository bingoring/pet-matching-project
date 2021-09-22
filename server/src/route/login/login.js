const express = require("express");
const DataUserManager = require("../../module/data/userManager");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../public/login.html")); //내가안함 ... -> ejs 한번 고려
});

router.post("/", async (req, res) => {
    const user_id = req.body.user_id;
    const user_pwd = req.body.user_pwd;

    const loginToken = await DataUserManager.login(user_id, user_pwd);
    if (loginToken === undefined) {
        return res.json({ code: 500 });
    }
    return res.json({ code: 200, token: loginToken });
});

module.exports = router;