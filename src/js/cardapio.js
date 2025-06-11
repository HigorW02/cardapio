let carrinho = [];

// 🔎 Função para pegar preço por tamanho
function pegarPreco(pizzaBoxElement, tamanhoSelecionado) {
  const valoresTexto = pizzaBoxElement.querySelector('.valores').textContent;
  const valoresArray = valoresTexto
    .split('|')
    .map(v => parseFloat(v.replace('R$', '').replace(',', '.').trim()));
  const indice = { P: 0, M: 1, G: 2 }[tamanhoSelecionado];
  return valoresArray[indice];
}

// 🛒 Lógica do botão "Adicionar"
document.querySelectorAll('.adicionar-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const pizzaBox = this.closest('.pizza-box');
    const nome = pizzaBox.querySelector('.nome').textContent.trim();
    const radioName = pizzaBox.querySelector('input[type=radio]').name;
    const tamanho = pizzaBox.querySelector(`input[name="${radioName}"]:checked`).value;
    const qtd = parseInt(pizzaBox.querySelector('.quantidade').value) || 1;

    const precoBase = pegarPreco(pizzaBox, tamanho);

    // Pega a borda (opcional)
    const bordaSelecionada = document.querySelector('input[name="borda"]:checked');
    const borda = bordaSelecionada ? bordaSelecionada.value : 'Nenhuma';
    const valorBorda = borda === 'Chocolate' ? 12 : (borda !== 'Nenhuma' ? 10 : 0);

    const precoFinal = precoBase + valorBorda;

    carrinho.push({ nome, tamanho, qtd, preco: precoFinal, borda });
    atualizarCarrinho();
  });
});

// 🧾 Atualiza a visualização do carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.qtd * item.preco;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.qtd}x ${item.nome} (${item.tamanho})${item.borda && item.borda !== 'Nenhuma' ? ` c/ borda ${item.borda}` : ''} - 
      R$ ${subtotal.toFixed(2)}
      <button class="remover-btn" onclick="removerItem(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("contadorItens").textContent = carrinho.length;
  document.getElementById("totalCarrinho").textContent = `Total: R$ ${total.toFixed(2)}`;

  const mensagem = carrinho.map(i =>
    `${i.qtd}x ${i.nome} (${i.tamanho})${i.borda && i.borda !== 'Nenhuma' ? ` com borda ${i.borda}` : ''}`
  ).join('%0A');

  const url = `https://wa.me/5581987668118?text=Pedido:%0A${mensagem}%0ATotal: R$ ${total.toFixed(2)}`;
  document.getElementById("enviarWhatsapp").href = url;
}

// 🗑️ Remover item do carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// ➕ Adicionar borda como item separado
function adicionarBorda(nome, preco, inputId) {
  const qtd = parseInt(document.getElementById(inputId).value) || 1;
  carrinho.push({ nome: `Borda ${nome}`, tamanho: '-', qtd, preco, borda: nome });
  atualizarCarrinho();
}

// 📌 Mostrar seção do cardápio
function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(secao => {
    secao.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// 📦 Abertura/fechamento do carrinho
document.getElementById("abrirCarrinho").onclick = () => {
  document.getElementById("painelCarrinho").style.display = "block";
};

function fecharCarrinho() {
  document.getElementById("painelCarrinho").style.display = "none";
}

// ✅ Finalizar pedido (envia para página de finalização)
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.location.href = 'finalizar.html';
}
