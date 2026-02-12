const projects = [
  {
    title: "Gestão Financeira (C#)",
    type: "fullstack",
    description:
      "Projeto em C# (base para evoluir com camadas, persistência e UI).",
    stack: ["C#", ".NET"],
    repo: "https://github.com/willchapuis/gestao-financeira",
    demo: null,
  },
  {
    title: "Simplex Calculator (Python)",
    type: "backend",
    description:
      "Implementação do algoritmo Simplex (max/min), com iterações e análise de sensibilidade.",
    stack: ["Python", "Algoritmos"],
    repo: "https://github.com/willchapuis/Simplex",
    demo: null,
  },
  {
    title: "Gestão Básica de Eventos (Java)",
    type: "backend",
    description:
      "Sistema em console para gerenciar evento (pessoas, salas, espaços de café, consultas).",
    stack: ["Java", "POO"],
    repo: "https://github.com/willchapuis/gestaobasico",
    demo: null,
  },
  {
    title: "Trilha de Aprendizado Web",
    type: "frontend",
    description:
      "Repositório com etapas de aprendizado (HTML/CSS/SCSS) com objetivo final de um portfólio moderno.",
    stack: ["HTML", "CSS", "SCSS"],
    repo: "https://github.com/willchapuis/aprender-web-inicio",
    demo: null,
  },
];

const grid = document.getElementById("projectsGrid");
const filters = document.querySelectorAll(".filter");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

function projectCard(p) {
  const wrapper = document.createElement("div");
  wrapper.className = "card";
  wrapper.dataset.type = p.type;

  wrapper.innerHTML = `
    <div class="card__body">
      <div class="project__top">
        <h3 class="project__title">${p.title}</h3>
        <span class="tag">${labelType(p.type)}</span>
      </div>
      <p class="project__desc">${p.description}</p>

      <div class="project__meta">
        ${p.stack.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>

      <div class="project__links">
        <a class="link" href="${p.repo}" target="_blank" rel="noreferrer">Código</a>
        ${
          p.demo
            ? `<a class="link" href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>`
            : ""
        }
      </div>
    </div>
  `;
  return wrapper;
}

function labelType(type) {
  if (type === "frontend") return "Front";
  if (type === "backend") return "Back";
  return "Full Stack";
}

function render(filter = "all") {
  grid.innerHTML = "";
  const list = filter === "all" ? projects : projects.filter((p) => p.type === filter);
  list.forEach((p) => grid.appendChild(projectCard(p)));
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

render();

/* Theme toggle */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "light" ? "☀" : "☾";
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* Contact helper (no backend needed) */
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const msg = (data.get("message") || "").toString().trim();

  const text = `Olá! Meu nome é ${name}. ${msg}`;
  await navigator.clipboard.writeText(text);

  const hint = document.getElementById("formHint");
  hint.textContent = "Mensagem copiada ✅ Agora é só colar onde preferir.";
  setTimeout(() => (hint.textContent = "(Isso copia o texto — você cola no LinkedIn/WhatsApp/email. GitHub Pages não precisa backend.)"), 3500);
  form.reset();
});
