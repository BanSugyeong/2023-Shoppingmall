// 새 상품 추가 함수
function addProduct() {
    const productName = prompt('새 상품의 이름을 입력하세요:');
    const productDescription = prompt('새 상품의 설명을 입력하세요:');
    const productImage = prompt('새 상품의 이미지 URL을 입력하세요:');
    const productPrice = prompt('새 상품의 가격을 입력하세요:');

    // 새로운 상품 추가
    const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        image: productImage,
        price: parseInt(productPrice)
    };

    products.push(newProduct);

    // 상품 목록 갱신
    displayProducts();
}

// 페이지 로드 시 상품 목록 표시
window.onload = displayProducts;