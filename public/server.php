var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
const fs = require('fs');

var app = express();

app.use(cors());

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '221161101',
    database: 'Company221161101'
});

app.use(express.static('shoppingmall'));
app.use('/image', express.static(__dirname + '/옷사진'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/products', function (request, response) {
    // 데이터베이스에서 상품 정보를 가져오는 쿼리
    const query = 'SELECT * FROM products';

    client.query(query, function (error, data) {
        if (error) {
            console.log('오류발생:', error);
            response.status(500).send('Internal Server Error');
        } else {
            response.json(data);
        }
    });
});

app.post('/addProduct', function (request, response) {
    const { name, description, price, imageName } = request.body;

    // 이미지 파일 읽기
    const imagePath = __dirname + '/옷사진/' + imageName;
    const imageBuffer = fs.readFileSync(imagePath);

    // 데이터베이스에 추가
    const insertQuery = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
    const values = [name, description, price, imageBuffer];

    client.query(insertQuery, values, function (error) {
        if (error) {
            console.log('상품 추가 중 오류 발생:', error);
            response.status(500).send('Internal Server Error');
        } else {
            response.send('상품이 성공적으로 추가되었습니다.');
        }
    });
});

app.listen(3000, function () {
    console.log('Server Running at http://localhost:3000');
});
