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


router.post('/hi' , (req , res) => {
    console.log(req.body);
    let customer = new Customer();
    customer.image = null;
    customer.name = req.body.name;
    customer.birthday = req.body.birthday;
    customer.gender = req.body.gender;
    customer.job = req.body.job;
    console.log('customer:' + customer);
    customer.save((err) => {
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
    // let image = null;
    // let name = req.body.name;
    // let birthday = req.body.birthday;
    // let gender = req.body.gender;
    // let job = req.body.job;
    //res.send(req.body);
});

module.exports = router;