<?php
// 데이터베이스 연결 설정 (적절한 설정으로 수정해야 함)
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "Company221161101";

// MySQL 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 상품 정보 가져오기
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // 'image' 필드를 이미지 경로로 업데이트
        $row['image'] = 'clothes/' . $row['image'];
        $products[] = $row;
    }
}

// JSON 형식으로 출력
header('Content-Type: application/json');
echo json_encode($products);

// 데이터베이스 연결 종료
$conn->close();
?>