function mostrarSecao(secaoId) {
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    const ativa = document.getElementById(secaoId);
    if (ativa) ativa.style.display = 'block';
}

let carrinho = [];

function adicionarAoCarrinho(nome) {
    const nomeId = nome.toLowerCase();
    const tamanho = document.querySelector(`input[name="${nomeId}-tamanho"]:checked`).value;
    const qtd = parseInt(document.getElementById(`${nomeId}-quantidade`).value);

    const precos = { P: 22.99, M: 27.99, G: 32.99 };
    const preco = precos[tamanho];

    carrinho.push({ nome, tamanho, qtd, preco });
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
        li.textContent = `${item.qtd}x ${item.nome} (${item.tamanho}) - R$ ${subtotal.toFixed(2)}`;
        lista.appendChild(li);
    });

    document.getElementById("contadorItens").textContent = carrinho.length;
    document.getElementById("totalCarrinho").textContent = `Total: R$ ${total.toFixed(2)}`;

    const mensagem = carrinho.map(i => `${i.qtd}x ${i.nome} (${i.tamanho})`).join('%0A');
    const textoFinal = `Pedido:%0A${mensagem}%0ATotal: R$ ${total.toFixed(2)}`;
    const link = `https://wa.me/5581993786384?text=${textoFinal}`;
    document.getElementById("enviarWhatsapp").href = link;
}

document.getElementById("abrirCarrinho").onclick = () => {
    document.getElementById("painelCarrinho").style.display = "block";
};

function fecharCarrinho() {
    document.getElementById("painelCarrinho").style.display = "none";
}
