document.addEventListener('DOMContentLoaded', () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const resumo = document.getElementById('resumoPedido');
  let total = 0;

  if (carrinho.length === 0) {
    resumo.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  const lista = document.createElement('ul');
  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    const li = document.createElement('li');
    li.textContent = `${item.qtd}x ${item.nome} (${item.tamanho})` + 
      (item.borda && item.borda !== 'Nenhuma' ? ` c/ borda ${item.borda}` : '') +
      ` - R$ ${subtotal.toFixed(2)}`;
    lista.appendChild(li);
  });

  resumo.appendChild(lista);
  const pTotal = document.createElement('p');
  pTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  resumo.appendChild(pTotal);

  document.getElementById('formFinalizar').addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const obs = document.getElementById('obs').value;

    const textoPedido = carrinho.map(i =>
      `${i.qtd}x ${i.nome} (${i.tamanho})${i.borda && i.borda !== 'Nenhuma' ? ` c/ borda ${i.borda}` : ''}`
    ).join('%0A');

    const mensagem = 
      `*PEDIDO*%0A${textoPedido}%0A*Total:* R$ ${total.toFixed(2)}%0A%0A` +
      `*Nome:* ${nome}%0A*Endereço:* ${endereco}%0A` +
      (obs ? `*Obs:* ${obs}` : '');

    const numero = 'SEUNUMEROAQUI'; // Coloque seu número aqui, ex: 5599999999999
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });
});
