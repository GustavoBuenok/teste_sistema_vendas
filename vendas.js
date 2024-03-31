// Sistema de vendas

// Arrays para clientes , produtos e pedidos
const clientes = [];
const produtos = [];
const pedidos = [];

// Função para registrar um cliente
function cadastrarCliente() {
  const clienteId = prompt("Insira o ID do cliente:");
  const clienteNome = prompt("Insira o nome do cliente:");
  clientes.push({ id: clienteId, name: clienteNome });
}

// Função para cadastrar produto
function cadastrarProduto() {
  const produtoId = prompt("Insira o ID do produto:");
  const produtoNome = prompt("Insira o nome do produto:");
  const produtoPreco = parseFloat(prompt("Insira o valor do produto:"));
  produtos.push({ id: produtoId, nome: produtoNome, preco: produtoPreco });
}

// Funcão para fazer pedido
function registrandoPedido() {
  const clienteId = prompt("Insira o ID do cliente:");
  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) {
    alert("Cliente não encontrado.");
    return;
  }

  const pedido = {
    clienteId: clienteId,
    clienteNome: cliente.nome,
    produtos: [],
    totalValue: 0
  };

  let done = false;
  while (!done) {
    const produtoId = prompt("Insira o ID do produto:");
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
      alert("Produto não encontrado.");
      continue;
    }

    const quantidade = parseInt(prompt("Insira a quantidade do produto:"));
    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade invalida.");
      continue;
    }

    const valorLinha = produto.preco * quantidade;
    pedido.produtos.push({ produtoId: produtoId, quantidade: quantidade, valorLinha: valorLinha });
    pedido.totalValue += valorLinha;

    const continuar = confirm("Você quer adicionar outro produto ao pedido?");
    if (!continuar) {
      done = true;
    }
  }

  pedidos.push(pedido);
}

// Funcao para apresentar as vendas
function todasVendas() {
  if (pedidos.length === 0) {
    alert("Nenhum pedido registrado.");
    return;
  }

  let listaVendas = "";
  pedidos.forEach((pedido, index) => {
    listaVendas += `${index + 1}. ${pedido.clienteNome} (${pedido.clienteId}):\n`;
    pedido.produtos.forEach(produto => {
      listaVendas += `- ${produto.produtoId} x${produto.quantidade} = $${produto.valorLinha.toFixed(2)}\n`;
    });
    listaVendas += `Total: $${pedido.totalValue.toFixed(2)}\n---\n`;
  });

  alert(listaVendas);
}

// Função principal
function main() {
  let escolha = "";
  while (escolha !== "4") {
    escolha = prompt("1. Cadastro de cliente\n2. Cadastro de produto\n3. Fazer pedido\n4. Compras feitas\n5. Sair");
    switch (escolha) {
      case "1":
        cadastrarCliente();
        break;
      case "2":
        cadastrarProduto();
        break;
      case "3":
        registrandoPedido();
        break;
      case "4":
        todasVendas();
        break;
      case "5":
        break;
      default:
        alert("Escolha invalida.");
    }
  }
}

main();
  