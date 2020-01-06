var person = {
    name: 'aa',
    fisrtName:'bb',
    'fisrt-name':'cc',
    fisrt_name:'dd'
};

console.log(person.fisrtName);

console.log(person.fisrt_name);

console.log(person["fisrt-name"]);