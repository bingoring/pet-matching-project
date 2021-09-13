"use strict";
const models = require("../../models");
const encrypt = require("../../config/password.config");
const moment = require("../../config/moment.config");
const jwt = require("jsonwebtoken");

class DataUserManager {
    static async findUserInDB(user_id) {
        try {
            return await models.users.findOne({
                where: {
                    USER_ID: user_id,
                },
            });
        } catch (err) {
            log.error(err);
            return undefined;
        }
    }

    static async login(user_id, user_pwd) {
        const userInfo = await this.findUserInDB(user_id);
        console.log(JSON.stringify(userInfo));
        if (encrypt.isPasswordSame(user_pwd, userInfo.USER_PWD)) {
            const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
            models.users.update(
                {
                    USER_LASTLOGIN: nowDate,
                },
                {
                    where: {
                        USER_ID: user_id,
                    },
                }
            );

            const token = jwt.sign(
                {
                    USER_ID: userInfo.USER_ID,
                    USER_NAME: userInfo.USER_NAME,
                    USER_LASTLOGIN: nowDate,
                    USER_POSITION: userInfo.USER_POSITION,
                },
                process.env.SECRET,
                {
                    expiresIn: "9h",
                }
            );
            console.log("token:");
            console.log(token);
            return token;
        } else {
            return undefined;
        }
    }
}

module.exports = DataUserManager;