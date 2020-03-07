var a = 5;

function Outer(){
    console.log(a);
}


function Inner(){
    var a = 3;
    console.log(a);
    // Outer() -> console.log(a);
}

Inner();


