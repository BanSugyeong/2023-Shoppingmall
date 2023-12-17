// shop_admin.js
// 상품 목록 함수
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.price}원`;

        productContainer.appendChild(productName);
        productContainer.appendChild(productDescription);
        productContainer.appendChild(productPrice);

        productList.appendChild(productContainer);
    });
}

// 상품 추가 함수
function addProduct(product) {
    const productList = document.getElementById('productList');
    const productContainer = document.createElement('div');
    productContainer.classList.add('product');

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;

    const productPrice = document.createElement('p');
    productPrice.textContent = `${product.price}원`;

    productContainer.appendChild(productName);
    productContainer.appendChild(productDescription);
    productContainer.appendChild(productPrice);

    productList.appendChild(productContainer);
}

// 상품 추가 모달 창 열기
function openAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

// 상품 추가 폼 제출
document.getElementById('insert_form').addEventListener('submit', function (event) {
    var data = $(this).serialize();

    // Ajax를 사용하여 서버에 상품 추가 요청
    $.post('http://localhost:3000/products', data, function (response) {
        // 상품이 성공적으로 추가되면 화면에 새로운 상품을 추가
        addProduct(response);
        // 서버에서 새로운 상품 목록을 가져와서 전체 목록 갱신
        getProductsFromServer();
        // 모달 닫기
        closeAddProductModal();
    });

    // 기본 이벤트를 제거합니다.
    event.preventDefault();
});

// 서버에서 상품 정보를 가져오는 함수
function getProductsFromServer() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('상품 정보를 가져오는 중 에러 발생:', error));
}

window.onload = function () {
    // 페이지 로드 시 서버에서 상품 정보를 가져와서 표시
    getProductsFromServer();
};

// 모달 열기
function openAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    // 데이터를 보여주는 함수
    function selectData() {
        // #output 내부의 내용물을 제거합니다.
        var outputElement = document.getElementById('output');
        while (outputElement.firstChild) {
            outputElement.removeChild(outputElement.firstChild);
        }
        $.getJSON('/products', function (data) {
            $(data).each(function (index, item) {
                var output = '';
                output += '<tr>';
                output += '    <td>' + item.id + '</td>';
                output += '    <td>' + item.name + '</td>';
                output += '    <td>' + item.description + '</td>';
                output += '    <td>' + item.price + '</td>';
                output += '</tr>';
                $('#output').append(output);
            });
        });
    }

    // 데이터를 추가합니다.
    document.getElementById('insert_form').addEventListener('submit', function (event) {
        var data = $(this).serialize();
        $.post('/products', data, selectData);
        // 기본 이벤트를 제거합니다.
        event.preventDefault();
    });

    // 초기 화면에 데이터를 표시합니다.
    selectData();
});

// 모달 닫기
function closeAddProductModal() {
    document.getElementById('addProductModal').style.display = 'none';
}
