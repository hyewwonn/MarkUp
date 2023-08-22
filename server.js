const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3001', // 프론트엔드 도메인
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const dbConfig = {
  user: 'markup',
  password: '1234',
  connectString: 'localhost:1521/xe',
  autoCommit: true,
};

app.post('/save-info', async (req, res) => {
  const { name, password } = req.body; // 수정된 필드 이름
  const joinDate = new Date(); // 현재 날짜와 시간

  try {
    // Oracle DB 연결
    const connection = await oracledb.getConnection(dbConfig);

    const data = [name, password, joinDate]; // 수정된 데이터

    // 데이터베이스에 저장
    const result = await connection.execute(
      `INSERT INTO users (USER_NAME, USER_PASSWORD, JOIN_DATE) VALUES (:1, :2, :3)`, 
      data
    );

    console.log('Data saved to Oracle DB:', result);

    await connection.commit();

    await connection.close();

    res.status(200).json({ message: 'Data saved to Oracle DB' });
  } catch (error) {
    console.error('Error saving data to Oracle DB:', error);
    res.status(500).json({ message: 'Error saving data to Oracle DB' });
  }
});


app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const passwordString = password.toString(); // 비밀번호를 문자열로 변환  
  console.log('Received login request:', name, passwordString);

  try {
    // Oracle DB 연결 및 로그인 정보 확인
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM users WHERE USER_NAME = :1 AND USER_PASSWORD = :2`,
      [name, passwordString]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false });
  }
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
