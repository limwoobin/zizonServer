var a = [
    {
        'a':1
    },
    {
        'a':3
    },
    {
        'a':5
    }
];

console.log(a);

a.map((c) => {
    if(c.a === 3){
        c.a = 100;
    }
})



console.log('-------------------------------------------')


a.map((c) => {
    console.log(c.a);
})