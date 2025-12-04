const Products = [
    {
        "productId": "1001",
        "img": "assets/images/product/product-1.jpg",
        "productName": "Scalp Moisturizing Cream",
        "color": "red",
        "price": 2605,
        "qty": 10,
        "desc": "lorem"
    },
    {
        "productId": "1002",
        "img": "assets/images/product/product-2.jpg",
        "productName": "Enriched Hand & Body Wash",
        "color": "white",
        "price": 2066,
        "qty": 10,
        "desc": "ditto"
    },
    {
        "productId": "1003",
        "img": "assets/images/product/product-3.jpg",
        "productName": "Enriched Hand Wash",
        "color": "black",
        "price": 2246,
        "qty": 10,
        "desc": "ipsum"
    },
    {
        "productId": "1004",
        "img": "assets/images/product/product-4.jpg",
        "productName": "Enriched Duo",
        "color": "blue",
        "price": 2426,
        "qty": 10,
        "desc": "sit"
    }
];

const products = JSON.parse(localStorage.getItem("products")) || Products;
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function Home(){
    let html = "";
    products.forEach(e => {
        const card = `
        <div class="card border-0 mt-5" style="">
            <img src="${e.img}" class="card-img-top" alt="${e.productName}">
            <div class="card-body text-center">
                <p class="card-text">₹${e.price}</p>
                <h5 class="card-title">${e.productName}</h5>
                <div>
                    <button class="btn btn-dark" onclick="addToCart(${e.productId})">Add to cart</button>
                    <button class="btn btn-dark" onclick="showDetail(${e.productId})">View Details</button>
                </div>
            </div>
        </div>`;
        html += card;
    });
    document.getElementById("products").innerHTML = html;
}

function addToCart(id){
    const product = products.find(v => v.productId == id);
    const exists = cart.find(v => v.productId == id);
    if (exists)
        alert("Item already exists");
    else if (product){
        cart.push({
            "productId": product.productId,
            "img": product.img,
            "productName": product.productName,
            "color": product.color,
            "price": product.price,
            "cartQty": 1,
            "qty": product.qty,
            "desc": product.desc
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart successfully!");
    }
}
function removeFromCart(id){
    cart.splice(cart.findIndex(v => v.productId == id), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    pagecart();
}

function pagecart(){
    const holder = document.getElementById("cart");
    const totalPriceHolder = document.getElementById("totalprice");
    let total = 0;
    let html = "";
    cart.forEach(v => {
        html += `
            <tr>
                <td>${v.productId}</td>
                <td>${v.productName}</td>
                <td><img src="${v.img}" alt="${v.productName}" width="50"></td>
                <td>${v.price}</td>
                <td>${v.price * v.cartQty}</td>
                <td>${v.color}</td>
                <td>
                <button class="btn btn-dark" onclick="decrement(${v.productId})"><i class="bi bi-dash"></i></button>
                    <span class="mx-2">
                    ${v.cartQty}
                    </span>
                <button class="btn btn-dark" onclick="increment(${v.productId})"><i class="bi bi-plus"></i></button>
                </td>
                <td>${v.desc}</td>
                <td>
                    <div>

                    <button class="btn btn-dark" onclick="removeFromCart(${v.productId})">
                        <i class="bi bi-x"></i>
                    </button>
                    </div>
                </td>
            </tr>
        `;
        total += Number(v.price * v.cartQty);
    });

    totalPriceHolder.innerHTML = total
    holder.innerHTML = html;
}

function addProduct(){
    let isValid = true;
    const name = document.getElementById("pname");
    const img = document.getElementById("pimage");
    const price = document.getElementById("p_price");
    const color = document.getElementById("pcolor");
    const qty = document.getElementById("qty");
    const desc = document.getElementById("desc");

    
    name?.setAttribute("class", name.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!name?.value)? (isValid = false," is-invalid"): "is-valid"));
    img?.setAttribute("class", img.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!img?.value)? (isValid = false," is-invalid"): "is-valid"));
    price?.setAttribute("class", price.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!price?.value || Number.isNaN(Number(price.value)))? (isValid = false," is-invalid"): "is-valid"));
    if (!isValid) return;

    products.push({
        "productId": new Date().getTime(),
        "img": img.value,
        "productName": name.value,
        "price": price.value,
        "color": color.value,
        "qty": qty.value,
        "desc": desc.value
    });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added Successfully!");
}

