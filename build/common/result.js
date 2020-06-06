'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var code = require('./codeInfo');

var Result = function () {
    function Result() {
        _classCallCheck(this, Result);

        this.code = '';
        this.message = '';
        this.data = Object;
        this.err = Object;
    }

    _createClass(Result, [{
        key: 'setCode',
        set: function set(code) {
            this.code = code;
        }
    }, {
        key: 'setMessage',
        set: function set(message) {
            this.message = message;
        }
    }, {
        key: 'setData',
        set: function set(data) {
            this.data = data;
        }
    }, {
        key: 'setErr',
        set: function set(err) {
            this.err = err;
        }
    }]);

    return Result;
}();

module.exports = Result;