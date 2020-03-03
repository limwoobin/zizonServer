var EventEmitter = require('events').EventEmitter;

function StreamLibrary(resourceName) { 
  this.emit('start');

  // 파일을 읽고 읽은 청크마다 다음을 수행한다.       
  this.emit('data', chunkRead);       
}
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;   // EventEmitter를 상속받는다