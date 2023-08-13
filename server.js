// 필요한 모듈 import
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

// Express 앱 생성
const app = express();

// JSON 파싱을 위한 미들웨어 설정
app.use(bodyParser.json());

// Oracle DB 연결 설정
const dbConfig = {
  user: 'YOUR_DB_USERNAME',
  password: 'YOUR_DB_PASSWORD',
  connectString: 'YOUR_DB_CONNECT_STRING',
};

// 페이지 내에서 id와 password 정보를 받아와서 Oracle DB에 저장
app.post('/save-info', async (req, res) => {
  const { id, password } = req.body;

  try {
    // Oracle DB 연결
    const connection = await oracledb.getConnection(dbConfig);

    const data = [id, password];

    // 데이터베이스에 저장
    const result = await connection.execute(
      `INSERT INTO users (id, password) VALUES (:1, :2)`,
      data
    );

    console.log('Data saved to Oracle DB:', result);

    // 연결 해제
    await connection.close();

    res.status(200).json({ message: 'Data saved to Oracle DB' });
  } catch (error) {
    console.error('Error saving data to Oracle DB:', error);
    res.status(500).json({ message: 'Error saving data to Oracle DB' });
  }
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
