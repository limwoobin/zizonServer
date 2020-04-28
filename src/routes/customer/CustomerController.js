const express = require('express');
const router = express.Router();
const Customer = require('../../models/customer');
const CustomerService = require('./CustomerService');

router.get('/customers' , (req , res) => {
    Customer.find(function(err , customers){
        if(err) return res.status(500).send({error:'database fail'});
        res.json(customers);
    })
});

router.get('/test' , (req , res) => {
    res.send('teetete');
});

router.post('/insert' , (req , res) => {
    console.log(req.body);
    console.log(req.file);
    let customer = new Customer();
    customer.image = 'https://placeimg.com/64/64/2';
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
});

router.delete('/delete/:id' , (req , res) => {
    console.log('delete:' + req.params.id);
    Customer.remove({ id:req.params.id } , function(err , output){
        if(err) return res.status(500).json({ error:'database fail' });
        res.status(204).end();
    });
});

module.exports = router;