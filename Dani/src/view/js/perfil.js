document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      alert("Usuário não está logado.");
      window.location.href = "cadastroELogin.html";
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) throw new Error("Erro ao carregar dados do usuário");
  
      const user = await response.json();
  
      const nomeElement = document.getElementById("user-name");
      nomeElement.textContent = user.name;
      const emailElement = document.getElementById("user-email");
      emailElement.textContent = user.email;
      // Se quiser adicionar descrição, email, etc, pode usar user.email, user.bio, etc
      // document.getElementById("user-description").textContent = user.email;
  
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar perfil.");
    }
  });
  
  function excluirConta() {
    if (confirm('Tem certeza que deseja excluir sua conta?')) {
      alert('Conta excluída!');
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  }
  
  function sair() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  }
  