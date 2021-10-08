const models = require("../../models");
const { Op } = require("sequelize");
const { uploadFileManage, tempFilePath, staticFilePath } = require("../../config/upload.config");
const fs = require("fs");
const moment = require("../../config/moment.config");
const { manageUploadFile } = require("./fileManager");

class DataPostManager {
    static async findPostByType(type) {
        try {
            return await models.posts.findAll({
                order: [["POST_CREATE_TIME", "DESC"]],
                where:
                    type !== undefined
                        ? {
                              POST_TYPE: type,
                          }
                        : {},
            });
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    static async findPostById(postId) {
        try {
            return await models.posts.findOne({
                where: {
                    POST_ID: postId,
                },
            });
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    static async getPosts(queryType) {
        return await this.findPostByType(queryType);
    }

    static async createPost(postData) {
        const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

        const createPostData = {
            POST_TYPE: postData.type,
            POST_TITLE: postData.title,
            POST_CONTENT: postData.content,
            POST_CREATOR_NAME: postData.creator_name,
            POST_CREATOR_ID: postData.creator_id,
            POST_CREATE_TIME: nowDate,
            POST_COMMENTS: 0,
            POST_LIKE: 0,
        };

        if (postData.file_id !== undefined) {
            const file_id = postData.file_id;
            const extension = manageUploadFile(uploadFileManage[file_id], file_id);
            if (extension !== undefined) {
                const fullName = file_id + "." + extension;
                createPostData["POST_IMAGE"] = fullName;
                fs.renameSync(`${tempFilePath}/${file_id}`, `${staticFilePath}/${fullName}`);
            }
        }

        console.log("createPostData: ", createPostData);

        try {
            const createResult = await models.posts.create(createPostData);
            return createResult;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    static async updatePost(postData) {
        const oldPostData = await this.findPostById(postData.postId);
        if (oldPostData === undefined) {
            console.log("Invalid post ID");
            return false;
        }

        const updatePostData = {
            ...oldPostData,
            ...postData,
        };

        const result = await models.posts.update(updatePostData, {
            where: { POST_ID: postData.postId },
        });
        return result;
    }

    static async deletePost(postId) {
        return await models.posts.destroy({
            where: { POST_ID: postId },
        });
    }
}

module.exports = DataPostManager;
