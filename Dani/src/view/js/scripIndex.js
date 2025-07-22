// Load courses on page load
document.addEventListener("DOMContentLoaded", loadCourses);

async function carregarUsuarioLogado() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.warn("Usuário não está logado.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    if (!res.ok) throw new Error("Erro ao buscar usuário");

    const user = await res.json();

    // Exibe o nome do usuário na bolinha do perfil ou console
    //const perfil = document.querySelector(".perfil-bolinha");

    //if (perfil) {
    //   perfil.innerHTML = `<i class="fas fa-user"></i> <span class="ms-1">${user.name}</span>`;
    //}

    console.log("Usuário logado:", user);

  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarUsuarioLogado);

async function loadCourses() {
  try {
    const response = await fetch("http://localhost:3000/cursos");
    const courses = await response.json();

    const carouselContainer = $("#carousel-container");
    const coursesContainer = document.getElementById("courses-container");

    carouselContainer.trigger('destroy.owl.carousel');
    carouselContainer.html("");

    // Adiciona os itens no carrossel
    courses.forEach((course) => {
      const item = `
  <div class="item">
    <a href="./detalhes_curso.html?id=${course.id}">
      <img src="${course.imageUrl}" alt="${course.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px;">
    </a>
  </div>
`;

      carouselContainer.append(item);
    });

    carouselContainer.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });

    $(".carousel-prev").click(() => carouselContainer.trigger("prev.owl.carousel"));
    $(".carousel-next").click(() => carouselContainer.trigger("next.owl.carousel"));

    coursesContainer.innerHTML = "";
    courses.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.className =
        "course-card bg-white p-3 rounded shadow-sm d-flex gap-3";
      courseCard.innerHTML = `
        <div class="course-image rounded overflow-hidden" 
          style="width: 100px; height: 100px; flex-shrink: 0; background-image: url('${course.imageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        </div>
        <div class="flex-grow-1">
          <h5 class="mb-1">${course.title}</h5>
          <p class="small text-muted">${course.description}</p>
          <a href="./detalhes_curso.html?id=${course.id}" class="btn btn-outline-primary btn-sm">Ver Curso</a>
          <div class="mt-2 d-flex align-items-center gap-3">
            <div class="like-counter d-flex align-items-center gap-1">
              <i class="fas fa-thumbs-up like-btn"></i>
              <span class="like-count">0</span>
            </div>
            <div class="dislike-counter d-flex align-items-center gap-1">
              <i class="fas fa-thumbs-down dislike-btn"></i>
              <span class="dislike-count">0</span>
            </div>
          </div>
        </div>
        <div class="align-self-start ms-auto">
          <i class="far fa-star favorite-icon"></i>
        </div>
      `;
      coursesContainer.appendChild(courseCard);
    });

  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
  }
}


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
  if (confirm('Tem certeza que deseja excluir sua conta?')) {
    alert('Conta excluída!');
    configModal.style.display = 'none';
  }
}

function sair() {
  if (confirm('Tem certeza que deseja sair da sua conta?')) {
    configModal.style.display = 'none';
  }
}
