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

    static async register(user_id, user_pwd, user_name) {
        const userInfo = await this.findUserInDB(user_id);
        console.log(`userInfo: ${JSON.stringify(userInfo)}`);
        if (userInfo !== null) {
            console.log(`userId is already existed! ${userInfo.USER_ID}`);
            return false;
        }
        console.log(`create new data: ${user_id}, ${user_pwd}, ${user_name}`);
        models.users
            .create({ USER_ID: user_id, USER_PWD: encrypt.encrypt(user_pwd), USER_NAME: user_name, createdAt: moment().format("YYYY-MM-DD HH:mm:ss"), USER_POSITION: 1 })
            .then((result) => {
                console.log(`새 유저 생성 성공 : ${result.USER_ID}`);
            })
            .catch((err) => {
                console.log(`유저 생성 실패: ${err}`);
            });
        return true;
    }

    static async checkDuplicate(user_id) {
        const userInfo = await this.findUserInDB(user_id);
        if (userInfo !== null) {
            console.log(`userId is already exists! ${userInfo.USER_ID}`);
            return undefined;
        }
        return true;
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
                    USER_ID: user_id,
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
