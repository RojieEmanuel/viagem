// 1. Carrega os dados salvos ou inicia um array vazio
let destinos = JSON.parse(localStorage.getItem('meusDestinos')) || [];

// 2. Função para mostrar/esconder o formulário
function toggleForm() {
    const form = document.getElementById('areaFormulario');
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
    } else {
        form.classList.add('hidden');
    }
}

// 3. Função para adicionar o destino
function adicionarDestino() {
    const cidadeInput = document.getElementById('inputCidade');
    const destinoInput = document.getElementById('inputDestino');
    const precoInput = document.getElementById('inputPreco');

    const cidade = cidadeInput.value.trim();
    const nome = destinoInput.value.trim();
    const preco = precoInput.value.trim();

    // Verificação de segurança (checagem de informação)
    if (cidade === "" || nome === "" || preco === "") {
        alert("Aí não, mano! Preenche todos os campos antes de salvar.");
        return;
    }

    // Adiciona ao array
    destinos.push({
        cidade: cidade,
        nome: nome,
        preco: parseFloat(preco).toFixed(2)
    });

    // Salva e atualiza a tela
    salvarEAtualizar();

    // Limpa os campos e esconde o form
    cidadeInput.value = "";
    destinoInput.value = "";
    precoInput.value = "";
    toggleForm();
}

// 4. Função para deletar
function deletarDestino(index) {
    destinos.splice(index, 1);
    salvarEAtualizar();
}

// 5. Salva no navegador e redesenha a lista
function salvarEAtualizar() {
    localStorage.setItem('meusDestinos', JSON.stringify(destinos));
    renderizarLista();
}

function renderizarLista() {
    const container = document.getElementById('listaCidades');
    container.innerHTML = '';

    // Agrupamento por cidade
    const agrupado = destinos.reduce((acc, item) => {
        if (!acc[item.cidade]) acc[item.cidade] = [];
        acc[item.cidade].push(item);
        return acc;
    }, {});

    for (let cidade in agrupado) {
        let secaoCidade = document.createElement('section');
        secaoCidade.className = 'cidade-group';
        
        let htmlDestinos = agrupado[cidade].map((d, i) => `
            <div class="item-destino card">
                <span><strong>${d.nome}</strong> - R$ ${d.preco}</span>
                <button class="btn-delete" onclick="deletarDestino(${destinos.indexOf(d)})">Excluir</button>
            </div>
        `).join('');

        secaoCidade.innerHTML = `
            <span class="cidade-titulo">${cidade}</span>
            ${htmlDestinos}
        `;
        container.appendChild(secaoCidade);
    }
}

// Inicializa a lista ao abrir a página
renderizarLista();
