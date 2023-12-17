var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// 이미지를 저장할 폴더 설정
const uploadDir = path.join(__dirname, 'uploads');
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

// 이미지 업로드를 처리하는 미들웨어 설정
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/upload.html');
});

// 이미지 업로드를 처리하는 라우트
app.post('/upload', upload.single('image'), function (req, res) {
    res.send('이미지가 성공적으로 업로드되었습니다.');
});

app.listen(3000, function () {
    console.log('서버가 http://localhost:3000 포트에서 실행 중입니다.');
});
