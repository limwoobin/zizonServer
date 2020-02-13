<<<<<<< HEAD
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
=======
function a(){
    function b(){
        function c(){
            console.log('씨발');
        }
        c();
>>>>>>> 51b2d65
    }
    b();
}
<<<<<<< HEAD
asd.ss();
asd.sayName();
>>>>>>> dev
=======

a();
>>>>>>> 51b2d65
