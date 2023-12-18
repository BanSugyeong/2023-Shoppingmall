// shop_admin.js

// 상품 목록 함수
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // 테이블 엘리먼트 생성
    const table = document.createElement('table');

    // 테이블 헤더 행 생성
    const headerRow = table.insertRow();
    const headers = ['id', '상품명', '상품 정보', '가격'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // 제품 데이터로 테이블 채우기
    products.forEach(product => {
        const productRow = table.insertRow();

        // 각 셀에 제품 세부 정보 추가
        const productIdCell = productRow.insertCell(0);
        productIdCell.textContent = product.id;


        const productNameCell = productRow.insertCell(1);
        productNameCell.textContent = product.name;

        const productDescriptionCell = productRow.insertCell(2);
        productDescriptionCell.textContent = product.description;

        const productPriceCell = productRow.insertCell(3);
        productPriceCell.textContent = `${product.price}원`;

        // 전체 행에 클릭 이벤트 추가
        productRow.addEventListener('click', function () {
            // 선택된 상품 ID 업데이트
            selectedProductId = product.id;
            // 상품 수정 모달 열기 함수 호출
            openEditProductModal(product);
        });
    });

    // 테이블을 상품 목록 컨테이너에 추가
    productList.appendChild(table);
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

// 상품 수정 모달 열기 함수 수정
function openEditProductModal(product) {
    // 모달 열기 코드는 이전과 동일
    document.getElementById('editProductModal').style.display = 'block';

    // 선택된 상품 정보를 모달에 표시
    document.getElementById('edit_form_id').value = product.id; // 새로 추가: id 입력란 채우기
    document.getElementById('edit_form_name').value = product.name;
    document.getElementById('edit_form_description').value = product.description;
    document.getElementById('edit_form_price').value = product.price;

    // 수정, 삭제 버튼 추가
    const modalFooter = document.querySelector('#editProductModal .modal-content');
    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.addEventListener('click', function () {
        // 수정 버튼 클릭 시 동작하는 함수 호출
        handleEditProduct(product.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function () {
        // 삭제 버튼 클릭 시 동작하는 함수 호출
        handleDeleteProduct(product.id);
    });

    modalFooter.appendChild(editButton);
    modalFooter.appendChild(deleteButton);
}


// 상품 수정 폼 제출
document.getElementById('edit_form').addEventListener('submit', function (event) {
    var data = $(this).serialize();

    // Ajax를 사용하여 서버에 상품 수정 요청
    $.ajax({
        url: 'http://localhost:3000/products/' + encodeURIComponent(selectedProductId),
        type: 'PUT',
        data: data,
        success: function (response) {
            // 상품이 성공적으로 수정되면 화면에서 해당 상품 업데이트
            updateProduct(response);
            // 서버에서 새로운 상품 목록을 가져와서 전체 목록 갱신
            getProductsFromServer();
            // 모달 닫기
            closeEditProductModal();
        },
        error: function (xhr, status, error) {
            console.error('상품 수정 중 에러 발생:', error);
        }
    });

    // 기본 이벤트를 제거합니다.
    event.preventDefault();
});



// 상품 삭제 함수
function deleteProduct() {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
  
    // 선택된 상품 ID를 가져오는 부분
    const selectedProductId = getSelectedProductId(); // 여기에서 getSelectedProductId는 선택된 상품 ID를 가져오는 함수로 가정
  
    // Ajax를 사용하여 서버에 상품 삭제 요청
    $.ajax({
      url: 'http://localhost:3000/products/' + selectedProductId,
      type: 'DELETE',
      success: function () {
        // 상품이 성공적으로 삭제되면 화면에서 해당 상품 제거
        removeProduct(selectedProductId); // 여기에서 removeProduct는 삭제된 상품을 화면에서 제거하는 함수로 가정
        // 서버에서 새로운 상품 목록을 가져와서 전체 목록 갱신
        getProductsFromServer();
      },
      error: function (xhr, status, error) {
        console.error('상품 삭제 중 에러 발생:', error);
      }
    });
}

// 선택된 상품 ID를 가져오는 함수 (새로 추가)
function getSelectedProductId() {
    // 여기에서 선택된 상품 ID를 어떻게 가져올지에 대한 로직을 추가해야 함
    // 이 예시에서는 임의로 1을 리턴하도록 설정
    return document.getElementById('edit_form_id').value;
}

// 상품을 화면에서 제거하는 함수 (새로 추가)
function removeProduct(productId) {
    // 여기에서 productId에 해당하는 상품을 화면에서 제거하는 로직을 추가해야 함
    // 이 예시에서는 간단히 console.log로 출력
    console.log('상품 제거:', productId);
}

// 수정 버튼 클릭 시 동작하는 함수
function handleEditProduct(productId) {
    var data = $('#edit_form').serialize();

    // Ajax를 사용하여 서버에 상품 수정 요청
    $.ajax({
        url: 'http://localhost:3000/products/' + encodeURIComponent(productId),
        type: 'PUT',
        data: data,
        success: function (response) {
            // 상품이 성공적으로 수정되면 화면에서 해당 상품 업데이트
            updateProduct(response);
            // 서버에서 새로운 상품 목록을 가져와서 전체 목록 갱신
            getProductsFromServer();
            // 모달 닫기
            closeEditProductModal();
        },
        error: function (xhr, status, error) {
            console.error('상품 수정 중 에러 발생:', error);
        }
    });
}

// 삭제 버튼 클릭 시 동작하는 함수
function handleDeleteProduct(productId) {
    if (!confirm('정말로 삭제하시겠습니까?')) {
        return;
    }

    // Ajax를 사용하여 서버에 상품 삭제 요청
    $.ajax({
        url: 'http://localhost:3000/products/' + productId,
        type: 'DELETE',
        success: function () {
            // 상품이 성공적으로 삭제되면 화면에서 해당 상품 제거
            removeProduct(productId);
            // 서버에서 새로운 상품 목록을 가져와서 전체 목록 갱신
            getProductsFromServer();
        },
        error: function (xhr, status, error) {
            console.error('상품 삭제 중 에러 발생:', error);
        }
    });

    // 모달 닫기
    closeEditProductModal();
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

// 모달 열기
function openAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    // 데이터를 보여주는 함수
    function selectData() {
        // #output 내부의 내용물을 제거합니다.
        var outputElement = document.getElementById('output');

        // outputElement가 존재하고, firstChild가 존재하는지 확인합니다.
        if (outputElement && outputElement.firstChild) {
            while (outputElement.firstChild) {
                outputElement.removeChild(outputElement.firstChild);
            }
        } else {
            console.error('Output element or its first child not found.');
        }

        // 나머지 코드는 동일합니다.
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
