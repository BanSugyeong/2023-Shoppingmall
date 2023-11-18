// 새 상품 추가 함수
function addProduct() {
    const productName = prompt('새 상품의 이름을 입력하세요:');
    const productPrice = prompt('새 상품의 가격을 입력하세요:');

    // 실제로는 서버에 상품 추가 요청을 보내야 하지만 여기서는 간단하게 배열에 추가
    products.push({ id: products.length + 1, name: productName, price: parseInt(productPrice) });

    // 상품 목록 갱신
    displayProducts();
}

// 페이지 로드 시 상품 목록 표시
window.onload = displayProducts;
