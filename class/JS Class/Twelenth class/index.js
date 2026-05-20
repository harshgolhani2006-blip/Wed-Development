fetch("https://dummyjson.com/products")
.then((res) => {
    return res.json();
})
.then((data) => {

    let body = document.querySelector("body");

    window.allP = data.products;

    data.products.map((item) => {

        body.innerHTML += `

        <div style="
            border:1px solid black;
            padding:20px;
            margin:20px;
            width:400px;
            border-radius:25px;
            text-align:center;
            box-shadow:0 0 10px gray;
        ">

            <img 
                src="${item.thumbnail}" 
                alt="${item.title}"
                style="
                    width:100%;
                    height:250px;
                    object-fit:cover;
                    border-radius:15px;
                "
            >

            <h2>${item.title}</h2>

            <h3>${item.brand}</h3>

            <h4>$${item.price}</h4>

            <p style="
                font-size:16px;
                font-weight:normal;
                color:gray;
            ">
                ${item.description}
            </p>

            <button 
                onclick="addToCart(${item.id})"

                style="
                    padding:10px 20px;
                    margin-top:10px;
                    background-color:blue;
                    color:white;
                    border:none;
                    border-radius:10px;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                Add to Cart
            </button>

        </div>

        `;
    });

});

console.log(window);

function addToCart(id){

    let data = window.allP.find((item) => {
        return item.id === id;
    });

    console.log(data);

    localStorage.setItem("cart", JSON.stringify(data));

    alert("Product Added Successfully");
}