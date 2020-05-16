const crypto = require('crypto');

let aaa = crypto.randomBytes(15, (err, buf) => {
    console.log(buf.toString('base64'));
});

aaa;