// shop_user.js

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

// 클릭 이벤트를 각 상품에 등록
document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');

    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('product')) {
            const productName = event.target.querySelector('h3').textContent;
            const productDescription = event.target.querySelector('p:nth-child(2)').textContent;
            const productPrice = event.target.querySelector('p:nth-child(3)').textContent;

            // 값이 비어있지 않은 경우에만 구매 요청
            if (productName && productDescription && productPrice) {
                purchaseProduct({ name: productName, description: productDescription, price: productPrice });
            }
        }
    });
});

// 서버로 구매 정보 전송 함수
function purchaseProduct(product) {
    const { name, description, price } = product;

    // 값이 비어있지 않은 경우에만 구매 요청
    if (name && description && price) {
        fetch('http://localhost:3000/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('상품 구매가 완료되었습니다.');
                // 상품이 구매되면 purchased_products에 추가
                addPurchasedProductToAdmin(product);
            } else {
                alert('상품 구매에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('상품 구매 중 에러 발생:', error);
            alert('상품 구매에 실패했습니다.');
        });
    } else {
        alert('상품 정보가 올바르지 않습니다.');
    }
}


// 상품이 구매되면 purchased_products에 추가하는 함수
function addPurchasedProductToAdmin(product) {
    fetch('http://localhost:3000/purchased_products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(data => {
        // 구매가 완료되면 purchased_products에 추가되었다는 메시지 출력
        console.log('상품이 purchased_products에 추가되었습니다.', data);
    })
    .catch(error => {
        console.error('purchased_products에 상품 추가 중 에러 발생:', error);
    });
}

// "관리자 페이지로 이동" 버튼 클릭 시
function goToAdminPage() {
    window.location.href = 'shop_admin.html';
    alert('관리자 페이지로 이동합니다.');
}

// 페이지 로드 시 서버에서 상품 정보를 가져와서 표시
window.onload = function () {
    getProductsFromServer();
};
