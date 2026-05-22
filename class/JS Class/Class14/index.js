// call applied bind methods 
// let obj = {
//     id: 1,
//     firstName: "Harsh",
//     lastName: "Golhani",
//     fullName: function (city, country) {
//         console.log(this.firstName + " " + this.lastName+ " from " + city + ", " + country);
//     }
// }
// //obj.fullName();
// let userName = {
//     id: 2,
//     firstName: "Rohit",
//     lastName: "Sharma"
// }
// obj.fullName.call(userName, "Mumbai", "India"); // call method

//obj.fullName.apply(userName, ["Mumbai", "India"]); // apply method

// const questions = [
// {
//     question:"HTML ka full form kya hai?",
//     options:[
//         "Hyper Text Markup Language",
//         "High Text Machine Language",
//         "Hyper Tabular Markup Language",
//         "Home Tool Markup Language"
//     ],
//     answer:0
// },

// {
//     question:"CSS me color change karne ke liye kaunsi property use hoti hai?",
//     options:[
//         "font-color",
//         "text-color",
//         "color",
//         "background"
//     ],
//     answer:2
// },

// {
//     question:"JavaScript me variable declare karne ke liye kaunsa keyword use hota hai?",
//     options:[
//         "var",
//         "int",
//         "string",
//         "declare"
//     ],
//     answer:0
// },

// {
//     question:"Kaunsa HTML tag sabse bada heading banata hai?",
//     options:[
//         "<h6>",
//         "<heading>",
//         "<h1>",
//         "<head>"
//     ],
//     answer:2
// },

// {
//     question:"JavaScript me array ki length kaise pata karte hain?",
//     options:[
//         "array.size()",
//         "array.length",
//         "array.count",
//         "length(array)"
//     ],
//     answer:1
// }

// ];
// console.log(questions[0].options[0]);
// for(let a in questions){
//     console.log(questions[a].options[1]);
// }

//string 
// let a=10;
// let b=a;
// b=20;
// console.log(b);

// let user1={
//     name:"Harsh",
//     age:19,
//     address:{
//         city:"Mumbai",
//         country:"India"
//     }
// }
// let user2={...user1};
// user2.address.city="Pune";
// console.log(user1.address.city + ", " + user1.address.country); // shallow copy
// console.log(user2.address.city + ", " + user2.address.country); // shallow copy

// let user2= structuredClone(user1);
// user2.address.city="Pune";
// console.log(user1.address.city + ", " + user1.address.country); // deep copy
// console.log(user2.address.city + ", " + user2.address.country); // deep copy

// let arr1=[1,2,3,4,5];
// arr1.map
// console.log(Array.prototype.map);


let str =" js js js  "
// console.log(str.length);
// console.log(str.toLocaleUpperCase());
// console.log(str.toLocaleLowerCase());
// console.log(str.trim());
// console.log(str.includes("j"));
// console.log(str.indexOf("s"));
// console.log(str.substring(0,2),"substring method");  // first variable starting index and second variable ending index
// console.log(str.substr(0,4),"substr method");  //first variable starting index and second variable length of string
// console.log(str.split(""));

// let ans= str.split("").reverse().join("");  // join method is used to convert array into string and reverse method is used to reverse the array
// console.log(ans);
// console.log(str.replace("js","JavaScript")); // replace method is used to replace a string with another string
// console.log(str.replaceAll("js","JavaScript")); // replaceAll method is used to replace all occurrences of a string with another string
// console.log(str.repeat(3)); // repeat method is used to repeat a string a specified number of times
// console.log(str.charAt(1)); // charAt method is used to get the character at a specified index

console.log(str.replaceAll("j",""));
console.log(str.replaceAll("js","jsx"));