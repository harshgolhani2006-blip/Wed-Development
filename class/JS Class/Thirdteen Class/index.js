// import { a, add } from './new.js';

// console.log(a);

// add(10, 20);

// function sum(a){
//     return function(b){
//         if(b){
//             return sum(a + b);
//         }
//         return a;
//     }
// }
// console.log(sum(5)(6)(7)(8)(1)(2)(3)(4)());

// let arr = [1, 2, 3, 4, 5];
// let num =[6, 7, 8, 9, 10];
// //let ans = num.concat(arr);
// let ans = [...arr, ...num];
// console.log(ans);
// let obj1 = {
//     name: 'John',
//     age: 30
// }
// let obj2 = {
//     city: 'New York',
//     country: 'USA'
// }
// //let obj3 = Object.assign({}, obj1, obj2);
// let obj3 = {...obj1, ...obj2};
// console.log(obj3);

// function sum(a, b, c, ...nums) {
//  let total = a + b + c;

//     for(let i of nums){
//         total += i;
//     }

//     console.log(total);
// }
// sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30);

// let arr = [1, 2, 3, 4, 5];
// let [a, b, c, d, e] = arr;
// console.log(a, b, c, d, e);

// let obj = {
//     name: 'John',
//     age: 30,
//     city: 'New York'
// }
// let { name, age, city } = obj;
// console.log(name, age, city);

$("h1").css("color", "red");