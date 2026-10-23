const chamados = [
  {
    id: 1,
    titulo: "Computador não liga",
    descricao: "O computador não apresenta sinal de energia.",
    prioridade: "Alta",
    status: "Aberto",
    solucao: "",
  },
  {
    id: 2,
    titulo: "Senha bloqueada",
    descricao: "Usuário não consegue acessar o sistema.",
    prioridade: "Média",
    status: "Em atendimento",
    solucao: "",
  },
  {
    id: 3,
    titulo: "Notebook não liga",
    descricao: "O equipamento não inicia após pressionar o botão de energia.",
    prioridade: "Alta",
    status: "Encerrado",
    solucao:
      "Foi realizada a verificação da alimentação e o equipamento voltou a iniciar.",
  },
];

const prioridades = ["Baixa", "Média", "Alta"];

// NOVO: opções de status para cadastrar chamados.
const statusDisponiveis = ["Aberto", "Em atendimento"];

const app = document.getElementById("app");

function badgePrioridade(prioridade) {
  const classes = {
    Baixa: "text-bg-success",
    Média: "text-bg-warning",
    Alta: "text-bg-danger prioridade-alta",
  };

  return `<span class="badge ${classes[prioridade] || "text-bg-secondary"}">${escapar(prioridade)}</span>`;
}

function badgeStatus(status) {
  const classes = {
    Aberto: "text-bg-primary",
    "Em atendimento": "text-bg-warning",
    Encerrado: "text-bg-success",
  };

  return `<span class="badge ${classes[status] || "text-bg-secondary"}">${escapar(status)}</span>`;
}

