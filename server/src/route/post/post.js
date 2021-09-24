const express = require("express");
const DataPostManager = require("../../module/data/postManager");

const router = express.Router();

router.get("/", async (req, res) => {
    const postIndex = req.query?.postIndex;
    const postData = await DataPostManager.getPosts(Number(postIndex));

    if (postData === undefined) {
        res.json({ code: 500, message: "Failed to get post" });
    }
    return res.json({ code: 200, posts: postData });
});

router.post("/", (req, res) => {});

module.exports = router;
