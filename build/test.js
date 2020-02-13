'use strict';

function a() {
    function b() {
        function c() {
            console.log('씨발');
        }
        c();
    }
    b();
}

a();