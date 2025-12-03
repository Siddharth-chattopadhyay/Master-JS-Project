const Products = [
    {
        "productId": 1001,
        "img": "assets/images/product/product-1.jpg",
        "productName": "Scalp Moisturizing Cream",
        "color": "red",
        "price": 2605.94
    },
    {
        "productId": 1002,
        "img": "assets/images/product/product-2.jpg",
        "productName": "Enriched Hand & Body Wash",
        "color": "white",
        "price": 2066.78
    },
    {
        "productId": 1003,
        "img": "assets/images/product/product-3.jpg",
        "productName": "Enriched Hand Wash",
        "color": "black",
        "price": 2246.50
    },
    {
        "productId": 1004,
        "img": "assets/images/product/product-4.jpg",
        "productName": "Enriched Duo",
        "color": "blue",
        "price": 2426.22
    }
];

const products = JSON.parse(localStorage.getItem("products")) || Products;


function Home(){
    let html = "";
    products.forEach((e) => {
        const card = `
        <div class="card border-0 mt-5" style="">
            <img src="${e.img}" class="card-img-top" alt="${e.productName}">
            <div class="card-body text-center">
                <p class="card-text">₹${e.price}</p>
                <h5 class="card-title">${e.productName}</h5>
            </div>
        </div>`;
        html += card;
    });
    document.getElementById("products").innerHTML = html;
}

function addProduct(){
    let isValid = true;
    const name = document.getElementById("pname");
    const img = document.getElementById("pimage");
    const price = document.getElementById("p_price");
    const color = document.getElementById("pcolor");

    
    name?.setAttribute("class", name.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!name?.value)? (isValid = false," is-invalid"): "is-valid"));
    img?.setAttribute("class", img.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!img?.value)? (isValid = false," is-invalid"): "is-valid"));
    price?.setAttribute("class", price.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!price?.value || Number.isNaN(Number(price.value)))? (isValid = false," is-invalid"): "is-valid"));
    if (!isValid) return;

    products.push({
        "productId": new Date().getTime(),
        "img": img.value,
        "productName": name.value,
        "price": price.value,
        "color": color.value
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added Successfully!");
}