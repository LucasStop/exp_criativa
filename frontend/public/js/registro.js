const API_URL = "http://localhost:3001/api";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit);
  }
});

async function handleRegisterSubmit(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById("register-name").value,
    email: document.getElementById("register-email").value,
    phone: document.getElementById("register-phone").value,
    password: document.getElementById("register-password").value,
  };

  try {
    await API.auth.registro(userData);

    alert("Conta criada com sucesso! Você pode fazer login agora.");

    window.location.href = "/login.html";
  } catch (error) {
    alert(error.message || "Falha no registro. Por favor, tente novamente.");
  }
}