function viewProduct(){
    const holder = document.getElementById("view-product");
    let html = "";
    products.forEach(v => {
        html += `
            <tr>
                <td>${v.productId}</td>
                <td>${v.productName}</td>
                <td><img src="${v.img}" alt="${v.productName}" width="50"></td>
                <td>${v.price}</td>
                <td>${v.color}</td>
                <td>${v.qty}</td>
                <td>${v.desc}</td>
                <td>
                    <div>

                    <a class="btn btn-warning" onclick="editProduct(${v.productId})" href="./edit-product.html">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                    <button class="btn btn-danger" onclick="deleteProduct(${v.productId})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                    </div>
                </td>
            </tr>
        `;
    });
    holder.innerHTML = html;
}

function deleteProduct(id){
    products.splice(products.findIndex(v => v.productId == id), 1);
    localStorage.setItem("products", JSON.stringify(products));
    viewProduct();
}

function editProduct(id){
    localStorage.setItem("edit", id);
}

function editproductPage(){
    const data = products.find(v => v.productId == localStorage.getItem("edit"));
    const name = document.getElementById("pname");
    const img = document.getElementById("pimage");
    const price = document.getElementById("p_price");
    const color = document.getElementById("pcolor");
    const qty = document.getElementById("qty");
    const desc = document.getElementById("desc");

    name.value = data.productName;
    img.value = data.img;
    price.value = data.price;
    color.value = data.color;
    qty.value = data.qty;
    desc.value = data.desc;
}

function finishEdit(){
    const id = localStorage.getItem("edit");
    if (id===null) alert("Invalid function: Which product to edit?");
    else {
        const name = document.getElementById("pname");
        const img = document.getElementById("pimage");
        const price = document.getElementById("p_price");
        const color = document.getElementById("pcolor");
        const qty = document.getElementById("qty");
        const desc = document.getElementById("desc");

        name?.setAttribute("class", name.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!name?.value)? (isValid = false," is-invalid"): "is-valid"));
        img?.setAttribute("class", img.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!img?.value)? (isValid = false," is-invalid"): "is-valid"));
        price?.setAttribute("class", price.getAttribute("class").replace("is-valid", "").replace("is-invalid", "") + ((!price?.value || Number.isNaN(Number(price.value)))? (isValid = false," is-invalid"): "is-valid"));

        const product = products.find(v => v.productId == id);
        const scart = cart.find(v => v.productId == id);
        if (product){
            product.productName = name.value;
            product.img = img.value;
            product.color = color.value;
            product.price = price.value;
            product.qty = qty.value;
            product.desc = desc.value;
            localStorage.setItem("products", JSON.stringify(products));
        }
        if (scart){
            scart.productName = name.value;
            scart.img = img.value;
            scart.color = color.value;
            scart.price = price.value;
            scart.qty = qty.value;
            scart.desc = desc.value;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        localStorage.removeItem("edit");
    }
}

/**
 * <button class="btn btn-dark" onclick="increment(${v.productId})"><i class="bi bi-plus"></i></button>
                    <span class="mx-2">
                        ${v.cartQty}
                    </span>
                    <button class="btn btn-dark" onclick="decrement(${v.productId})"><i class="bi bi-dash"></i></button>
 */

function increment(id){
    const product = cart.find(p => p.productId == id);
    if (!product)
        alert("Item does not exists...");
    else if (product.cartQty >= product.qty)
        alert("Maximum product reached");
    else
        product.cartQty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    pagecart();
}
function decrement(id){
    const product = cart.find(p => p.productId == id);
    if (!product)
        alert("Item does not exists...");
    else if (product.cartQty <= 1)
        alert("Minimum value is 1");
    else 
        product.cartQty--;
    localStorage.setItem("cart", JSON.stringify(cart));
    pagecart();
}

function showDetail(id){
    localStorage.setItem("detail", id);
    document.location.href = "./view-details.html";
}

function viewDetails(){
    const doc = document.getElementById("detail");
    const product = products.find(v => v.productId == localStorage.getItem("detail"));
    if (!product)
        doc.innerHTML = "Product not found...";
    const html = `
        <div class="col-6">
            <img src="${product.img}" alt="product-image">
        </div>
        <div class="col-6">
            <p>Product Name: ${product.productName}</p>
            <p>Product color: ${product.color}</p>
            <p>Product price: ${product.price}</p>
            <p>Product Quantity: ${product.qty}</p>
            <p>${product.desc}</p>
            <button class="btn btn-dark" onclick="addToCart(${product.productId})">Add to cart</button>
        </div>
    `;
    doc.innerHTML = html;
    localStorage.removeItem("detail");
}