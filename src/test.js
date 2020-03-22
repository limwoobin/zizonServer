// function test () {
//     return new Promise(function (resolve, reject) {
//       for(let i=0; i < 5; i++) {
//         setTimeout(function(){
//           console.log(i);
//           resolve();
//         }, 1000);
//       }
//     })
//   }
  
//   test().then(function(){
//     console.log('Done')
//   });

  function delay(item) {
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log(item);
        resolve();
      },1000)
    })
  }
  
  async function test(array) {
    for(let i=0; i< array.length; i++){
      await delay(array[i]);
    }
    console.log('Done');
  }

  console.log('1~~');
  test([1,2,3,4,5]);
  console.log('2~~');