const fs = require('fs');

// 이미지 파일 경로
const imagePath = 'D:/D드라이브/바탕화면/갱/대학교/3-2/웹응용프로그래밍/shoppingmall/옷사진/a1.jpg';

// 이미지 파일을 바이너리로 읽기
const imageBuffer = fs.readFileSync(imagePath);
