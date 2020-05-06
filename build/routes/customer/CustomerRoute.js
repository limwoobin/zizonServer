'use strict';

var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');
var CustomerService = require('./CustomerService');

router.get('/customers', function (req, res) {
    Customer.find(function (err, customers) {
        if (err) return res.status(500).send({ error: 'database fail' });
        res.json(customers);
    });
});

router.get('/test', function (req, res) {
    res.send('teetete');
});

router.post('/insert', function (req, res) {
    console.log(req.body);
    console.log(req.file);
    var customer = new Customer();
    customer.image = 'https://placeimg.com/64/64/2';
    customer.name = req.body.name;
    customer.birthday = req.body.birthday;
    customer.gender = req.body.gender;
    customer.job = req.body.job;
    console.log('customer:' + customer);
    customer.save(function (err) {
        if (err) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });
    });
});

router.delete('/delete/:id', function (req, res) {
    console.log('delete:' + req.params.id);
    Customer.remove({ id: req.params.id }, function (err, output) {
        if (err) return res.status(500).json({ error: 'database fail' });
        res.status(204).end();
    });
});

module.exports = router;