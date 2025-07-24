document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Usuário não está logado.");
    window.location.href = "cadastroELogin.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await response.json();

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;

    if (user.avatarUrl) {
      document.getElementById("profile-avatar").src = user.avatarUrl;
    }

    document
      .getElementById("avatar-input")
      .addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const uploadRes = await fetch(
          `http://localhost:3000/upload-avatar/${userId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await uploadRes.json();
        if (uploadRes.ok) {
          document.getElementById("profile-avatar").src = result.avatarUrl;
          alert("Avatar atualizado com sucesso!");
        } else {
          alert("Erro ao atualizar avatar: " + result.message);
        }
      });
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    alert("Erro ao carregar perfil.");
  }
});

// Fora da função DOMContentLoaded
function excluirConta() {
  if (confirm("Tem certeza que deseja excluir sua conta?")) {
    alert("Conta excluída!");
    localStorage.removeItem("userId");
    window.location.href = "login.html";
  }
}

function sair() {
  if (confirm("Tem certeza que deseja sair da sua conta?")) {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
  }
}
