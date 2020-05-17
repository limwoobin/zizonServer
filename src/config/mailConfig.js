const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config.json');
const logger = require('./winston');
const Member = require('../models/member');
const crypto = require('crypto');
const configFunc = require('./config');

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
    return new Promise( async (resolve , reject) => {
        let randomPwd = await configFunc.getRandomString();
        let mailOptions = {
            from: config.mailInfo.mail,
            to: toEmail,
            subject: 'Drogbalog에서 임시패스워드를 보내드립니다.',
            text: `임시 패스워드: ${randomPwd}`,
        };

        transporter.sendMail(mailOptions , (err , info) => {
            if(err) {
                return err;
            }else{
                Member.findOne({userEmail: toEmail})
                .then(member => {
                    crypto.pbkdf2(randomPwd , member.salt, 102391, 64, 'sha512', (err, key) => {
                        if(err) reject(err);
                        let newPassword = key.toString('base64');
                        console.log(newPassword);
                        Member.findOneAndUpdate({userEmail: toEmail}, {$set : {"userPwd": newPassword}})
                        .then((result) => {
                            logger.info(info);
                            logger.info(result);
                            resolve('DR00');
                        })
                    });
                })
                .catch(err => {
                    logger.info(err);
                    reject(err);
                });
            }
        });
    })
}


module.exports = mailConfig;