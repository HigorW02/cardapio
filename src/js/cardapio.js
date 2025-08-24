let carrinho = [];

// Função para pegar preço por tamanho
function pegarPreco(pizzaBoxElement, tamanhoSelecionado) {
  const valoresTexto = pizzaBoxElement.querySelector('.valores').textContent;
  const valoresArray = valoresTexto
    .split('|')
    .map(v => parseFloat(v.replace('R$', '').replace(',', '.').trim()));
  const indice = { P: 0, M: 1, G: 2 }[tamanhoSelecionado];
  return valoresArray[indice];
}

// Lógica do botão "Adicionar" (pizzas normais)
document.querySelectorAll('.adicionar-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const pizzaBox = this.closest('.pizza-box');
    const nome = pizzaBox.querySelector('.nome').textContent.trim();
    const radioName = pizzaBox.querySelector('input[type=radio]').name;
    const tamanho = pizzaBox.querySelector(`input[name="${radioName}"]:checked`).value;
    const qtdInput = pizzaBox.querySelector('.quantidade');
    const qtd = parseInt(qtdInput?.value || 0);

    // 🚫 Validação de quantidade
    if (isNaN(qtd) || qtd <= 0) {
      alert("Por favor, selecione uma quantidade válida maior que zero.");
      return;
    }

    // Verifica borda
    const bordaSelecionada = document.querySelector('input[name="borda"]:checked');
    const borda = bordaSelecionada ? bordaSelecionada.value : 'Nenhuma';
    const valorBorda = borda === 'Chocolate' ? 12 : (borda !== 'Nenhuma' ? 10 : 0);

    const precoBase = pegarPreco(pizzaBox, tamanho);
    const precoFinal = precoBase + valorBorda;

    carrinho.push({ nome, tamanho, qtd, preco: precoFinal, borda });
    atualizarCarrinho();
  });
});

// Adiciona pizza 2 sabores ao carrinho
function adicionarPizza2Sabores() {
  const sabor1 = document.getElementById('sabor1').value;
  const sabor2 = document.getElementById('sabor2').value;
  const tamanho = 'G'; // fixo
  const qtd = parseInt(document.getElementById('qtd2sabores').value) || 1;

  if (!sabor1 || !sabor2) {
    alert("Selecione os dois sabores.");
    return;
  }

  if (sabor1 === sabor2) {
    alert("Escolha dois sabores diferentes.");
    return;
  }

  if (isNaN(qtd) || qtd <= 0) {
    alert("Por favor, selecione uma quantidade válida maior que zero.");
    return;
  }

  const preco1 = buscarPrecoPorNome(sabor1, tamanho);
  const preco2 = buscarPrecoPorNome(sabor2, tamanho);
  const maiorPreco = Math.max(preco1, preco2);

  const nomeFinal = `${sabor1} / ${sabor2}`;
  const precoFinal = maiorPreco;

  carrinho.push({ nome: nomeFinal, tamanho, qtd, preco: precoFinal, borda: 'Nenhuma' });
  atualizarCarrinho();
}

// Adiciona Combo perfeito ao carrinho
function adicionarCombo() {
  const saborCombo = document.getElementById('saborCombo').value;
  const qtd = parseInt(document.getElementById('qtdCombo').value) || 1;

  if (!sabor1) {
    alert("Selecione um sabor para a pizza do combo.");
    return;
  }

  if (isNaN(qtd) || qtd <= 0) {
    alert("Por favor, selecione uma quantidade válida maior que zero.");
    return;
  }

  const precoCombo = 39.99; // preço fixo do combo
  const nomeFinal = `Combo Perfeito - Pizza Grande (${saborCombo}) + Refri 2L`;

  carrinho.push({
    nome: nomeFinal,
    tamanho: 'G',
    qtd,
    preco: precoCombo,
    borda: 'Nenhuma'
  });

  atualizarCarrinho();
  alert("Combo adicionado ao carrinho!");
}

