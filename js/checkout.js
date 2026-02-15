// const orderList = document.getElementById("orderList");
// const totalPriceEl = document.getElementById("totalPrice");

// let cartItems = []; // هتتخزن هنا المنتجات

// // Fetch cart from JSON Server
// async function fetchCart() {
//     try {
//         const res = await fetch("http://localhost:3000/carts");
//         cartItems = await res.json();
//         renderCart(); // عرض المنتجات بعد الجلب
//     } catch (err) {
//         console.error("Failed to fetch cart:", err);
//     }
// }

// // عرض المنتجات في Your Order مع الصورة والسعر
// function renderCart(){
//     orderList.innerHTML = "";
//     if(cartItems.length === 0){
//         orderList.innerHTML = "<li class='list-group-item text-center'>Your cart is empty</li>";
//         totalPriceEl.textContent = "$0";
//         return;
//     }

//     let total = 0;
//     cartItems.forEach(item => {
//         const quantity = item.quantity || item.qty || 1;
//         const price = parseFloat(item.price || 0);

//         const li = document.createElement("li");
//         li.className = "list-group-item d-flex justify-content-between align-items-center";

//         li.innerHTML = `
//             <div class="d-flex align-items-center gap-3">
//                 <img src="${item.thumbnail || 'https://via.placeholder.com/50'}" 
//                      alt="${item.title}" 
//                      width="50" height="50" 
//                      style="object-fit:cover; border-radius:5px;">
//                 <span>${item.title} x ${quantity}</span>
//             </div>
//             <span>$${(price * quantity).toFixed(2)}</span>
//         `;

//         orderList.appendChild(li);
//         total += price * quantity;
//     });

//     totalPriceEl.textContent = `$${total.toFixed(2)}`;
// }


// // استدعاء الدالة عند تحميل الصفحة
// document.addEventListener("DOMContentLoaded", fetchCart);


// // التعامل مع طريقة الدفع
// const cardFormContainer = document.getElementById("cardFormContainer");

// function showCardForm(){
//     const payment = document.querySelector("input[name='payment']:checked").value;
//     if(payment === "Card"){
//         cardFormContainer.innerHTML = `
//             <h5 class="mt-3">Card Details</h5>
//             <div class="mb-3">
//                 <label>Card Number</label>
//                 <input type="text" class="form-control" id="cardNumber" maxlength="16" placeholder="1234 5678 9012 3456" required>
//             </div>
//             <div class="row">
//                 <div class="col-md-6 mb-3">
//                     <label>Expiry</label>
//                     <input type="text" class="form-control" id="expiry" placeholder="MM/YY" required>
//                 </div>
//                 <div class="col-md-6 mb-3">
//                     <label>CVV</label>
//                     <input type="text" class="form-control" id="cvv" maxlength="3" placeholder="123" required>
//                 </div>
//             </div>
//         `;
//     } else {
//         cardFormContainer.innerHTML = "";
//     }
// }

// // event listener
// document.querySelectorAll("input[name='payment']").forEach(r=>{
//     r.addEventListener("change", showCardForm);
// });

// // التعامل مع إرسال الطلب
// document.getElementById("checkoutForm").addEventListener("submit", async function(e){
//     e.preventDefault();
    
//     // جمع البيانات
//    const orderData = {
//   customer: document.getElementById("firstName").value + " " +
//             document.getElementById("lastName").value,

//   email: document.getElementById("email").value,
//   address: document.getElementById("address").value,
//   phone: document.getElementById("phone").value,

//   paymentMethod: document.querySelector("input[name='payment']:checked").value,
//   products: cartItems,

//   total: cartItems.reduce(
//     (a,b)=> a + (b.price * (b.quantity || b.qty || 1)), 0
//   ),

//   status: "Pending",
//   date: new Date().toISOString().split("T")[0]
// };

//     // التحقق من بيانات الكارت لو اخترت الكارد
//     if(orderData.paymentMethod === "Card"){
//         const cardNumber = document.getElementById("cardNumber").value;
//         const expiry = document.getElementById("expiry").value;
//         const cvv = document.getElementById("cvv").value;

//         if(cardNumber.length !== 16 || cvv.length !== 3 || !expiry){
//             alert("Please enter valid card details!");
//             return;
//         }
//         orderData.cardInfo = {cardNumber, expiry, cvv};
//     }

//     // ارسال الطلب للJSON Server
//    try {
//   const res = await fetch("http://localhost:3000/orders", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(orderData)
//   });

//   if (res.ok) {
//     // امسح كل عناصر الكارت
//     for (let item of cartItems) {
//       await fetch(`http://localhost:3000/carts/${item.id}`, {
//         method: "DELETE"
//       });
//     }

//     window.location.href = "success.html";
//   }

