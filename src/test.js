function Person(name, gender){
  this.name = name;
  this.gender = gender;
}
Person.prototype.hi = function(){
  console.log(this.name + '까쟈');
}

var zero = new Person('ZZ' , 'A');
var rog = new Person('XX' , 'B');


console.log(Person.prototype.constructor);
console.log(Person.prototype);
console.log(zero.__proto__);

console.log(zero.constructor);