const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');
const expressErrorHandler = require('express-error-handler');
const logger = require('morgan');
const expressSession = require('express-session');
// const visitorCount = require('./visitor/VisitorFunc').visitorCount;

const errorHandler = expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
});

app.use(db);
app.use(setting);
// 방문객 카운터 미들웨어
// app.get('/' , (req , res , next) => {
//     console.log('middleware');
//     visitorCount(req);
//     next();
// });
app.use(expressSession({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly : true,
        secure : false,
    }
}));
app.use('/' , express.static(__dirname + "/../../client/build"));
app.use('/dr' , router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
app.use(logger('dev'));

const port = process.env.PORT || 4000;
app.listen(port , () => {
    console.log(`${port}port Server Start!!`);
});