// 🔑 Função global para calcular o subtotal do carrinho (sem frete)
function calcularResumoCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  return carrinho.reduce((acc, item) => acc + item.qtd * item.preco, 0);
}

window.onload = () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const resumo = document.getElementById('resumoCarrinho');
  const totalEl = document.getElementById('resumoTotal');
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.qtd * item.preco;
    total += subtotal;

    const li = document.createElement('li');
    li.textContent = `${item.qtd}x ${item.nome} (${item.tamanho})` +
      (item.borda && item.borda !== 'Nenhuma' ? ` com borda ${item.borda}` : '') +
      ` - R$ ${subtotal.toFixed(2)}`;
    resumo.appendChild(li);
  });

  // 🔄 Agora usa a função para mostrar o total
  totalEl.textContent = `Total: R$ ${calcularResumoCarrinho().toFixed(2)}`;
  atualizarFrete();
};

// SUBSTITUI: atualiza o frete respeitando a retirada
function atualizarFrete() {
  const isRetirada = document.getElementById('retirada')?.checked;
  if (isRetirada) {
    document.getElementById("freteValor").innerText = "Valor do Frete: R$0,00";
    return;
  }
  const select = document.getElementById("bairroSelect");
  const valorFrete = select?.value || 0;
  document.getElementById("freteValor").innerText =
    `Valor do Frete: R$${parseFloat(valorFrete).toFixed(2)}`;
}

// NOVA: esconde/mostra os campos de endereço e gerencia 'required'
function alternarRetirada() {
  const isRetirada = document.getElementById('retirada').checked;
  const bloco = document.getElementById('blocoEndereco');

  const rua = document.getElementById('rua');
  const numero = document.getElementById('numero');
  const complemento = document.getElementById('complemento');
  const bairro = document.getElementById('bairroSelect');
  const cidade = document.getElementById('cidade');

  if (isRetirada) {
    // esconde bloco inteiro da tela
    bloco.style.display = 'none';

    // limpa valores
    rua.value = '';
    numero.value = '';
    complemento.value = '';
    bairro.value = '';
    cidade.value = '';

    // remove obrigatoriedade
    rua.required = false;
    numero.required = false;
    bairro.required = false;
    cidade.required = false;

    // frete 0
    document.getElementById('freteValor').textContent = 'Valor do Frete: R$0,00';
  } else {
    // mostra bloco de volta
    bloco.style.display = 'block';

    // restaura obrigatoriedade
    rua.required = true;
    numero.required = true;
    bairro.required = true;
    cidade.required = true;

    // recalcula frete
    atualizarFrete();
  }
}

function enviarPedido(event) {
  event.preventDefault();

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const nome = document.getElementById('nome').value.trim();
  const isRetirada = document.getElementById('retirada').checked;

  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const complemento = document.getElementById('complemento').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const pagamento = document.querySelector('input[name="pagamento"]:checked')?.value || 'Não informado';

  const bairroSelect = document.getElementById('bairroSelect');
  const bairroNome = bairroSelect.options[bairroSelect.selectedIndex]?.text.split(' - ')[0] || 'Não informado';
  const frete = isRetirada ? 0 : parseFloat(bairroSelect.value || 0);

  let mensagem = `📦 Pedido de ${nome}%0A%0A`;
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.qtd * item.preco;
    total += subtotal;
    mensagem += `• ${item.qtd}x ${item.nome} (${item.tamanho})`;
    if (item.borda && item.borda !== 'Nenhuma') {
      mensagem += ` c/ borda ${item.borda}`;
    }
    mensagem += ` - R$ ${subtotal.toFixed(2)}%0A`;
  });

  mensagem += `%0A🛒 Subtotal: R$ ${total.toFixed(2)}`;
  mensagem += `%0A🚚 Frete: R$ ${frete.toFixed(2)}`;

  const totalGeral = total + frete;
  mensagem += `%0A💰 Total Geral: R$ ${totalGeral.toFixed(2)}`;

  if (isRetirada) {
    mensagem += `%0A%0A🏠 Retirada na Pizzaria`;
  } else {
    mensagem += `%0A%0A📍 Endereço:%0A${rua}, ${numero}`;
    if (complemento) mensagem += ` - ${complemento}`;
    mensagem += `%0A${bairroNome} - ${cidade}`;
  }

  mensagem += `%0A%0A💳 Pagamento: ${pagamento}`;

  const numeroWhatsApp = '558197216316';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

  window.open(url, '_blank');
}
