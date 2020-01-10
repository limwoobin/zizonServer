// var readline = require('readline');
// var rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// });

// var count = 0;
// var inputs = [];
// rl.on('line', function(answer) {
//   if(answer > 0 && answer < 10){
//     inputs.push(answer);
//     var a = parseInt(inputs[0]);
//     var b = parseInt(inputs[1]);
//     count++;
//     if(count === 2) {
//       console.log(a + b);
//       rl.close();
//     }
//   }else{
//     rl.close();
//   }
// });

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = line.split(' ').map((el) => parseInt(el));
    console.log('input:' + input);
  })
  .on('close', function () {
    console.log(input[0] + input[1]);
    process.exit();
  });

// 입력 : 1 2
// 출력 : 3