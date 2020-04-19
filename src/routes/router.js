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
const visitorRouter = require('./visitor/VisitorController');

const redis = require('redis');
const client = redis.createClient();

const common = require('../common/common');

router.get('/search/:keyword' , (req , res) => {
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    
    const keyword = req.params.keyword;
    result.data = keyword;
    return res.json(result);
})

router.get('/testapi' , (req , res) => {
    client.set('name' , 'drogba');
    client.get('name' , (err , reply) => {
        return res.json(reply);    
    });
})

router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use('/member' , memberRouter);
router.use('/customer' , customerRouter);
router.use('/category' , categoryRouter);
router.use('/board' , boardRouter);
router.use('/comment' , commentRouter);
router.use('/visitor' , visitorRouter);

module.exports = router;