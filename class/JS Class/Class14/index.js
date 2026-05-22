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

let user1={
    name:"Harsh",
    age:19,
    address:{
        city:"Mumbai",
        country:"India"
    }
}
let user2={...user1};
user2.address.city="Pune";
console.log(user1.address.city + ", " + user1.address.country); // shallow copy
console.log(user2.address.city + ", " + user2.address.country); // shallow copy

let user2= structuredClone(user1);
user2.address.city="Pune";
console.log(user1.address.city + ", " + user1.address.country); // deep copy
console.log(user2.address.city + ", " + user2.address.country); // deep copy

