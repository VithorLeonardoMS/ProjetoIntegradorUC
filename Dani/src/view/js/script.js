document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Usuário não está logado.");
    window.location.href = "cadastroELogin.html";
    return;
  }

  try {
    // Pega dados do usuário
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    const user = await response.json();

    document.getElementById("user-name").textContent = user.name || "Usuário";
    document.getElementById("user-email").textContent = user.email || "email@exemplo.com";

    if (user.avatarUrl) {
      document.getElementById("profile-avatar").src = `http://localhost:3000${user.avatarUrl}`;
    }
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
    alert("Erro ao carregar perfil do usuário.");
  }

  // As funções devem estar aqui, fora do try
  document.getElementById("btn-excluir")?.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {
      alert("Conta excluída!");
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  });

  document.getElementById("btn-sair")?.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  });
});
