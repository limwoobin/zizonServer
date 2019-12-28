'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var Customer = require('../../models/customer');

router.get('/hi', function (req, res) {
    Customer.find(function (err, customers) {
        res.send(customers);
    });

    // res.send([
    //     {
    //     'id': 1,
    //     'image': 'https://placeimg.com/64/64/1',
    //     'name': '홍길동',
    //     'birthday': '961222',
    //     'gender': '남자',
    //     'job': '대학생'
    //     },
    //     {
    //     'id': 2,
    //     'image': 'https://placeimg.com/64/64/2',
    //     'name': '임우빈',
    //     'birthday': '940801',
    //     'gender': '남자',
    //     'job': '근본'
    //     },
    //     {
    //     'id': 3,
    //     'image': 'https://placeimg.com/64/64/3',
    //     'name': '이순신',
    //     'birthday': '961127',
    //     'gender': '남자',
    //     'job': '디자이너'
    //     }
    //     ]
    //     );
});

router.post('/hi', function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var job = req.body.job;
    res.send(req.body);
});

module.exports = router;