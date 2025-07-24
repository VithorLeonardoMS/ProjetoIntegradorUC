const overlay = document.getElementById('overlay');
const configModal = document.getElementById('config-modal');

document.querySelector('.perfil-bolinha').addEventListener('click', () => {
  overlay.classList.add('show');
});

document.addEventListener('click', (e) => {
  const content = document.getElementById('overlay-content');
  if (!content.contains(e.target) && !e.target.closest('.perfil-bolinha')) {
    overlay.classList.remove('show');
  }
});

document.querySelectorAll('#overlay a').forEach(link => {
  link.addEventListener('click', () => {
    overlay.classList.remove('show');
  });
});

function excluirConta() {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {
      alert("Conta excluída!");
      localStorage.removeItem("userId");
      window.location.href = "cadastroELogin.html";
    }
  }
  
  function sair() {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
      window.location.href = "cadastroELogin.html";
    }
  }