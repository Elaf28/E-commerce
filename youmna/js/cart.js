const cartContainer = document.getElementById("cart-container");
const addForm = document.getElementById("add-product-form");

const BASE_URL = "http://localhost:3000/carts";

/* ============================= */
/* تحديث عداد الكارت في النافبار */
/* ============================= */
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");

  if (!cartCountElement) return;

  fetch(BASE_URL)
    .then(res => res.json())
    .then(items => {
      let totalQuantity = 0;

      items.forEach(item => {
        totalQuantity += item.quantity;
      });

      cartCountElement.textContent = `(${totalQuantity})`;
    })
    .catch(err => console.error(err));
}

/* ============================= */
/* تحميل وعرض الكارت */
/* ============================= */
function loadCart() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(cartItems => {
      cartContainer.innerHTML = "";

      if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        updateCartCount();
        return;
      }

      const ul = document.createElement("ul");

      cartItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        // زر الحذف
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " Remove";
        deleteBtn.classList.add("btn", "btn-sm", "btn-danger", "ms-2");

        deleteBtn.addEventListener("click", async () => {
          try {
            await fetch(`${BASE_URL}/${item.id}`, {
              method: "DELETE"
            });

            loadCart();        // إعادة تحميل الكارت
            updateCartCount(); // تحديث العداد
          } catch (err) {
            console.error(err);
          }
        });

        li.appendChild(deleteBtn);
        ul.appendChild(li);
      });

      cartContainer.appendChild(ul);

      updateCartCount(); // تحديث العداد بعد التحميل
    })
    .catch(err => console.error(err));
}

/* ============================= */
/* أول ما الصفحة تفتح */
/* ============================= */
loadCart();
updateCartCount();

/* ============================= */
/* إضافة منتج جديد */
/* ============================= */
if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);

    if (!name || !price || !quantity) return;

    const newProduct = { name, price, quantity };

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });

      addForm.reset();
      loadCart();
      updateCartCount();
    } catch (err) {
      console.error(err);
    }
  });

//ظهور تفاصيل المنتجات المتضافه الي ال cart
  const cartContainer = document.getElementById("cartItems");
const productDetails = document.getElementById("productDetails");
const totalPriceEl = document.getElementById("totalPrice");

// دالة تحميل ال cart وعرض التفاصيل
function loadCart() {
  fetch("http://localhost:3000/carts")
    .then(res => res.json())
    .then(cartItems => {
      cartContainer.innerHTML = "";
      productDetails.innerHTML = "";
      let totalPrice = 0;

      if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        productDetails.innerHTML = "<p>No products added</p>";
        totalPriceEl.textContent = "0 LE";
        return;
      }

      const ul = document.createElement("ul");

      cartItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        // زر الحذف
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.addEventListener("click", async () => {
          await fetch(`http://localhost:3000/carts/${item.id}`, { method: "DELETE" });
          loadCart(); // تحديث الكارت والبيانات 
          updateCartCount();
        });

        li.appendChild(deleteBtn);
        ul.appendChild(li);

        // تحديث بيانات 
        const detailDiv = document.createElement("div");
        detailDiv.classList.add("mb-2");
        detailDiv.innerHTML = `
          <strong>${item.name}</strong><br>
          Price: $${item.price} <br>
          Quantity: ${item.quantity} <br>
          Subtotal: $${(item.price * item.quantity).toFixed(2)}
        `;
        productDetails.appendChild(detailDiv);

        totalPrice += item.price * item.quantity;
      });

      cartContainer.appendChild(ul);
      totalPriceEl.textContent = `${totalPrice.toFixed(2)} LE`;
    })
    .catch(err => console.error(err));
}


loadCart();

}
