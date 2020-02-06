<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
console.log(b[2]());
=======
'use strict';

var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
};

console.log(config);
console.log(config.headers);
>>>>>>> 082b46d
=======
console.log(b[2]());
>>>>>>> refs/remotes/origin/master
