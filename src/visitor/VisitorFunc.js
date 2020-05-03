const Visitor = require('../models/visitor');
const moment = require('moment');
               require('moment-timezone');
               moment.tz.setDefault("Asia/Seoul");
    
function VisitorFunc(){

}

VisitorFunc.prototype.visitorCount = (req , res , next) => {
    const rs = req.session;
    const getIp = require('../config/config').getIpAddressFromRequest(req);  
    console.log('rs.getIp' , rs.getIp);
    if(!rs.getIp){ 
        rs.getIp = getIp;
        const reqDate = moment().format('YYYY-MM-DD');
        Visitor.findOne({reqDate: reqDate} , (err , visitorData) => {
            if(err){
                console.log('err' , err);
                throw err;
            }
            if(!visitorData){
                let visitor = new Visitor();
                visitor.todayCount++;
                visitor.reqDate = reqDate;
                visitor.save();
            }else{
                visitorData.todayCount++;
                visitorData.reqDate = reqDate;
                visitorData.save();
            }
        })
    }
    next();
}

const visitor = new VisitorFunc();


module.exports = visitor;