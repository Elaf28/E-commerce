// ===================== CART COUNT FROM LOCALSTORAGE =====================
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountElement = document.querySelector(".cart-count");

let totalQty = 0;
cart.forEach(item => {
  totalQty += item.qty || 0;
});

if (cartCountElement) {
  cartCountElement.textContent =`(${totalQty})`;
}

// ===================== OPTIONAL: CART COUNT FROM SERVER =====================
function updateCartCount() {
  fetch("http://localhost:3000/carts")
    .then(res => res.json())
    .then(items => {
      let totalQuantity = 0;
      items.forEach(item => {
        totalQuantity += item.quantity || 0;
      });

      if (cartCountElement) {
        cartCountElement.textContent = `(${totalQuantity})`;
      }
    })
    .catch(err => console.error(err));
}

// ===================== NAVBAR LOGIC =====================
const navLinks = document.getElementById("nav-links");

// نجيب المستخدم الحالي
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// تحديد base path لو الصفحة جوه html
let basePath = "";
if (window.location.pathname.includes("/html/")) {
  basePath = "../";
}

// ===================== PROTECT ROUTES =====================
function protectRoute(e) {
  const user = getCurrentUser();

  if (!user) {
    e.preventDefault(); // نمنع الدخول
    alert("You must login first!");
    window.location.href = basePath + "html/login.html";
  }
}

// ===================== UPDATE NAVBAR =====================
function updateNavbar() {
  if (!navLinks) return;

  const user = getCurrentUser();

  const dynamicLinks = navLinks.querySelectorAll(".dynamic");
  dynamicLinks.forEach(link => link.remove());

  if (user) {
    const logoutLi = document.createElement("li");
    logoutLi.classList.add("nav-item", "dynamic");

    const logoutLink = document.createElement("a");
    logoutLink.classList.add("nav-link", "text-danger", "fw-semibold");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = basePath + "html/login.html";
    });

    logoutLi.appendChild(logoutLink);
    navLinks.appendChild(logoutLi);

  } else {
    const loginLi = document.createElement("li");
    loginLi.classList.add("nav-item", "dynamic");

    const loginLink = document.createElement("a");
    loginLink.classList.add("nav-link");
    loginLink.href = basePath + "html/login.html";
    loginLink.textContent = "Login";

    loginLi.appendChild(loginLink);

    const signupLi = document.createElement("li");
    signupLi.classList.add("nav-item", "dynamic");

    const signupLink = document.createElement("a");
    signupLink.classList.add("nav-link");
    signupLink.href = basePath + "html/signup_new.html";
    signupLink.textContent = "Sign Up";

    signupLi.appendChild(signupLink);

    navLinks.appendChild(loginLi);
    navLinks.appendChild(signupLi);
  }
}

// ===================== APPLY PROTECTION =====================
document.addEventListener("DOMContentLoaded", () => {

  updateNavbar();

  // احمي صفحة cart
  const cartLink = document.querySelector(".cart-link");
  if (cartLink) {
    cartLink.addEventListener("click", protectRoute);
  }

  // احمي صفحة myOrders
  const ordersLink = document.querySelector(".orders-link");
  if (ordersLink) {
    ordersLink.addEventListener("click", protectRoute);
  }

});