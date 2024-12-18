const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 정적 파일 제공: 루트 디렉토리 (index.html) 및 src 폴더
app.use(express.static(path.join(__dirname))); // 루트 폴더 서빙

// 라우팅: 모든 경로 요청에 대해 index.html 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/index.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
