const express = require('express');
const router = express.Router();
const mailConfig = require('../../config/mailConfig');
const common = require('../../common/common');

router.get('/send' , async (req , res) => {
   
    const sendMail = await mailConfig.passwordFindMail('drogba02@naver.com');
    return res.json(sendMail);
})


module.exports = router;
