var x = function a(){
    console.log(this);
}

var asd = {
    ss : x,
    sayName: function() {
        console.log(this);
    }
}
asd.ss();
asd.sayName();