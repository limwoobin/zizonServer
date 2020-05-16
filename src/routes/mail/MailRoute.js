const express = require('express');
const router = express.Router();
const mailConfig = require('../../config/mailConfig');
const common = require('../../common/common');

router.get('/password/find/' , async (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    const sendMail = await mailConfig.passwordFindMail('drogba02@naver.com');
    if(sendMail !== 'DR00'){
        result.code = 'DR01';
        result.message = common.status.DR01;
        result.data = sendMail;
    }
    return res.json(result);
})


module.exports = router;
