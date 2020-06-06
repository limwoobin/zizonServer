'use strict';

var winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');

var logger = winston.createLogger({
    level: 'debug', // 최소 레벨
    // 파일저장
    transports: [new winston.transports.DailyRotateFile({
        filename: 'logs/system.log', // log 폴더에 system.log 이름으로 저장
        zippedArchive: true, // 압축여부
        format: winston.format.printf(function (info) {
            return new Date().toFormat('YYYY-MM-DD HH24:MI:SS') + ' [' + info.level.toUpperCase() + '] - ' + info.message;
        })
    }),
    // 콘솔 출력
    new winston.transports.Console({
        format: winston.format.printf(function (info) {
            return new Date().toFormat('YYYY-MM-DD HH24:MI:SS') + ' [' + info.level.toUpperCase() + '] - ' + info.message;
        })
    })]
});

module.exports = logger;