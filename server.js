const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors');
const session = require('express-session'); // express-session 미들웨어 추가

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3001', // 프론트엔드 도메인
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 세션 설정
app.use(session({
  secret: '1234', // 세션 데이터 암호화를 위한 비밀 키
  resave: false,
  saveUninitialized: true
}));

const dbConfig = {
  user: 'markup',
  password: '1234',
  connectString: 'localhost:1521/xe',
  autoCommit: true,
};

//회원가입
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

//로그인
app.post('/login', async (req, res) => {
  const { name, password } = req.body;  
  console.log('Received login request:', name, password);

  try {
    // Oracle DB 연결 및 로그인 정보 확인
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM users WHERE USER_NAME = :1 AND USER_PASSWORD = :2`,
      [name, password]
    );

    await connection.close();

    if (result.rows.length > 0) {
      // 세션에 사용자 정보 저장
      req.session.user = {
        name: name
      };
      res.status(200).json({ success: true, message: "성공" });
    } else {
      res.status(401).json({ success: false, message: "실패" });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
});

// 로그아웃
app.post('/logout', (req, res) => {
  try {
    // 세션 제거
    req.session.destroy((error) => {
      if (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: '로그아웃 중 오류가 발생했습니다.' });
      } else {
        res.status(200).json({ message: '로그아웃 되었습니다.' });
      }
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: '로그아웃 중 오류가 발생했습니다.' });
  }
});

//사용자 이름 가져오기
app.get('/getUsername', async (req, res) => {
  try {
    const username = req.session.user ? req.session.user.name : null;

    if (username) {
      res.json({ username });
    } else {
      res.status(404).json({ message: "사용자 이름을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error('Error getting username:', error);
    res.status(500).json({ message: "서버 오류" });
  }
});


// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
