const API_URL = "http://localhost:3001/api";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
});

async function handleLoginSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await API.auth.login({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/";
  } catch (error) {
    alert(
      error.message ||
        "Falha na autenticação. Verifique suas credenciais e tente novamente."
    );
  }
}
