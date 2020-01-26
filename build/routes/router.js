'use strict';

var express = require('express');
var router = express.Router();
var memberRouter = require('./member/member');
var customerRouter = require('./customer/customer');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

console.log('Router...');
router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/member', memberRouter);
router.use('/customer', customerRouter);

module.exports = router;