const Products = [
    {
        "productId": 0,
        "img": "assets/images/product/product-1.jpg",
        "productName": "Scalp Moisturizing Cream",
        "price": "$29.00"
    },
    {
        "productId": 1,
        "img": "assets/images/product/product-2.jpg",
        "productName": "Enriched Hand & Body Wash",
        "price": "$23.00"
    },
    {
        "productId": 2,
        "img": "assets/images/product/product-3.jpg",
        "productName": "Enriched Hand Wash",
        "price": "$25.00"
    },
    {
        "productId": 3,
        "img": "assets/images/product/product-4.jpg",
        "productName": "Enriched Duo",
        "price": "$27.00"
    }
];

const RawProducts = localStorage.getItem("products") || JSON.stringify(Products);
const ParsedProducts = JSON.parse(RawProducts);

let html = "";

ParsedProducts.forEach((e) => {
    const card = `
    <div class="card border-0" style="">
        <img src="${e.img}" class="card-img-top" alt="${e.productName}">
        <div class="card-body text-center">
            <p class="card-text">${e.price}</p>
            <h5 class="card-title">${e.productName}</h5>
        </div>
    </div>`;
    html += card;
});

document.getElementById("products").innerHTML = html;