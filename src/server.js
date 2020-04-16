const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const db = require('./routes/dbConnection');
const router = require('./routes/router');
const setting = require('./routes/setting');
const expressErrorHandler = require('express-error-handler');
const logger = require('./config/winston');
const expressSession = require('express-session');
const visitor = require('./visitor/VisitorFunc');
const errorHandler = expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
});

app.use(db);
app.use(setting);
app.use(history());
app.use(expressSession({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly : true,
        secure : false,
    }
}));

app.all('/*' , (req , res , next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers' , 'X-Requested-With');
    next();
})

app.get('/' , visitor.visitorCount);
// app.use('/' , express.static(__dirname + "/../../client/build"));
// 기존 클래스버전

app.use('/' , express.static(__dirname + "/../../../appHooks/build"));
// 훅스버전

// app.get('*' , (req , res) => {
//     res.sendFile(path.resolve(__dirname , '/../../../appHooks/build' , 'index.html'));
// })

logger.info('logger hello');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/dr' , router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);



const port = process.env.PORT || 4000;
app.listen(port , () => {
    logger.info(`Listening on port ${port}`);
});