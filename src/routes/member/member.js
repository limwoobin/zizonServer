const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Customer = require('../../models/customer');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/hi' , (req , res) => {
    console.log('findAll...');
    Customer.find(function(err , customers){
        if(err) return res.status(500).send({error:'database fail'});
        res.json(customers);
    })
});


router.post('/insert' , (req , res) => {
    // let customer = new Customer();
    // customer.userEmail = req.body.userEmail;
    // customer.userPwd = req.body.userPwd;
    // customer.birthday = '';
    // customer.userNm = req.body.userNm;
    // customer.userPhone = req.body.userPhone;
    // customer.save((err) => {
    //     if(err){
    //         console.error(err);
    //         res.json({result: 0});
    //         return;
    //     }
    //     res.json({result: 1});
    // });
    
    let userEmail = req.body.userEmail;
    let userPwd = req.body.userPwd;
    let birthday = '';
    let userNm = req.body.userNm;
    let userPhone = req.body.userPhone;
    console.log(req.body);
    res.send(req.body);
});



module.exports = router;