const express = require('express');
const router = express.Router();
const memberRouter = require('./member/MemberController');
const customerRouter = require('./customer/CustomerController');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();


console.log('Router...')
router.use(upload.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use('/member' , memberRouter);
router.use('/customer' , customerRouter);

module.exports = router;