// // ===================== ELEMENTS =====================
// const cartItemsContainer = document.getElementById("cartItems");
// const itemsCount = document.getElementById("itemsCount");
// const subtotalElement = document.getElementById("subtotal");
// const totalElement = document.getElementById("total");
// const savingsElement = document.getElementById("savings");
// const checkoutBtn = document.getElementById("checkoutBtn");

// const BASE_URL = "http://localhost:3000";

// // ===================== FETCH CART FROM SERVER =====================
// async function getCart() {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       renderEmptyCart();
//       return [];
//     }

//     // db.json يحتوي على carts مع userId
//     const res = await fetch(`${BASE_URL}/carts?userId=${user.id}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//     renderEmptyCart();
//     return [];
//   }
// }

// // ===================== RENDER EMPTY CART =====================
// function renderEmptyCart() {
//   if (!cartItemsContainer) return;

//   cartItemsContainer.innerHTML = `
//     <div class="w-100 text-center py-5">
//       <i class="fa-solid fa-cart-shopping fa-6x text-secondary mb-4"></i>
//       <h3 class="fw-bold mb-3">Your cart is currently empty</h3>
//       <p class="text-muted mb-4">
//         Looks like you haven't added any products yet.
//       </p>
//       <a href="products.html" class="btn btn-dark px-4 py-2">
//         Continue Shopping
//       </a>
//     </div>
//   `;
//   if (itemsCount) itemsCount.textContent = 0;
//   if (subtotalElement) subtotalElement.textContent = "0 LE";
//   if (totalElement) totalElement.textContent = "0 LE";
//   if (savingsElement) savingsElement.textContent = "0 LE";
//   if (checkoutBtn) checkoutBtn.style.display = "none"; // نخفي زرار Checkout
// }

// // ===================== RENDER CART ITEMS =====================
// async function renderCart() {
//   const cart = await getCart();

//   if (!cartItemsContainer) return;

//   if (cart.length === 0) {
//     renderEmptyCart();
//     return;
//   }

//   if (checkoutBtn) checkoutBtn.style.display = "block"; // نظهر زرار Checkout

//   let subtotal = 0;
//   let totalQuantity = 0;
//   cartItemsContainer.innerHTML = "";

//   cart.forEach(item => {
//     subtotal += item.price * item.quantity;
//     totalQuantity += item.quantity;

//     const itemHTML = `
//       <div class="card mb-3 shadow-sm">
//         <div class="row g-0 align-items-center">
//           <div class="col-md-3 text-center p-3">
//             <img src="${item.image}" class="img-fluid rounded" style="max-height:100px;">
//           </div>
//           <div class="col-md-6">
//             <div class="card-body">
//               <h5 class="card-title">${item.title}</h5>
//               <p class="card-text text-muted mb-1">${item.price} LE</p>
//               <p class="card-text">Quantity: ${item.quantity}</p>
//             </div>
//           </div>
//           <div class="col-md-3 text-end p-3">
//             <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${item.id})">
//               Remove
//             </button>
//           </div>
//         </div>
//       </div>
//     `;

//     cartItemsContainer.innerHTML += itemHTML;
//   });

//   if (itemsCount) itemsCount.textContent = totalQuantity;
//   if (subtotalElement) subtotalElement.textContent = subtotal + " LE";
//   if (totalElement) totalElement.textContent = subtotal + " LE";
//   if (savingsElement) savingsElement.textContent = "0 LE";
// }

// // ===================== REMOVE ITEM =====================
// async function removeItem(itemId) {
//   try {
//     await fetch(`${BASE_URL}/carts/${itemId}`, {
//       method: "DELETE"
//     });
//     renderCart();
//   } catch (err) {
//     console.error(err);
//   }
// }

// // ===================== INITIAL LOAD =====================
// document.addEventListener("DOMContentLoaded", renderCart);

    const cartItemsContainer = document.getElementById("cartItems");
    const itemsCount = document.getElementById("itemsCount");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const savingsElement = document.getElementById("savings");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const BASE_URL = "http://localhost:3000";

    // ===================== FETCH CART =====================
    async function getCart() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          renderEmptyCart();
          return [];
        }

        const res = await fetch(`${BASE_URL}/carts?userId=${user.id}`);
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
        renderEmptyCart();
        return [];
      }
    }

    // ===================== RENDER EMPTY CART =====================
    function renderEmptyCart() {
      if (!cartItemsContainer) return;

      cartItemsContainer.innerHTML = `
        <div class="text-center cart-empty w-100">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3 class="fw-bold mb-3">Your cart is currently empty</h3>
          <p class="text-muted mb-4">Looks like you haven't added any products yet.</p>
          <a href="products.html" class="btn btn-dark px-4 py-2">Continue Shopping</a>
        </div>
      `;
      if (itemsCount) itemsCount.textContent = 0;
      if (subtotalElement) subtotalElement.textContent = "0 LE";
      if (totalElement) totalElement.textContent = "0 LE";
      if (savingsElement) savingsElement.textContent = "0 LE";
      if (checkoutBtn) checkoutBtn.style.display = "none";
    }

    // ===================== RENDER CART ITEMS =====================
    async function renderCart() {
      const cart = await getCart();
      if (!cartItemsContainer) return;

      if (cart.length === 0) {
        renderEmptyCart();
        return;
      }

      if (checkoutBtn) checkoutBtn.style.display = "block";

      let subtotal = 0;
      let totalQuantity = 0;
      cartItemsContainer.innerHTML = "";

      cart.forEach(item => {
        subtotal += item.price * item.quantity;
        totalQuantity += item.quantity;

        const itemHTML = `
          <div class="card cart-item-card mb-3 shadow-sm">
            <div class="row g-0 align-items-center">
              <div class="col-md-3 text-center p-3">
                <img src="${item.image}" class="img-fluid rounded" style="max-height:100px;">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text text-muted mb-1">${item.price} LE</p>
                  <p class="card-text">Quantity: ${item.quantity}</p>
                </div>
              </div>
              <div class="col-md-3 text-end p-3">
                <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${item.id})">
                  <i class="fa-solid fa-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        `;

        cartItemsContainer.innerHTML += itemHTML;
      });

      if (itemsCount) itemsCount.textContent = totalQuantity;
      if (subtotalElement) subtotalElement.textContent = subtotal + " LE";
      if (totalElement) totalElement.textContent = subtotal + " LE";
      if (savingsElement) savingsElement.textContent = "0 LE";
    }

    // ===================== REMOVE ITEM =====================
    async function removeItem(itemId) {
      try {
        await fetch(`${BASE_URL}/carts/${itemId}, { method: "DELETE" }`);
        renderCart();
      } catch (err) {
        console.error(err);
      }
    }

    // ===================== INITIAL LOAD =====================
    document.addEventListener("DOMContentLoaded", renderCart);