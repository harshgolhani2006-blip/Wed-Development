// localStorage.setItem("name", "Harsh Golhani");
// localStorage.setItem("age", 19);
// localStorage.setItem("city", "Jabalpur");
// localStorage.removeItem("age");
// localStorage.removeItem("city");
// localStorage.removeItem("name");
// console.log(localStorage.getItem("name"));
// console.log(localStorage.getItem("age"));
// console.log(localStorage.getItem("city"));  

    function saveData(event){
            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);

            alert("Data Saved Successfully");
        }

        function resetData(){
            localStorage.clear();

            alert("Data Reset Successfully");
        }
        function addData(){
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
        }

        function login(){
            let loginName = document.getElementById("loginName").value;
            let loginEmail = document.getElementById("loginEmail").value;
            let loginPassword = document.getElementById("loginPassword").value;

            let savedName = localStorage.getItem("name");
            let savedEmail = localStorage.getItem("email");
            let savedPassword = localStorage.getItem("password");

            if(
                loginName === savedName &&
                loginEmail === savedEmail &&
                loginPassword === savedPassword
            ){
                alert("Login Successful");
            }
            else{
                alert("Invalid Details");
            }
        }
        function showData(){

    document.getElementById("showName").innerText =
    "Name : " + localStorage.getItem("name");

    document.getElementById("showEmail").innerText =
    "Email : " + localStorage.getItem("email");

    document.getElementById("showPassword").innerText =
    "Password : " + localStorage.getItem("password");
}
        window.onload = function(){

    showData();
}