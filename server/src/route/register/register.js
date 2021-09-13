const express = require('express');
const DataUserManager = require('../../module/data/userRegister')
const router = express.Router();
var path = require('path')

router.get('/', function(req,res){
    console.log("get register url");
    res.sendFile(path.join(__dirname, '../../../public/register.html'))
})

router.post('/', (req, res)=>{
    const userId = req.body.user_id;
    const userPwd = req.body.user_pwd;
    const userName = req.body.user_name;

    const registerData = DataUserManager.register(userId,userPwd,userName);
    console.log(`registerData: ${registerData}`)
    return res.json({code: 200, data: registerData})
})

module.exports = router;