const BASE_URL = "http://localhost:3000";

// عناصر الفورم
const registerForm = document.getElementById("registerForm");

// عناصر الأخطاء لكل input
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// مسح جميع الأخطاء
function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  let hasError = false;

  // التحقق من الاسم
  if (!name) {
    nameError.textContent = "Name is required";
    hasError = true;
  } else {
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]{3,}$/;
    if (!nameRegex.test(name)) {
      nameError.textContent =
        "Name must be at least 3 letters and contain only letters";
      hasError = true;
    }
  }

  // التحقق من الايميل
  if (!email) {
    emailError.textContent = "Email is required";
    hasError = true;
  }

  // التحقق من الباسورد
  if (!password) {
    passwordError.textContent = "Password is required";
    hasError = true;
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      passwordError.textContent =
        "Password must be at least 8 chars, include uppercase, lowercase, number, and special char";
      hasError = true;
    }
  }

  // التحقق من تأكيد الباسورد
  if (!confirmPassword) {
    confirmPasswordError.textContent = "Confirm Password is required";
    hasError = true;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match";
    hasError = true;
  }

  if (hasError) return;

  // التحقق من الايميل في السيرفر
  try {
    const checkEmail = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
    const emailData = await checkEmail.json();
    if (emailData.length > 0) {
      emailError.textContent = "Email already exists";
      return;
    }

    // تسجيل المستخدم
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "customer" }),
    });

    if (!response.ok) throw new Error("Error registering user");

    alert("Account created successfully 🎉");
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again later");
  }
});
