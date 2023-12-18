// server.js

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

// 상품 수정 엔드포인트
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    // MySQL 쿼리 실행
    const sql = 'UPDATE products SET name=?, description=?, price=? WHERE id=?';
    db.query(sql, [updatedProduct.name, updatedProduct.description, updatedProduct.price, productId], (err, result) => {
      if (err) {
        console.error('MySQL 업데이트 오류:', err);
        res.status(500).send('상품 업데이트 중 오류가 발생했습니다.');
        return;
      }
  
      // 업데이트 성공 시
      res.json(updatedProduct);
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

// 상품 구매 엔드포인트 추가
app.post('/purchase', function (request, response) {
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;

    client.query(
        'INSERT INTO purchased_products (name, description, price) VALUES (?, ?, ?)',
        [name, description, price],
        function (error, data) {
            if (error) {
                console.error('Error while purchasing product:', error);
                response.status(500).json({ error: 'Internal Server Error', message: error.message });
            } else {
                response.json({ success: true });
            }
        }
    );
});

// purchased_products에 상품 추가
app.post('/admin/purchased_products', function (request, response) {
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;

    client.query('INSERT INTO purchased_products (name, description, price) VALUES (?, ?, ?)', 
        [name, description, price], function (error, data) {
            if (error) {
                console.error('Error while inserting product to purchased_products:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            } else {
                response.json({ success: true });
            }
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});

