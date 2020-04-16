'use strict';

var appRoot = require('app-root-path');
var winston = require('winston');
var process = require('process');

var _winston$format = winston.format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    label = _winston$format.label,
    printf = _winston$format.printf;


var myFormat = printf(function (_ref) {
  var level = _ref.level,
      message = _ref.message,
      label = _ref.label,
      timestamp = _ref.timestamp;

  return timestamp + ' [' + label + '] ' + level + ': ' + message;
});

// console.log('process' , process.env.NODE_ENV);

var options = {
  // log파일
  file: {
    level: 'info',
    filename: appRoot + '/logs/winston-test.log', // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(label({ label: 'winston-test' }), timestamp(), myFormat // log 출력 포맷
    )
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(label({ label: 'nba_express' }), timestamp(), myFormat)
  }
};

var logger = new winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console)); // 개발 시 console로도 출력
}

module.exports = logger;