// Lista de produtos
let products = [];

// Referências aos elementos DOM
const addProductBtn = document.getElementById('addProductBtn');
const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productValueInput = document.getElementById('productValue');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));

// Função para adicionar um produto à lista
function addProduct(name, value) {
    const newProduct = { name, value };
    products.push(newProduct);
    renderProductList();  // Atualiza a listagem após adicionar o produto
}

// Função para formatar o valor em reais
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para renderizar a lista de produtos
function renderProductList() {
    // Ordenar os produtos pelo nome (ordem alfabética)
    const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

    // Limpar a tabela antes de renderizar
    productTable.innerHTML = '';

    // Renderizar cada produto na tabela
    sortedProducts.forEach(product => {
        const row = productTable.insertRow();
        row.classList.add('animated', 'fadeIn');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${formatCurrency(product.value)}</td>
        `;
    });
}

// Lidar com o envio do formulário de produto
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = productNameInput.value.trim();
    const productValue = parseFloat(productValueInput.value.replace('R$', '').replace('.', '').replace(',', '.'));

    if (productName && !isNaN(productValue)) {
        addProduct(productName, productValue);
        productModal.hide(); // Fechar o modal
        productForm.reset(); // Limpar o formulário
    }
});

// Exibir o modal ao clicar no botão de adicionar produto
addProductBtn.addEventListener('click', () => {
    productModal.show();
});

// Inicialização da página - Renderizar a lista vazia
renderProductList();
