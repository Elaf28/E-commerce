const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");
const BASE_URL = "http://localhost:3000/users";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorMsg.textContent = "";

  if (!email || !password) {
    errorMsg.textContent = "All fields are required";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
    if (!response.ok) throw new Error("Server Error");

    const data = await response.json();

    if (data.length > 0) {
      const user = data[0];
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "Home.html";
      }
    } else {
      errorMsg.textContent = "Invalid email or password";
    }
  } catch (err) {
    errorMsg.textContent = "Something went wrong. Try again later";
  }
});