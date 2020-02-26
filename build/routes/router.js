'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var memberRouter = require('./member/MemberController');
var customerRouter = require('./customer/CustomerController');
var categoryRouter = require('./category/CategoryController');

router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/member', memberRouter);
router.use('/customer', customerRouter);
router.use('/category', categoryRouter);

module.exports = router;