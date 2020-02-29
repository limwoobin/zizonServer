const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const memberRouter = require('./member/MemberController');
const customerRouter = require('./customer/CustomerController');
const categoryRouter = require('./category/CategoryController');
const boardRouter = require('./board/BoardController');
const commentRouter = require('./comment/CommentController');

router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use('/member' , memberRouter);
router.use('/customer' , customerRouter);
router.use('/category' , categoryRouter);
router.use('/board' , boardRouter);
router.use('/comment' , commentRouter);

module.exports = router;