var date = new Date();

const moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");


date = moment().format('YYYY-MM-DD HH:mm:ss');

