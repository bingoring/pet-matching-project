const models = require("../../models");

class DataPostManager {
    static async findPostByIndex(index) {
        try {
            return await models.posts.findOne({
                where: {
                    POST_ID: index,
                },
            });
        } catch (err) {
            log.error(err);
            return undefined;
        }
    }

    static async getPosts(postIndex) {
        const index = postIndex ?? 0;
        const postData = [];
        for (let i = index; i < index + 5; i++) {
            const postIndexData = await this.findPostByIndex(i);
            if (postIndexData !== null) {
                postData.push(postIndexData);
            }
        }
        return postData;
    }
}

module.exports = DataPostManager;
