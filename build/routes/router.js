'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var memberRouter = require('./member/MemberController');
var customerRouter = require('./customer/CustomerController');
var categoryRouter = require('./category/CategoryController');
var boardRouter = require('./board/BoardController');
var commentRouter = require('./comment/CommentController');
var visitorRouter = require('./visitor/VisitorController');

var common = require('../common/common');

router.get('/search/:keyword', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    var keyword = req.params.keyword;
    result.data = keyword;
    return res.json(result);
});

router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/member', memberRouter);
router.use('/customer', customerRouter);
router.use('/category', categoryRouter);
router.use('/board', boardRouter);
router.use('/comment', commentRouter);
router.use('/visitor', visitorRouter);

module.exports = router;