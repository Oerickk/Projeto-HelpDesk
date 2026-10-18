// ======================================================================
// AULA 02 - SPA COM JAVASCRIPT PURO
// ======================================================================

// Array com dados temporários.
// Eles existem apenas enquanto a página está aberta.
const chamados = [
    {
        // Identificador único deste exemplo.
        id: 1,

        // Título curto.
        titulo: "Computador não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Aberto"
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema.",
        prioridade: "Média",
        status: "Em atendimento"
    },
    {
        // Identificador único deste exemplo.
        id: 3,

        // Título curto.
        titulo: "notebook não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Encerrado"
    }
];

// Procura o elemento <div id="app">.
// Guardaremos a referência para alterar a tela.
const app = document.getElementById("app");

// Função que desenha o Dashboard.
function mostrarDashboard() {

    // filter cria um novo array com chamados abertos.
    // length conta quantos existem.
    const abertos = chamados
        .filter(chamado => chamado.status === "Aberto")
        .length;

    // innerHTML substitui o conteúdo da área principal.
    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Total de chamados</h2>

                        <p class="display-6">
                            ${chamados.length}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="h5">Abertos</h2>

                        <p class="display-6">
                            ${abertos}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função que desenha a listagem.
function mostrarChamados() {

    app.innerHTML = `
        <h1 class="mb-4">Chamados</h1>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    ${
                        // map transforma cada objeto em uma linha HTML.
                        chamados.map(chamado => `
                            <tr>
                                <td>${chamado.id}</td>
                                <td>${chamado.titulo}</td>
                                <td>${chamado.prioridade}</td>
                                <td>${chamado.status}</td>
                            </tr>
                        `)
                        // join une todas as linhas sem vírgula.
                        .join("")
                    }
                </tbody>
            </table>
        </div>
    `;
}

// Função que desenha o formulário.
function mostrarNovoChamado() {

    app.innerHTML = `
        <h1 class="mb-4">Novo chamado</h1>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">
                    Título
                </label>

                <input
                    class="form-control"
                    id="titulo"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">
                    Descrição
                </label>

                <textarea
                    class="form-control"
                    id="descricao"
                    rows="4">
                </textarea>
            </div>

            <div class="mb-3">
                <label class="form-label" for="prioridade">
                    Prioridade
                </label>

                <select class="form-select" id="prioridade" required>
                    <option value="">Selecione</option>
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                </select>
            </div>

            <button class="btn btn-success" type="submit">
                Cadastrar
            </button>
        </form>
    `;

    // Procura o formulário que acabou de ser criado.
    const formulario = document.getElementById("formChamado");

    // Escuta o envio do formulário.
    formulario.addEventListener("submit", cadastrarChamado);
}

// Função executada no submit.
function cadastrarChamado(evento) {

    // Impede o navegador de recarregar a página.
    evento.preventDefault();

    // push adiciona um novo objeto no array.
    chamados.push({
        // ID simplificado para aula.
        id: chamados.length + 1,

        // Lê o valor do campo título.
        titulo: document.getElementById("titulo").value,

        // Lê o valor da descrição.
        descricao: document.getElementById("descricao").value,

        // Lê o valor selecionado.
        prioridade: document.getElementById("prioridade").value,

        // Novo chamado começa aberto.
        status: "Aberto"
    });

    // Depois do cadastro, mostra a lista.
    mostrarChamados();
}

// Seleciona todos os elementos que têm data-view.
const links = document.querySelectorAll("[data-view]");

// Percorre os links.
links.forEach(link => {

    // Escuta clique.
    link.addEventListener("click", evento => {

        // Impede navegação padrão.
        evento.preventDefault();

        // Lê data-view.
        const view = link.dataset.view;

        // Decide qual "tela" mostrar.
        if (view === "dashboard") {
            mostrarDashboard();
        }

        if (view === "chamados") {
            mostrarChamados();
        }

        if (view === "novo") {
            mostrarNovoChamado();
        }
    });
});

// Primeira tela.
mostrarDashboard();
