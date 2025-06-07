let carrinho = [];

function adicionarAoCarrinho(nome) {
    const nomeId = nome.toLowerCase().replace(/\s+/g, '-');
    const tamanho = document.querySelector(`input[name="${nome}-tamanho"]:checked`);
    const quantidadeInput = document.getElementById(`${nome}-quantidade`);
    const qtd = quantidadeInput ? parseInt(quantidadeInput.value) : 1;

    if (!tamanho) {
        alert(`Selecione um tamanho para a pizza ${nome}`);
        return;
    }

    const tamanhoValor = tamanho.value;

    // Preços base (exemplo, ideal: vir do HTML ou JSON externo)
    const precos = {
        P: 23.99,
        M: 28.99,
        G: 33.99
    };

    // Verifica se a pizza tem valores específicos
    const pizzaBox = quantidadeInput.closest('.pizza-box');
    const valoresDiv = pizzaBox.querySelector('.valores');
    if (valoresDiv) {
        const valores = valoresDiv.textContent.replace(/R\$/g, '').split('|').map(v => parseFloat(v.trim()));
        if (valores.length === 3) {
            precos.P = valores[0];
            precos.M = valores[1];
            precos.G = valores[2];
        }
    }

    let precoBase = precos[tamanhoValor];

    // Verifica borda
    const bordaSelecionada = document.querySelector('input[name="borda"]:checked');
    const borda = bordaSelecionada ? bordaSelecionada.value : 'Nenhuma';
    let valorBorda = 0;
    if (borda === 'Chocolate') valorBorda = 12;
    else if (borda !== 'Nenhuma') valorBorda = 10;

    const precoFinal = precoBase + valorBorda;

    carrinho.push({ nome, tamanho: tamanhoValor, qtd, preco: precoFinal, borda });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.qtd * item.preco;
        total += subtotal;
        const li = document.createElement("li");
        li.textContent = `${item.qtd}x ${item.nome} (${item.tamanho})` +
            (item.borda && item.borda !== 'Nenhuma' ? ` c/ borda ${item.borda}` : '') +
            ` - R$ ${subtotal.toFixed(2)}`;
        lista.appendChild(li);
    });

    document.getElementById("contadorItens").textContent = carrinho.length;
    document.getElementById("totalCarrinho").textContent = `Total: R$ ${total.toFixed(2)}`;

    const mensagem = carrinho.map(i =>
        `${i.qtd}x ${i.nome} (${i.tamanho})${i.borda && i.borda !== 'Nenhuma' ? ` com borda ${i.borda}` : ''}`
    ).join('%0A');

    const url = `https://wa.me/SEUNUMEROAQUI?text=Pedido:%0A${mensagem}%0ATotal: R$ ${total.toFixed(2)}`;
    document.getElementById("enviarWhatsapp").href = url;
}

function mostrarSecao(id) {
    document.querySelectorAll('.secao').forEach(secao => {
        secao.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

document.getElementById("abrirCarrinho").onclick = () => {
    document.getElementById("painelCarrinho").style.display = "block";
};

function fecharCarrinho() {
    document.getElementById("painelCarrinho").style.display = "none";
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = 'finalizar.html';
}

