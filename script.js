let destinos = JSON.parse(localStorage.getItem('meusDestinos')) || [];

function toggleForm() {
    const form = document.getElementById('areaFormulario');
    form.classList.toggle('hidden');
}

function adicionarDestino() {
    const cidade = document.getElementById('inputCidade').value;
    const nome = document.getElementById('inputDestino').value;
    const preco = document.getElementById('inputPreco').value;

    if (cidade && nome && preco) {
        destinos.push({ cidade, nome, preco });
        localStorage.setItem('meusDestinos', JSON.stringify(destinos));
        
        // Limpa e fecha
        document.getElementById('inputCidade').value = '';
        document.getElementById('inputDestino').value = '';
        document.getElementById('inputPreco').value = '';
        toggleForm();
        renderizarLista();
    } else {
        alert("Mano, preenche todos os campos, inclusive a cidade!");
    }
}

function renderizarLista() {
    const container = document.getElementById('listaCidades');
    container.innerHTML = '';

    // Agrupando destinos por cidade
    const agrupadoPorCidade = destinos.reduce((acc, item) => {
        if (!acc[item.cidade]) {
            acc[item.cidade] = [];
        }
        acc[item.cidade].push(item);
        return acc;
    }, {});

    // Criando o HTML para cada cidade
    for (let cidade in agrupadoPorCidade) {
        let htmlCidade = `
            <div class="cidade-group">
                <span class="cidade-titulo">${cidade}</span>
                ${agrupadoPorCidade[cidade].map((d, index) => `
                    <div class="item-destino card">
                        <span><strong>${d.nome}</strong> - R$ ${d.preco}</span>
                        <button class="btn-delete" onclick="deletarDestino('${d.nome}')">Excluir</button>
                    </div>
                `).join('')}
            </div>
        `;
        container.innerHTML += htmlCidade;
    }
}

function deletarDestino(nomeDestino) {
    destinos = destinos.filter(d => d.nome !== nomeDestino);
    localStorage.setItem('meusDestinos', JSON.stringify(destinos));
    renderizarLista();
}

renderizarLista();
