const products=[
{name:"T-Shirt",category:"Clothes",price:599,emoji:"👕"},
{name:"Jeans",category:"Clothes",price:1299,emoji:"👖"},
{name:"Running Shoes",category:"Shoes",price:1999,emoji:"👟"},
{name:"Smart Watch",category:"Electronics",price:2499,emoji:"⌚"},
{name:"Headphones",category:"Electronics",price:1499,emoji:"🎧"},
{name:"Smartphone",category:"Electronics",price:15999,emoji:"📱"},
{name:"Rice Bag",category:"Grocery",price:699,emoji:"🍚"},
{name:"Fresh Fruits",category:"Grocery",price:299,emoji:"🍎"},
{name:"Backpack",category:"Accessories",price:899,emoji:"🎒"},
{name:"Sunglasses",category:"Accessories",price:499,emoji:"🕶️"}
];
let cart=JSON.parse(localStorage.getItem("shopEasyCart")||"[]");
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase(), c=document.getElementById("category").value;
 const list=products.filter(p=>(c==="All"||p.category===c)&&p.name.toLowerCase().includes(q));
 document.getElementById("productList").innerHTML=list.map((p,i)=>`<div class="card"><div class="emoji">${p.emoji}</div><div class="card-body"><h3>${p.name}</h3><p>${p.category}</p><div class="price">₹${p.price.toLocaleString("en-IN")}</div><button onclick="addCart(${products.indexOf(p)})">Add to Cart</button></div></div>`).join("")||"<p>No product found.</p>";
}
function addCart(i){cart.push(products[i]);save();renderCart();alert(products[i].name+" added to cart!")}
function save(){localStorage.setItem("shopEasyCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function renderCart(){
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.emoji} ${p.name}<br><b>₹${p.price.toLocaleString("en-IN")}</b></span><button onclick="removeCart(${i})">Remove</button></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("total").textContent=cart.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN");
}
function removeCart(i){cart.splice(i,1);save();renderCart()}
function toggleCart(){document.getElementById("cartPanel").classList.toggle("show")}
function checkout(){if(!cart.length)return alert("Your cart is empty.");alert("Order placed successfully! Thank you for shopping with ShopEasy.");cart=[];save();renderCart();toggleCart()}
save();renderProducts();renderCart();showAdminProducts();
function addProduct(name, category, price, emoji) {
    if (!name || !category || !price || !emoji) {
        alert("Please fill all fields");
        return;
    }

    products.push({
        name: name,
        category: category,
        price: Number(price),
        emoji: emoji
    });

    renderProducts();
    showAdminProducts();

    document.getElementById("pname").value = "";
    document.getElementById("pcategory").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pemoji").value = "";

    alert("Product Added Successfully!");
}

function showAdminProducts() {
    let html = "";

    products.forEach((p, i) => {
        html += `
        <p>${i + 1}. ${p.emoji} ${p.name} - ₹${p.price}</p>
        `;
    });

    document.getElementById("adminProducts").innerHTML = html;
}
showAdminProducts();
