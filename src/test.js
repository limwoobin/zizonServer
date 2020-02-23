var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const date = moment().format('YYYY-MM-DD HH:mm:ss') 


console.log(date.toString);
console.log(typeof date.toString);
