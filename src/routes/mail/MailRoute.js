const express = require('express');
const router = express.Router();
const mailConfig = require('../../config/mailConfig');
const common = require('../../common/common');

router.get('/password/find/:toEmail' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    const toEmail = req.params.toEmail;
    console.log(toEmail);
    const sendMail = await mailConfig.passwordFindMail(toEmail);
    if(sendMail !== 'DR00'){
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = sendMail;
    }
    return res.json(result);
})


module.exports = router;
