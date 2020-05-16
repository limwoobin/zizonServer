const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config.json');
const logger = require('./winston');

const transporter = nodemailer.createTransport(smtpTransport({
    service: config.mailInfo.service,
    host: config.mailInfo.host,
    auth: {
        user: config.mailInfo.mail,
        pass: config.mailInfo.password,
    }
}));

const mailConfig = {};

mailConfig.passwordFindMail = (toEmail) => {
    return new Promise((resolve , reject) => {
        let mailOptions = {
            from: config.mailInfo.mail,
            to: toEmail,
            subject: '임시패스워드를 보내드립니다.',
            text: 'zzz',
        };
    
        transporter.sendMail(mailOptions , (err , info) => {
            if(err){
                logger.info(err);
                reject(err);
            }else{
                logger.info('EmailSend Success' + info.response);
                

                resolve(info.response);
            };
        })
    })
}

module.exports = mailConfig;