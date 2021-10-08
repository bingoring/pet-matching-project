const express = require("express");
const DataPostManager = require("../../module/data/postManager");
const moment = require("../../config/moment.config");
const path = require("path");
const jwtCheck = require("../../lib/jwt.auth");

const router = express.Router();

router.get("/postpage", (req, res) => {
    res.render("post");
});

router.get("/", jwtCheck.authChecker, async (req, res) => {
    const type = req.query?.type;
    const postData = await DataPostManager.getPosts(type);

    if (postData === undefined) {
        res.json({ code: 500, message: "Failed to get post" });
    }
    return res.json({ code: 200, posts: postData });
});

router.post("/", async (req, res) => {
    const postData = req.body?.postData;

    if (postData === undefined) {
        return res.json({ code: 500, message: "postData is not exists" });
    }

    if (postData?.type === undefined || postData?.title === undefined || postData?.content === undefined || postData?.creator_name === undefined || postData?.creator_id === undefined) {
        return res.json({ code: 500, message: "postData parameter is undefined" });
    }

    const result = await DataPostManager.createPost(postData);

    if (result === undefined) {
        return res.json({ code: 500 });
    }
    return res.json({ code: 200 });
});

router.put("/", async (req, res) => {
    const postData = req.body?.postData;

    if (postData?.postId === undefined) {
        return res.json({ code: 402, message: "post ID is undefined" });
    }

    const result = await DataPostManager.updatePost(postData);
    if (!result) {
        return res.json({ code: 500, message: "Failed to update post" });
    }
    return res.json({ code: 200 });
});

router.delete("/", (req, res) => {
    const postId = req.query?.post_id;
    if (postId === undefined) {
        return res.json({ code: 402, message: "post ID is undefined" });
    }
    const result = DataPostManager.deletePost(postId);
    if (!result) {
        return res.json({ code: 500, message: "Failed to delete post" });
    }
    return res.json({ code: 200 });
});
module.exports = router;
