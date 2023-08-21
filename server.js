const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors'); // cors 미들웨어 import

const app = express();
app.use(bodyParser.json());

// cors 미들웨어를 사용하여 모든 도메인으로부터의 요청을 허용
app.use(cors());

const dbConfig = {
  user: 'markup',
  password: '1234',
  connectString: 'localhost:1521/xe',
};

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
