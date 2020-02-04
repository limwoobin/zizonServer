"use strict";

// function f() {
//   var a = [];
//   var i;

//   for(i = 0; i < 3; i++){
//     a[i] = function() {
//       return i;
//       }
//   }
//   return a;
// }

// var b = f();

// console.log( b[0]() ); 
// console.log( b[1]() ); 
// console.log( b[2]() ); 
// ------------------------------------------------------------------
function f() {
  var a = [];
  var i;

  for (i = 0; i < 3; i++) {
    a[i] = function (x) {
      return function () {
        return x;
      };
    }(i);
  }
  return a;
}

var b = f();

console.log(b[0]());
console.log(b[1]());
console.log(b[2]());