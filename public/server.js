const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Company221161101'
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// 전체 상품 조회
app.get('/products', (request, response) => {
    client.query('SELECT * FROM products', function (error, data) {
        response.send(data);
    });
});

// 개별 상품 조회
app.get('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);

    // 데이터베이스 요청을 수행합니다.
    client.query('SELECT * FROM products WHERE id=?', [id], function (error, data) {
        if (error) {
            console.log('상품 조회 중 에러 발생:', error);
            response.status(500).send('Internal Server Error');
        } else {
            response.send(data);
        }
    })
});

// 상품 추가
app.post('/products', function (request, response) {
    // 변수를 선언합니다.
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;

    // 데이터베이스 요청을 수행합니다.
    client.query('INSERT INTO products (name, description, price) VALUES(?,?,?)', 
        [name, description, price], function (error, data) {  // 수정: prrice -> price로 수정
            if (error) {
                console.error('Error while inserting product:', error);
                response.status(500).send('Internal Server Error');
            } else {
                response.send(data);
            }
    });
});

// 상품 수정
app.put('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;
    var query = 'UPDATE products SET '
    // 쿼리를 생성합니다.
    if (name) query += 'name="' + name + '" ';
    if (description) query += 'description="' + description + '" ';
    if (price) query += 'price="' + price + '" ';
    query += 'WHERE id=' + id;
    // 데이터베이스 요청을 수행합니다.
    client.query(query, function (error, data) {
        if (error) {
            console.log('상품 수정 중 에러 발생:', error);
            response.status(500).send('Internal Server Error');
        } else {
            response.send(data);
        }
    });
});

// 상품 삭제
app.delete('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);

    // 데이터베이스 요청을 수행합니다.
    client.query('DELETE FROM products WHERE id=' + id, function (error, data) {
        if (error) {
            console.log('상품 삭제 중 에러 발생:', error);
            response.status(500).send('Internal Server Error');
        } else {
            response.send(data);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});
