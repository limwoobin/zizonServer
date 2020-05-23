class Result{
    constructor() {
        this.code = '';
        this.message = '';
        this.data = Object;
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
}


module.exports = Result;