function escapar(valor = "") {
  return String(valor).replace(
    /[&<>"']/g,
    (caractere) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[caractere],
  );
}

function mostrarDashboard() {
  const total = chamados.length;
  const abertos = chamados.filter((c) => c.status === "Aberto").length;
  const atendimento = chamados.filter(
    (c) => c.status === "Em atendimento",
  ).length;
  const encerrados = chamados.filter((c) => c.status === "Encerrado").length;
  const alta = chamados.filter((c) => c.prioridade === "Alta").length;

  const indicadores = [
    ["Total de chamados", total, "primary"],
    ["Chamados abertos", abertos, "primary"],
    ["Em atendimento", atendimento, "warning"],
    ["Chamados encerrados", encerrados, "success"],
    ["Prioridade alta", alta, "danger"],
  ];

  app.innerHTML = `
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
            <div>
                <h1 class="h2 mb-1">Dashboard</h1>
                <p class="text-secondary mb-0">Resumo geral dos atendimentos.</p>
            </div>
            <button class="btn btn-primary" onclick="mostrarNovoChamado()">+ Novo chamado</button>
        </div>

        <div class="row g-3">
            ${indicadores
              .map(
                ([titulo, valor, cor]) => `
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm indicador indicador-${cor}">
                        <div class="card-body">
                            <p class="text-secondary mb-2">${titulo}</p>
                            <p class="display-5 fw-semibold mb-0">${valor}</p>
                        </div>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>`;
}

function mostrarChamados() {
  app.innerHTML = `
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
            <div>
                <h1 class="h2 mb-1">Chamados</h1>
                <p class="text-secondary mb-0">Consulte e gerencie os chamados cadastrados.</p>
            </div>
            <button class="btn btn-primary" onclick="mostrarNovoChamado()">+ Novo chamado</button>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Prioridade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${chamados
                          .map(
                            (c) => `
                            <tr>
                                <td class="fw-semibold">#${c.id}</td>
                                <td>${escapar(c.titulo)}</td>
                                <td>${badgePrioridade(c.prioridade)}</td>
                                <td>${badgeStatus(c.status)}</td>
                                <td>
                                    <div class="d-flex flex-wrap gap-2">
                                        <button class="btn btn-sm btn-outline-primary"
                                            onclick="mostrarDetalhes(${c.id})">
                                            Visualizar
                                        </button>

                                        ${
                                          c.status !== "Encerrado"
                                            ? `<button class="btn btn-sm btn-success"
                                                onclick="mostrarEncerramento(${c.id})">
                                                Encerrar chamado
                                               </button>`
                                            : `<button class="btn btn-sm btn-outline-secondary" disabled>
                                                Encerrado
                                               </button>`
                                        }
                                    </div>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>`;
}

function mostrarNovoChamado() {
  app.innerHTML = `
        <div class="formulario-card card border-0 shadow-sm">
            <div class="card-body p-4">
                <button class="btn btn-link px-0 text-decoration-none"
                    onclick="mostrarChamados()">
                    ← Voltar para chamados
                </button>

                <h1 class="h2 mb-4">Novo chamado</h1>

                <form id="formChamado" novalidate>
                    <div class="mb-3">
                        <label class="form-label" for="titulo">
                            Título <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" id="titulo" maxlength="100" required>
                        <div class="invalid-feedback">
                            Informe o título do chamado.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="descricao">
                            Descrição <span class="text-danger">*</span>
                        </label>
                        <textarea class="form-control" id="descricao" rows="4" required></textarea>
                        <div class="invalid-feedback">
                            Informe a descrição do chamado.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="prioridade">
                            Prioridade <span class="text-danger">*</span>
                        </label>

                        <select class="form-select" id="prioridade" required>
                            <option value="">Selecione uma prioridade</option>
                            ${prioridades
                              .map(
                                (p) =>
                                  `<option value="${escapar(p)}">${escapar(p)}</option>`,
                              )
                              .join("")}
                        </select>

                        <div class="invalid-feedback">
                            Selecione uma prioridade.
                        </div>
                    </div>

                    <!-- NOVO: permite escolher o status no cadastro. -->
                    <div class="mb-4">
                        <label class="form-label" for="status">
                            Status <span class="text-danger">*</span>
                        </label>

                        <select class="form-select" id="status" required>
                            ${statusDisponiveis
                              .map(
                                (s) => `
                                <option value="${escapar(s)}"
                                    ${s === "Aberto" ? "selected" : ""}>
                                    ${escapar(s)}
                                </option>
                            `,
                              )
                              .join("")}
                        </select>

                        <div class="invalid-feedback">
                            Selecione o status do chamado.
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">
                        Cadastrar chamado
                    </button>
                </form>
            </div>
        </div>`;

  document
    .getElementById("formChamado")
    .addEventListener("submit", cadastrarChamado);
}

function cadastrarChamado(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;

  if (!formulario.checkValidity()) {
    formulario.classList.add("was-validated");
    return;
  }

  const novoId = chamados.length
    ? Math.max(...chamados.map((c) => c.id)) + 1
    : 1;

  chamados.push({
    id: novoId,
    titulo: document.getElementById("titulo").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    prioridade: document.getElementById("prioridade").value,

    // ALTERADO: usa o status selecionado no formulário.
    status: document.getElementById("status").value,

    solucao: "",
  });

  mostrarChamados();
}

function encontrarChamado(id) {
  return chamados.find((c) => c.id === Number(id));
}

function mostrarDetalhes(id) {
  const c = encontrarChamado(id);

  if (!c) return mostrarChamados();

  app.innerHTML = `
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">

                <button class="btn btn-link px-0 text-decoration-none"
                    onclick="mostrarChamados()">
                    ← Voltar para chamados
                </button>

                <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-4">
                    <div>
                        <p class="text-secondary mb-1">
                            Detalhes do chamado #${c.id}
                        </p>
                        <h1 class="h2 mb-0">${escapar(c.titulo)}</h1>
                    </div>

                    ${badgeStatus(c.status)}
                </div>

                <dl class="row detalhe-lista">
                    <dt class="col-sm-3">Número</dt>
                    <dd class="col-sm-9">#${c.id}</dd>

                    <dt class="col-sm-3">Descrição</dt>
                    <dd class="col-sm-9 texto-descricao">
                        ${escapar(c.descricao)}
                    </dd>

                    <dt class="col-sm-3">Prioridade</dt>
                    <dd class="col-sm-9">
                        ${badgePrioridade(c.prioridade)}
                    </dd>

                    <dt class="col-sm-3">Status atual</dt>
                    <dd class="col-sm-9">
                        ${badgeStatus(c.status)}
                    </dd>

                    ${
                      c.status === "Encerrado"
                        ? `
                        <dt class="col-sm-3">Solução realizada</dt>
                        <dd class="col-sm-9 texto-descricao">
                            ${escapar(c.solucao || "Nenhuma solução registrada.")}
                        </dd>
                    `
                        : ""
                    }
                </dl>

                <!-- NOVO: alteração de status dentro dos detalhes -->
                ${
                  c.status !== "Encerrado"
                    ? `
                    <div class="border rounded-3 p-3 mb-3">
                        <h2 class="h5 mb-3">Alterar status do chamado</h2>

                        <form id="formAlterarStatus">
                            <label for="novoStatus" class="form-label">
                                Selecione o novo status
                            </label>

                            <select id="novoStatus" class="form-select mb-3">
                                <option value="Aberto"
                                    ${c.status === "Aberto" ? "selected" : ""}>
                                    Aberto
                                </option>

                                <option value="Em atendimento"
                                    ${c.status === "Em atendimento" ? "selected" : ""}>
                                    Em atendimento
                                </option>
                            </select>

                            <button class="btn btn-primary" type="submit">
                                Salvar status
                            </button>
                        </form>
                    </div>

                    <button class="btn btn-success"
                        onclick="mostrarEncerramento(${c.id})">
                        Encerrar chamado
                    </button>
                `
                    : `
                    <button class="btn btn-outline-secondary" disabled>
                        Chamado encerrado
                    </button>
                `
                }

            </div>
        </div>`;

  const formularioStatus = document.getElementById("formAlterarStatus");

  if (formularioStatus) {
    formularioStatus.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const novoStatus = document.getElementById("novoStatus").value;

      c.status = novoStatus;

      mostrarDetalhes(c.id);
    });
  }
}

function mostrarEncerramento(id) {
  const c = encontrarChamado(id);

  if (!c || c.status === "Encerrado") return mostrarDetalhes(id);

  app.innerHTML = `
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <button class="btn btn-link px-0 text-decoration-none"
                    onclick="mostrarDetalhes(${c.id})">
                    ← Voltar para detalhes
                </button>

                <h1 class="h2 mb-1">Encerrar chamado #${c.id}</h1>
                <p class="text-secondary mb-4">
                    Registre o procedimento realizado antes de confirmar o encerramento.
                </p>

                <div class="bg-light rounded-3 p-3 mb-4">
                    <h2 class="h5">${escapar(c.titulo)}</h2>
                    <p class="mb-3 texto-descricao">${escapar(c.descricao)}</p>
                    <p class="mb-2">
                        <strong>Prioridade:</strong> ${badgePrioridade(c.prioridade)}
                    </p>
                    <p class="mb-0">
                        <strong>Status atual:</strong> ${badgeStatus(c.status)}
                    </p>
                </div>

                <form id="formEncerramento" novalidate>
                    <div class="mb-3">
                        <label for="solucao" class="form-label fw-semibold">
                            Solução realizada <span class="text-danger">*</span>
                        </label>

                        <textarea id="solucao" class="form-control" rows="5"
                            placeholder="Descreva o procedimento utilizado para resolver o problema..."
                            required></textarea>

                        <div class="invalid-feedback">
                            O preenchimento da solução é obrigatório para encerrar o chamado.
                        </div>
                    </div>

                    <div id="mensagemErro" class="alert alert-danger d-none" role="alert">
                        Informe a solução realizada antes de encerrar o chamado.
                    </div>

                    <button class="btn btn-success" type="submit">
                        Confirmar encerramento
                    </button>

                    <button class="btn btn-outline-secondary ms-2" type="button"
                        onclick="mostrarDetalhes(${c.id})">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>`;

  document
    .getElementById("formEncerramento")
    .addEventListener("submit", (evento) => {
      evento.preventDefault();

      const campo = document.getElementById("solucao");
      const solucao = campo.value.trim();

      if (!solucao) {
        campo.classList.add("is-invalid");
        document.getElementById("mensagemErro").classList.remove("d-none");
        campo.focus();
        return;
      }

      c.solucao = solucao;
      c.status = "Encerrado";

      mostrarDetalhes(c.id);
    });
}

document.querySelectorAll("[data-view]").forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();

    const view = link.dataset.view;

    if (view === "dashboard") mostrarDashboard();
    if (view === "chamados") mostrarChamados();
    if (view === "novo") mostrarNovoChamado();
  });
});

mostrarDashboard();
