  const configModal = document.getElementById('config-modal');

  // Quando clicar em "Configurações"
  document.querySelectorAll('#overlay .overlay-button').forEach(btn => {
    if (btn.textContent.includes("Configurações")) {
      btn.addEventListener('click', () => {
        configModal.style.display = 'flex';
      });
    }
  });

  // Funções dos botões
  function voltar() {
    configModal.style.display = 'none';
  }

  function excluirConta() {
    if (confirm("Tem certeza que deseja excluir a conta?")) {
      alert("Conta excluída!");
      configModal.style.display = 'none';
    }
  }

  function sair() {
    alert("Saindo...");
    configModal.style.display = 'none';
  }

  // Fechar modal se clicar fora
  window.addEventListener('click', (e) => {
    if (e.target === configModal) {
      configModal.style.display = 'none';
    }
  });

