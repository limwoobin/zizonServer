const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const memberRouter = require('./member/MemberRoute');
const customerRouter = require('./customer/CustomerRoute');
const categoryRouter = require('./category/CategoryRoute');
const boardRouter = require('./board/BoardRoute');
const postRouter = require('./post/PostRoute');
const commentRouter = require('./comment/CommentRoute');
const visitorRouter = require('./visitor/VisitorController');
const mailRouter = require('./mail/MailRoute');
const common = require('../common/common');

router.get('/search/:keyword' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    
    const keyword = req.params.keyword;
    result.data = keyword;
    return res.json(result);
})

router.use(upload.array());
router.use('/member' , memberRouter);
router.use('/customer' , customerRouter);
router.use('/category' , categoryRouter);
router.use('/board' , boardRouter);
router.use('/post' , postRouter);
router.use('/comment' , commentRouter);
router.use('/visitor' , visitorRouter);
router.use('/mail' , mailRouter);


module.exports = router;