const arr = [
    {
        'id':1,
        'reqDate':'2020-02-14'
    },
    {
        'id':2,
        'reqDate':'2020-02-10'
    },
    {
        'id':3,
        'reqDate':'2020-02-11'
    },
    {
        'id':4,
        'reqDate':'2020-02-16'
    },
    {
        'id':5,
        'reqDate':'2020-04-15'
    },
]

const sum = arr.reduce((prev , current) => {
    console.log(prev  , current.id);
    return prev + current.id;
} , 0)
console.log(sum);

console.log('----------------------');

// const arr2 = [1,3,5];

// const total = arr2.reduce((prev , current) => {
//     console.log(prev);
//     // console.log(current);
//     return prev + current;
// });

// console.log(total);