<<<<<<< HEAD
handle = () => {
    console.log('좆까까');
}

asd = () => {
    setTimeout(handle , 3000);
};

asd();
=======
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
>>>>>>> dev
