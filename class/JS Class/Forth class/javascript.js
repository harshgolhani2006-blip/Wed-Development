//console.log("Hello")
//let btn=document.querySelector("button")
//let btn=document.querySelector("#two") // id
let btn=document.querySelector(".one") //class
let body=document.querySelector("body")
btn.addEventListener("click",function(){
    body.style.backgroundColor="gray"
})