// } catch (err) {
//   console.error(err);
//   alert("Failed to place order!");
// }

// });










// // const orderList = document.getElementById("orderList");
// // const totalPriceEl = document.getElementById("totalPrice");

// // let cartItems = [];
// // let currentUser = null;

// // // ===============================
// // // Fetch cart + check user
// // // ===============================
// // async function fetchCart() {
// //     try {
// //         currentUser = JSON.parse(localStorage.getItem("user"));

// //         if (!currentUser) {
// //             alert("You must login first!");
// //             window.location.href = "login.html";
// //             return;
// //         }

// //         const res = await fetch("http://localhost:3000/carts");
// //         const allCarts = await res.json();

// //         // نجيب كارت اليوزر الحالي بس
// //         cartItems = allCarts.filter(item => item.userId == currentUser.id);

// //         renderCart();

// //     } catch (err) {
// //         console.error("Failed to fetch cart:", err);
// //     }
// // }

// // // ===============================
// // // Render Cart
// // // ===============================
// // function renderCart(){
// //     orderList.innerHTML = "";

// //     if(cartItems.length === 0){
// //         orderList.innerHTML = "<li class='list-group-item text-center'>Your cart is empty</li>";
// //         totalPriceEl.textContent = "$0";
// //         return;
// //     }

// //     let total = 0;

// //     cartItems.forEach(item => {
// //         const quantity = item.quantity || item.qty || 1;
// //         const price = parseFloat(item.price || 0);

// //         const li = document.createElement("li");
// //         li.className = "list-group-item d-flex justify-content-between align-items-center";

// //         li.innerHTML = `
// //             <div class="d-flex align-items-center gap-3">
// //                 <img src="${item.thumbnail || 'https://via.placeholder.com/50'}" 
// //                      alt="${item.title}" 
// //                      width="50" height="50" 
// //                      style="object-fit:cover; border-radius:5px;">
// //                 <span>${item.title} x ${quantity}</span>
// //             </div>
// //             <span>$${(price * quantity).toFixed(2)}</span>
// //         `;

// //         orderList.appendChild(li);
// //         total += price * quantity;
// //     });

// //     totalPriceEl.textContent = `$${total.toFixed(2)}`;
// // }

// // document.addEventListener("DOMContentLoaded", fetchCart);

// // // ===============================
// // // Payment Method
// // // ===============================
// // const cardFormContainer = document.getElementById("cardFormContainer");

// // function showCardForm(){
// //     const payment = document.querySelector("input[name='payment']:checked").value;

// //     if(payment === "Card"){
// //         cardFormContainer.innerHTML = `
// //             <h5 class="mt-3">Card Details</h5>
// //             <div class="mb-3">
// //                 <label>Card Number</label>
// //                 <input type="text" class="form-control" id="cardNumber" maxlength="16" required>
// //             </div>
// //             <div class="row">
// //                 <div class="col-md-6 mb-3">
// //                     <label>Expiry</label>
// //                     <input type="text" class="form-control" id="expiry" placeholder="MM/YY" required>
// //                 </div>
// //                 <div class="col-md-6 mb-3">
// //                     <label>CVV</label>
// //                     <input type="text" class="form-control" id="cvv" maxlength="3" required>
// //                 </div>
// //             </div>
// //         `;
// //     } else {
// //         cardFormContainer.innerHTML = "";
// //     }
// // }

// // document.querySelectorAll("input[name='payment']").forEach(r=>{
// //     r.addEventListener("change", showCardForm);
// // });

// // // ===============================
// // // Submit Order
// // // ===============================
// // document.getElementById("checkoutForm").addEventListener("submit", async function(e){
// //     e.preventDefault();

// //     if(cartItems.length === 0){
// //         alert("Your cart is empty!");
// //         return;
// //     }

// //     const orderData = {
// //         userId: currentUser.id, // 🔥 مهم جداً
// //         customer: document.getElementById("firstName").value + " " +
// //                   document.getElementById("lastName").value,
// //         email: document.getElementById("email").value,
// //         address: document.getElementById("address").value,
// //         phone: document.getElementById("phone").value,
// //         paymentMethod: document.querySelector("input[name='payment']:checked").value,
// //         products: cartItems,
// //         total: cartItems.reduce(
// //             (a,b)=> a + (b.price * (b.quantity || b.qty || 1)), 0
// //         ),
// //         status: "PENDING",
// //         date: new Date().toISOString()
// //     };

// //     // تحقق بيانات الكارد
// //     if(orderData.paymentMethod === "Card"){
// //         const cardNumber = document.getElementById("cardNumber").value;
// //         const expiry = document.getElementById("expiry").value;
// //         const cvv = document.getElementById("cvv").value;

