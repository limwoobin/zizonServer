'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var memberRouter = require('./member/MemberRoute');
var customerRouter = require('./customer/CustomerRoute');
var categoryRouter = require('./category/CategoryRoute');
var boardRouter = require('./board/BoardRoute');
var commentRouter = require('./comment/CommentRoute');
var visitorRouter = require('./visitor/VisitorController');
var mailRouter = require('./mail/MailRoute');
var common = require('../common/common');

router.get('/search/:keyword', function (req, res) {
    var result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;

    var keyword = req.params.keyword;
    result.data = keyword;
    return res.json(result);
});

router.get('/testapi', function (req, res) {

    req.session.test = 'test??';
    console.log(req.session);
    // delete req.session.test;
    return res.send(req.session.test);
});

router.use(upload.array());
router.use('/member', memberRouter);
router.use('/customer', customerRouter);
router.use('/category', categoryRouter);
router.use('/board', boardRouter);
router.use('/comment', commentRouter);
router.use('/visitor', visitorRouter);
router.use('/mail', mailRouter);

module.exports = router;