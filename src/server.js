const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');
const expressErrorHandler = require('express-error-handler');
const errorHandler = expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
});

app.use(db);
app.use(setting);
app.use('/' , express.static(__dirname + "/../../client/build"));
app.use('/dr' , router);
console.log('dirname:'+__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port , () => {
    console.log(`${port}port Server Start!!`);
});