var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
