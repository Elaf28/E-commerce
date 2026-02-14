
const cartContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const itemsCountEl = document.getElementById("itemsCount");
const totalEl = document.getElementById("total");
const savingsEl = document.getElementById("savings");

//  تحديث العداد في Navbar 
async function updateCartCount(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user) return;

    const res = await fetch(`http://localhost:3000/carts?userId=${user.id}`);
    const cart = await res.json();

    let total = 0;
    cart.forEach(item => total += item.quantity);

    document.querySelectorAll(".cart-count").forEach(el => el.textContent = total);
}

//  تحميل الكارت 
function loadCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        renderEmptyCart();
        return;
    }

    fetch(`http://localhost:3000/carts?userId=${user.id}`)
        .then(res => res.json())
        .then(cartItems => {
            cartContainer.innerHTML = "";

            if (cartItems.length === 0) {
                renderEmptyCart();
                updateCartCount();
                return;
            }

            // إذا فيه منتجات، نظهرهم
            let subtotal = 0;
            let totalItems = 0;

            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
                totalItems += item.quantity;

                const div = document.createElement("div");
                div.classList.add("cart-item", "d-flex", "align-items-center", "mb-3");
                div.innerHTML = `
                    <img src="${item.image}" width="60" class="me-3 rounded">
                    <div class="flex-grow-1">
                        <h6>${item.title}</h6>
                        <p>${item.price} LE x ${item.quantity}</p>
                    </div>
                    <button class="btn btn-sm btn-danger">Remove</button>
                `;

                // زر الحذف
                div.querySelector("button").addEventListener("click", () => {
                    fetch(`http://localhost:3000/carts/${item.id}`, { method: "DELETE" })
                        .then(() => loadCart());
                });

                cartContainer.appendChild(div);
            });

            subtotalEl.textContent = subtotal.toFixed(2) + " LE";
            totalEl.textContent = subtotal.toFixed(2) + " LE";
            itemsCountEl.textContent = totalItems;
            savingsEl.textContent = "0 LE";

            updateCartCount();
        })
        .catch(err => console.error(err));
}

//  عرض الكارت الفارغ 
function renderEmptyCart() {
    cartContainer.innerHTML = `
        <div class="text-center py-5">
            <i class="fa-solid fa-cart-shopping fa-6x text-secondary mb-4"></i>
            <h3 class="text-secondary fw-bold">Your cart is empty</h3>
            <p class="text-muted">Looks like you haven't added any products yet.</p>
            <a href="../html/products.html" class="btn btn-dark px-4 py-2 mt-2">Continue Shopping</a>
        </div>
    `;
    subtotalEl.textContent = "0 LE";
    totalEl.textContent = "0 LE";
    itemsCountEl.textContent = "0";
    savingsEl.textContent = "0 LE";
    updateCartCount();
}

//  عند تحميل الصفحة 
document.addEventListener("DOMContentLoaded", loadCart);