// //         if(cardNumber.length !== 16 || cvv.length !== 3 || !expiry){
// //             alert("Please enter valid card details!");
// //             return;
// //         }

// //         orderData.cardInfo = {cardNumber, expiry, cvv};
// //     }

// //     try {
// //         // 1️⃣ إنشاء الأوردر
// //         const res = await fetch("http://localhost:3000/orders", {
// //             method:"POST",
// //             headers:{"Content-Type":"application/json"},
// //             body: JSON.stringify(orderData)
// //         });

// //         if(!res.ok) throw new Error("Order failed");

// //         // 2️⃣ مسح الكارت من السيرفر
// //         for (let item of cartItems) {
// //             await fetch(`http://localhost:3000/carts/${item.id}`, {
// //                 method: "DELETE"
// //             });
// //         }

// //         alert("Order placed successfully ✅");

// //         // 3️⃣ روح صفحة My Orders
// //         window.location.href = "ordered_page.html";

// //     } catch(err){
// //         console.error(err);
// //         alert("Failed to place order!");
// //     }
// // });



const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");

let cartItems = [];
let currentUser = null;

// ===============================
// Fetch cart for current user
// ===============================
async function fetchCart() {
    try {
        currentUser = JSON.parse(localStorage.getItem("user"));

        if (!currentUser) {
            alert("Please login first!");
            window.location.href = "login.html";
            return;
        }

        // جلب كارت المستخدم فقط
        const res = await fetch(
            `http://localhost:3000/carts?userId=${currentUser.id}`
        );

        cartItems = await res.json();
        renderCart();

    } catch (err) {
        console.error("Failed to fetch cart:", err);
    }
}

// ===============================
// Render Cart
// ===============================
function renderCart() {
    orderList.innerHTML = "";

    if (cartItems.length === 0) {
        orderList.innerHTML =
            "<li class='list-group-item text-center'>Your cart is empty</li>";
        totalPriceEl.textContent = "$0";
        return;
    }

    let total = 0;

    cartItems.forEach(item => {
        const quantity = item.quantity || item.qty || 1;
        const price = parseFloat(item.price || 0);

        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.image || item.thumbnail || 'https://via.placeholder.com/50'}"
                     width="50" height="50"
                     style="object-fit:cover;border-radius:5px;">
                <span>${item.title} x ${quantity}</span>
            </div>
            <span>$${(price * quantity).toFixed(2)}</span>
        `;

        orderList.appendChild(li);
        total += price * quantity;
    });

    totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", fetchCart);

// ===============================
// Payment Method
// ===============================
const cardFormContainer = document.getElementById("cardFormContainer");

function showCardForm() {
    const payment =
        document.querySelector("input[name='payment']:checked").value;

    if (payment === "Card") {
        cardFormContainer.innerHTML = `
            <h5 class="mt-3">Card Details</h5>
            <div class="mb-3">
                <label>Card Number</label>
                <input type="text" class="form-control" id="cardNumber" maxlength="16" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label>Expiry</label>
                    <input type="text" class="form-control" id="expiry" placeholder="MM/YY" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label>CVV</label>
                    <input type="text" class="form-control" id="cvv" maxlength="3" required>
                </div>
            </div>
        `;
    } else {
        cardFormContainer.innerHTML = "";
    }
}

document.querySelectorAll("input[name='payment']").forEach(r => {
    r.addEventListener("change", showCardForm);
});

document
    .getElementById("checkoutForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const orderData = {
            userId: currentUser.id,
            customer:
                document.getElementById("firstName").value +
                " " +
                document.getElementById("lastName").value,

            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value,

            paymentMethod:
                document.querySelector("input[name='payment']:checked")
                    .value,

            products: cartItems,

            total: cartItems.reduce(
                (a, b) =>
                    a +
                    (b.price * (b.quantity || b.qty || 1)),
                0
            ),

            status: "Pending",
            date: new Date().toISOString().split("T")[0]
        };

        if (orderData.paymentMethod === "Card") {
            const cardNumber =
                document.getElementById("cardNumber").value;
            const expiry =
                document.getElementById("expiry").value;
            const cvv =
                document.getElementById("cvv").value;

            if (cardNumber.length !== 16 || cvv.length !== 3 || !expiry) {
                alert("Please enter valid card details!");
                return;
            }

            orderData.cardInfo = { cardNumber, expiry, cvv };
        }

        try {
            const res = await fetch(
                "http://localhost:3000/orders",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                }
            );

            if (!res.ok) throw new Error("Order failed");

            for (let item of cartItems) {
                await fetch(
                    `http://localhost:3000/carts/${item.id}`,
                    { method: "DELETE" }
                );
            }

            window.location.href = "success.html";

        } catch (err) {
            console.error(err);
            alert("Failed to place order!");
        }
    });
