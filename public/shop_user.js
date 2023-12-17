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


function goToAdminPage() {
    window.location.href = 'shop_admin.html';
    alert('관리자 페이지로 이동합니다.');
}

// 페이지 로드 시 서버에서 상품 정보를 가져와서 표시
getProductsFromServer();