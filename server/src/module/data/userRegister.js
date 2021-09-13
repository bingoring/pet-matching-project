'use strict'

var mysql = require('mysql')
const models = require("../../models");
const encrypt = require("../../config/password.config");

//DATABASE SETTING
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'qldrh971213',
//     database: 'pet-project',
// })
// connection.connect();



class UserRegisterManager {
    // static register(user_id, user_email, user_pwd, user_name){     var query =
    // connection.query('insert into users (user_id, user_email, user_pwd,
    // user_name) values ("' + user_id + '","' + user_email + '","' + user_pwd +
    // '","' + user_name + '")', function(err, rows) {         if(err) { throw err;}
    // console.log("Data inserted!");     }) }

    static register(user_id, user_pwd, user_name) {
        models
            .users
            .findOne({
                where: {
                    USER_ID: user_id
                }
            })
            .then((result) => {
                //console.log(result);
                if (result != null) {
                    res.send(
                        {message: "ID already existed", registerSuccess: false, resultCode: 1}
                    );
                } else {
                    models
                        .users
                        .create(
                            {USER_ID: user_id, USER_PWD: encrypt.encrypt(user_pwd), USER_NAME: user_name}
                        )
                        .then((result) => {
                            console.log(`새 유저 생성 성공 : ${USER_ID}`);
                            res.send({registerSuccess: true, resultCode: 0});
                        })
                        .catch((err) => {
                            console.log(`유저 생성 실패: ${err}`);
                            res.send({registerSuccess: false, resultCode: 2});
                        });
                }
            });
    }
}

module.exports = UserRegisterManager;