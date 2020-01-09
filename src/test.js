var express = require('express');
var app = express();

app.use((req , res , next) => {
    res.redirect('https://google.com');
})

app.listen(3000);