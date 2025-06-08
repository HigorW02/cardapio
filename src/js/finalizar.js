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

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
};

function enviarPedido(event) {
  event.preventDefault();

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const nome = document.getElementById('nome').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;

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

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  mensagem += `%0A%0A📍 Endereço:%0A${rua}, ${numero}`;
  if (complemento) mensagem += ` - ${complemento}`;
  mensagem += `%0A${bairro} - ${cidade}`;

  const numeroWhatsApp = '558187668118'; // Ex: 5581999999999
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

  window.open(url, '_blank');
}
