'use strict';

function excution() {
    console.log('111');
    setTimeout(function () {
        console.log('excution');
    }, 0);
    console.log('222');
}

function A() {
    console.log('A');
    excution();
}

function B() {
    console.log('B');
    A();
}

function C() {
    console.log('C');
    B();
}

C();
// excution();