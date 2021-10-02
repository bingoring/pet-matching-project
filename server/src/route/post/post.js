const express = require("express");
const DataPostManager = require("../../module/data/postManager");
const imgUpload = require("../../module/upload");
const moment = require("../../config/moment.config")
const path = require("path");

const router = express.Router();

router.get("/postpage", (req, res)=>{
    res.render('post');
})

router.get("/", async (req, res) => {
    const postIndex = req.query?.postIndex;
    const postData = await DataPostManager.getPosts(postIndex);

    if (postData === undefined) {
        res.json({ code: 500, message: "Failed to get post" });
    }
    return res.json({ code: 200, posts: postData });
});

router.post("/imgUpload", imgUpload.single("img"), async (req, res) => {
    console.log("fileinfo: ", JSON.stringify(req.file));
    res.send({ code: 200, filename: moment().format("YYYY-MM-DD_HH") + "-" + req.file.originalname, });
});

router.post("/", imgUpload.single("imagefile"), async (req, res) => {
    console.log("req.body: ", JSON.stringify(req.body));

    let body = JSON.parse(JSON.stringify(req.body));
    while (typeof body != "object") {
        body = JSON.parse(body);
    }
    
    if (!req.body) {
        res.status(400).send({ message: "no data!" });
    }
    console.log(body);
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

    let query = {
        POST_TYPE: body.type,
        POST_TITLE: body.title,
        POST_CONTENT: body.content,
        POST_CREATOR_NAME: body.creator_name,
        POST_CREATOR_ID: body.creator_id,
        POST_CREATE_TIME: nowDate,
    };
    //console.log("fileinfo: ", JSON.stringify(req.file));
    if (body.img) {
        query["POST_IMAGE"] =
        process.env.SERVER_HOST + "/api/images/" + body.img;
    }
    console.log("query: ", query);
    const uploadPostsResult = await DataPostManager.uploadPosts(query);
    if (uploadPostsResult === undefined) {
        return res.json({ code: 500 });
    }
    return res.json({ code: 200 });
});
/*
router.post("/", imgUpload.single("imagefile"), async (req, res) => {
    console.log("req.body: ", JSON.stringify(req.body));

    let body = JSON.parse(JSON.stringify(req.body));
    while (typeof body != "object") {
        body = JSON.parse(body);
    }
    
    if (!req.body) {
        res.status(400).send({ message: "no data!" });
    }
    console.log(body);
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

    let query = {
        POST_TYPE: body.TYPE,
        POST_TITLE: body.TITLE,
        POST_CONTENT: body.CONTENT,
        POST_CREATOR_NAME: body.CREATOR_NAME,
        POST_CREATOR_ID: body.CREATOR_ID,
        POST_CREATE_TIME: nowDate,
        POST_IMAGE: body.IMAGE
    };
    console.log("fileinfo: ", JSON.stringify(req.file));
    if (req.file) {
        query["POST_IMAGE"] =
        process.env.SERVER_HOST + "/api/images/" + req.file.filename;
    }
    console.log("query: ", query);
    const uploadPostsResult = await DataPostManager.uploadPosts(query);
    if (uploadPostsResult === undefined) {
        return res.json({ code: 500 });
    }
    return res.json({ code: 200 });
});
*/
module.exports = router;
