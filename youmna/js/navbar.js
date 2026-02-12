const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.querySelector(".cart-count");

let totalQty = 0;
cart.forEach(item => (totalQty += item.qty));

cartCount.textContent = `(${totalQty})`;

//cart
const cartCountElement = document.querySelector(".cart-count");

function updateCartCount() {
  fetch("http://localhost:3000/carts")
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

// أول ما الصفحة تفتح
updateCartCount();

//logout
const navLinks = document.getElementById("nav-links");

// نجيب المستخدم الحالي من localStorage
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// تحديث الروابط في النافبار حسب الحالة
function updateNavbar() {
  const user = getCurrentUser();

  // نزيل أي رابط موجود مسبقاً في النهاية (Logout / Login / SignUp)
  const dynamicLinks = navLinks.querySelectorAll(".dynamic");
  dynamicLinks.forEach(link => link.remove());

  if (user) {
    // لو موجود يوزر → نعرض Logout
    const logoutLi = document.createElement("li");
    logoutLi.classList.add("nav-item", "dynamic");
    const logoutLink = document.createElement("a");
    logoutLink.classList.add("nav-link", "text-danger", "fw-semibold");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("user"); // مسح البيانات
      updateNavbar(); // تحديث النافبار بعد الخروج
      window.location.href = "login.html"; // تحويل لصفحة login
    });

    logoutLi.appendChild(logoutLink);
    navLinks.appendChild(logoutLi);
  } else {
    // لو مفيش يوزر → نعرض Login و Sign Up
    const loginLi = document.createElement("li");
    loginLi.classList.add("nav-item", "dynamic");
    const loginLink = document.createElement("a");
    loginLink.classList.add("nav-link");
    loginLink.href = "login.html";
    loginLink.textContent = "Login";
    loginLi.appendChild(loginLink);

    const signupLi = document.createElement("li");
    signupLi.classList.add("nav-item", "dynamic");
    const signupLink = document.createElement("a");
    signupLink.classList.add("nav-link");
    signupLink.href = "register.html";
    signupLink.textContent = "Sign Up";
    signupLi.appendChild(signupLink);

    navLinks.appendChild(loginLi);
    navLinks.appendChild(signupLi);
  }
}

// أول ما الصفحة تحمل
updateNavbar();
