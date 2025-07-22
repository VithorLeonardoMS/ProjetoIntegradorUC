// Alternância de telas
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const container = document.querySelector('.container');

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

// Cadastro
const registerForm = document.querySelector(".form-box.register form");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = registerForm.querySelector('input[placeholder="Nome"]').value;
  const email = registerForm.querySelector('input[placeholder="Email"]').value;
  const password = registerForm.querySelector('input[placeholder="Senha"]').value;

  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || "Cadastro realizado");

  // Alternar automaticamente para login após cadastro
  container.classList.remove('active');
});

// Login
const loginForm = document.querySelector(".form-box.login form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[placeholder="Email"]').value;
  const password = loginForm.querySelector('input[placeholder="Senha"]').value;

  const res = await fetch("http://localhost:3000/usersLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok && data.id) {
    localStorage.setItem("userId", data.id);
    window.location.href = "index.html";
  } else {
    alert(data.message || "Erro ao fazer login");
  }
});

  const data = await res.json();

  if (res.ok && data.id) {
    localStorage.setItem("userId", data.id);
    window.location.href = "index.html";
  } else {
    alert(data.message || "Erro ao fazer login");
  }

