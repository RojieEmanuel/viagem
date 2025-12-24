// Array para armazenar os destinos
let destinos = JSON.parse(localStorage.getItem('meusDestinos')) || [];

function renderizarLista() {
    const lista = document.getElementById('listaDestinos');
    lista.innerHTML = ''; // Limpa a lista antes de desenhar

    destinos.forEach((item, index) => {
        lista.innerHTML += `
            <div class="card item-destino">
                <div>
                    <strong>${item.nome}</strong> - R$ ${item.preco}
                </div>
                <button class="btn-delete" onclick="deletarDestino(${index})">Excluir</button>
            </div>
        `;
    });

    // Salva no LocalStorage para não perder ao atualizar
    localStorage.setItem('meusDestinos', JSON.stringify(destinos));
}

function adicionarDestino() {
    const nome = document.getElementById('inputDestino').value;
    const preco = document.getElementById('inputPreco').value;

    if (nome && preco) {
        destinos.push({ nome, preco });
        document.getElementById('inputDestino').value = ''; // Limpa campos
        document.getElementById('inputPreco').value = '';
        renderizarLista();
    } else {
        alert("Mano, preenche os campos aí!");
    }
}

function deletarDestino(index) {
    destinos.splice(index, 1); // Remove o item do array
    renderizarLista();
}

// Inicia o site mostrando o que já está salvo
renderizarLista();