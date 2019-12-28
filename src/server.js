const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');

app.use(db);
app.use(setting);
app.use('/' , express.static(__dirname + "/../../client/build"));
app.use('/dr' , router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/test' , (req , res) => {
    let name = req.body.name;
    res.send(name);
});

const port = process.env.PORT || 4000;
app.listen(port , () => {
    console.log(`${port}port Server Start!!`);
});