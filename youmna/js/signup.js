// //start to sign up
// عناصر الصفحة
const registerForm = document.getElementById("registerForm");
const errorMsg = document.getElementById("error");
const successMsg = document.getElementById("success");

const BASE_URL = "http://localhost:3000"; // بدون /users لأننا هنضيفه في الفetch

// استماع للفورم
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // جلب القيم
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // مسح الرسائل
  errorMsg.textContent = "";
  successMsg.textContent = "";

  // التحقق من الفراغ
  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required";
    return;
  }

  // التحقق من تطابق الباسورد
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match";
    return;
  }

  try {
    // التحقق إذا الإيميل موجود
    const checkEmail = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
    const emailData = await checkEmail.json();

    if (emailData.length > 0) {
      errorMsg.textContent = "Email already exists";
      return;
    }

    // تسجيل المستخدم الجديد مع role تلقائي
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "customer" //  كل مستخدم جديد customer
      }),
    });

    if (!response.ok) {
      throw new Error("Error registering user");
    }

    successMsg.textContent = "Account created successfully 🎉";

    // تحويل لصفحة Login بعد ثانية ونص
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    console.error(error);
    errorMsg.textContent = "Something went wrong. Try again later";
  }
});

// //end to sign up
