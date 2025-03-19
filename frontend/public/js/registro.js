const API_URL = "http://localhost:3001/api";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit);
  }
  
  // Adiciona validação em tempo real para cada campo
  document.getElementById("register-name").addEventListener("input", function() {
    validateField(this, validateName, "name-error", "Digite pelo menos nome e sobrenome");
  });
  
  document.getElementById("register-email").addEventListener("input", function() {
    validateField(this, validateEmail, "email-error", "Utilize um formato válido (usuario@email.com)");
  });
  
  document.getElementById("register-phone").addEventListener("input", function() {
    validateField(this, validatePhone, "phone-error", "Use o formato (00) 00000-0000");
  });
  
  document.getElementById("register-cpf").addEventListener("input", function() {
    validateField(this, validateCPF, "cpf-error", "Use o formato 000.000.000-00");
  });
  
  document.getElementById("register-password").addEventListener("input", function() {
    validateField(this, validatePassword, "password-error", "A senha deve ter pelo menos 5 caracteres");
  });
  
  document.getElementById("register-confirm-password").addEventListener("input", function() {
    const password = document.getElementById("register-password").value;
    if (this.value !== password) {
      this.classList.add("invalid-input");
      document.getElementById("confirm-password-error").textContent = "As senhas não coincidem";
    } else {
      this.classList.remove("invalid-input");
      document.getElementById("confirm-password-error").textContent = "";
    }
  });
});

// Função genérica para validar um campo
function validateField(inputElement, validationFunction, errorElementId, errorMessage) {
  const value = inputElement.value.trim();
  const errorElement = document.getElementById(errorElementId);
  
  if (value === "") {
    errorElement.textContent = "";
    inputElement.classList.remove("invalid-input");
    return;
  }
  
  if (!validationFunction(value)) {
    inputElement.classList.add("invalid-input");
    errorElement.textContent = errorMessage;
  } else {
    inputElement.classList.remove("invalid-input");
    errorElement.textContent = "";
  }
}

// Funções de validação
function validateName(name) {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ ][a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/; // Nome com pelo menos duas palavras
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePhone(phone) {
  // Aceita formatos: (00) 00000-0000 ou 00000000000
  const regex = /^(?:\(\d{2}\)\s?)?\d{5}-?\d{4}$/;
  return regex.test(phone);
}

function validateCPF(cpf) {
  // Aceita formatos: 000.000.000-00 ou 00000000000
  const regex = /^(\d{3}\.){2}\d{3}-\d{2}$|^\d{11}$/;
  return regex.test(cpf);
}

function validatePassword(password) {
  return password.length >= 5;
}

async function handleRegisterSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("register-name");
  const emailInput = document.getElementById("register-email");
  const phoneInput = document.getElementById("register-phone");
  const cpfInput = document.getElementById("register-cpf");
  const passwordInput = document.getElementById("register-password");
  const confirmPasswordInput = document.getElementById("register-confirm-password");
  
  // Limpa todas as mensagens de erro anteriores
  clearAllErrors();
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const cpf = cpfInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validar todos os campos
  let isValid = true;

  if (!validateName(name)) {
    isValid = false;
    showError(nameInput, "name-error", "Digite pelo menos nome e sobrenome");
  }

  if (!validateEmail(email)) {
    isValid = false;
    showError(emailInput, "email-error", "Utilize um formato válido (exemplo@dominio.com)");
  }

  if (!validatePhone(phone)) {
    isValid = false;
    showError(phoneInput, "phone-error", "Use o formato (00) 00000-0000");
  }

  if (!validateCPF(cpf)) {
    isValid = false;
    showError(cpfInput, "cpf-error", "Use o formato 000.000.000-00");
  }

  if (!validatePassword(password)) {
    isValid = false;
    showError(passwordInput, "password-error", "A senha deve ter pelo menos 5 caracteres");
  }
  
  if (password !== confirmPassword) {
    isValid = false;
    showError(confirmPasswordInput, "confirm-password-error", "As senhas não coincidem");
  }

  if (!isValid) {
    return;
  }
  
  const userData = {
    name: name,
    email: email,
    phone: phone,
    cpf: cpf,
    password: password,
  };

  console.log("Dados do formulário:", userData);
}

// Funções auxiliares
function showError(inputElement, errorElementId, errorMessage) {
  inputElement.classList.add("invalid-input");
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = errorMessage;
}

function clearAllErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(element => {
    element.textContent = "";
  });
  
  const invalidInputs = document.querySelectorAll(".invalid-input");
  invalidInputs.forEach(element => {
    element.classList.remove("invalid-input");
  });
}
