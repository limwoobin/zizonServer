const code = require('./codeInfo');

class Result{
    constructor() {
        this.code = '';
        this.message = '';
        this.data = Object;
        this.err = Object;
    }

    set setCode(code) {
        this.code = code;
    }

    set setMessage(message) {
        this.message = message;
    }

    set setData(data) {
        this.data = data;
    }

    set setErr(err) {
        this.err = err;
    }
}


module.exports = Result;