// Adiciona Combo Família ao carrinho
function adicionarComboAmigo() {
  const saborCombo2 = document.getElementById('saborCombo2').value;
  const saborCombo3 = document.getElementById('saborCombo3').value;
  const qtd = parseInt(document.getElementById('qtdCombo2').value) || 1;

  if (!saborCombo2 || !saborCombo3) {
    alert("Selecione os dois sabores para a pizza do combo.");
    return;
  }

  if (isNaN(qtd) || qtd <= 0) {
    alert("Por favor, selecione uma quantidade válida maior que zero.");
    return;
  }

  const precoComboAmigo = 79.99; // preço fixo do combo família
  const nomeFinal = `Combo Amigo - 2 Pizzas Grandes (${saborCombo2} e ${saborCombo3}) + Refri 2L`;

  carrinho.push({
    nome: nomeFinal,
    tamanho: 'G',
    qtd,
    preco: precoComboAmigo,
    borda: 'Nenhuma'
  });

  atualizarCarrinho();
  alert("Combo adicionado ao carrinho!");
}

// Adicionar Combo Familia ao carrinho
function adicionarComboFamilia() {
  const saborCombo4 = document.getElementById('saborCombo4').value;
  const saborCombo5 = document.getElementById('saborCombo5').value;
  const saborCombo6 = document.getElementById('saborCombo6').value;
  const qtd = parseInt(document.getElementById('qtdCombo3').value) || 1;

  if (!saborCombo4 || !saborCombo5 || !saborCombo6) {
    alert("Selecione os três sabores para a pizza do combo.");
    return;
  }

  if (isNaN(qtd) || qtd <= 0) {
    alert("Por favor, selecione uma quantidade válida maior que zero.");
    return;
  }
  const precoComboFamilia = 109.99; // preço fixo do combo família
  const nomeFinal = `Combo Família - 3 Pizzas Grandes (${saborCombo4}, ${saborCombo5} e ${saborCombo6}) + Refri 2L`;
  carrinho.push({
    nome: nomeFinal,
    tamanho: 'G',
    qtd,
    preco: precoComboFamilia,
    borda: 'Nenhuma'
  });
  atualizarCarrinho();
  alert("Combo adicionado ao carrinho!");
}

// Função auxiliar para buscar preço
function buscarPrecoPorNome(nome, tamanho) {
  const pizzaBox = [...document.querySelectorAll('.pizza-box')]
    .find(p => p.querySelector('.nome')?.textContent.trim().toUpperCase() === nome.toUpperCase());
  return pizzaBox ? pegarPreco(pizzaBox, tamanho) : 0;
}

// Atualiza o carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.qtd * item.preco;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.9rem;">
          ${item.qtd}x ${item.nome} (${item.tamanho})${item.borda && item.borda !== 'Nenhuma' ? ` c/ borda ${item.borda}` : ''}
        </span>
        <button class="remover-btn" onclick="removerItem(${index})">❌</button>
      </div>
      <div style="font-weight: bold; font-size: 0.9rem;">R$ ${subtotal.toFixed(2)}</div>
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

// Remover item
function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Adicionar borda como item separado (se usado)
function adicionarBorda(nome, preco, inputId) {
  const qtd = parseInt(document.getElementById(inputId).value) || 1;
  carrinho.push({ nome: `Borda ${nome}`, tamanho: '-', qtd, preco, borda: nome });
  atualizarCarrinho();
}

// Mostrar seção
function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(secao => {
    secao.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// Carrinho
document.getElementById("abrirCarrinho").onclick = () => {
  document.getElementById("painelCarrinho").style.display = "block";
};

function fecharCarrinho() {
  document.getElementById("painelCarrinho").style.display = "none";
}

// Finalizar pedido
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.location.href = 'finalizar.html';
}

// add e remover quantidade
document.querySelectorAll('.carrinho-controles').forEach(controle => {
  const input = controle.querySelector('.quantidade');
  const btnMais = controle.querySelector('.mais');
  const btnMenos = controle.querySelector('.menos');

  btnMais.addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
  });

  btnMenos.addEventListener('click', () => {
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  });
});
