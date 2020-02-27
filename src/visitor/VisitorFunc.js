const express = require('express');
const app = express();
const Visitor = require('../models/visitor');
const moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
const session = require('express-session');
app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));
    
const visitorCount = (req) => {
    const getIp = require('../common/config').getIpAddressFromRequest(req);    
    console.log('sessionIp:' + session.getIp);
    console.log('ip -> ' + getIp);
    if(session.getIp){ 
        return;
    }
    console.log('session2');
    session.getIp = getIp;
    const reqDate = moment().format('YYYY-MM-DD');
    // let visitor = new Visitor();
    Visitor.findOne({reqDate: reqDate} , (err , visitor) => {
        if(err){
            console.error('error:' + err);
            throw err;
        }
        if(!visitor){
            // insert
            console.log(reqDate);
            console.log('insert');
            let visitor = new Visitor();
            visitor.reqDate = reqDate;
            visitor.save((err) => {
                if(err){
                    console.error(err);
                    throw err;
                }
            })
        }else{
            // update
            console.log('update');
            Visitor.updateOne({reqDate: reqDate} , { $inc : {todayCount: 1}} , (err , visitor) => {
                if(err){
                    console.error(err);
                    throw err;
                }
            });
        }
    })
    return 'Success';
}


module.exports.visitorCount = visitorCount;