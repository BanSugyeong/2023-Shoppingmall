// 상품 데이터
const products = [
    { id: 1, name: '트위트 숏 자켓', description: 'OUTER', image: '옷사진/a1.jpg', price: 48900 },
    { id: 2, name: '실크 블라우스', description: 'TOP', image: '옷사진/b1.jpg', price: 37800 },
    { id: 3, name: '테니스 스커트', description: 'BOTTOM', image: '옷사진/c1.jpg', price: 16300 },
    { id: 4, name: '와이드 슬랙스', description: 'BOTTOM', image: '옷사진/d1.png', price: 21800 }
];

// 상품 목록 함수
function displayProducts() {
    const productList = document.getElementById('productList');

    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.style.width = '100px';

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.price}원`;

        productContainer.appendChild(productName);
        productContainer.appendChild(productImage);
        productContainer.appendChild(productDescription);
        productContainer.appendChild(productPrice);

        productList.appendChild(productContainer);
    });
}

window.onload = displayProducts;

function goToAdminPage() {
    window.location.href = 'shop_admin.html';
    alert('관리자 페이지로 이동합니다.');
}
