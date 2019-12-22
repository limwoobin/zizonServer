const express = require('express');
const router = express.Router();



router.get('/hi' , (req , res) => {
    res.send([
        {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '홍길동',
        'birthday': '961222',
        'gender': '남자',
        'job': '대학생'
        },
        {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '나동빈',
        'birthday': '960508',
        'gender': '남자',
        'job': '프로그래머'
        },
        {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '이순신',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
        }
        ]
        );
});


module.exports = router;