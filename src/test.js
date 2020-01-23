function add(a,b,callback){
  var result = a + b;
  var cnt = 0;
    callback(result);

  var history = function(){
      cnt ++;
      return a + '+' + b + ' = ' + result;
  }
  return history;
};


var add_history = add(10,10,function(result){

  console.log('파라미터로 전달된 콜백함수 호출됨');
  console.log('더하기 (10,10)의 결과 : %d',result);
});