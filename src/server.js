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

const port = process.env.PORT || 4000;
app.listen(port , () => {
    console.log(`${port}port Server Start!!`);
});