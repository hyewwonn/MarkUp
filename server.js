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

// 회원가입
app.post('/save-info', async (req, res) => {
  const { name, password } = req.body;
  const joinDate = new Date();

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const data = [name, password, joinDate];

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

// 로그인
app.post('/login', async (req, res) => {
  const { name, password } = req.body;  
  console.log('Received login request:', name, password);

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM users WHERE USER_NAME = :1 AND USER_PASSWORD = :2`,
      [name, password]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: "성공" });
    } else {
      res.status(401).json({ success: false, message: "실패" });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
});

//사용자 이름 가져오기
app.get('/getUsername', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT USER_NAME FROM users WHERE JOIN_DATE = (SELECT MAX(JOIN_DATE) FROM users)`
    );

    await connection.close();

    if (result.rows.length > 0) {
      const username = result.rows[0][0];
      res.json({ username });
    } else {
      res.status(404).json({ message: "사용자 이름을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error('Error getting username:', error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 사용자 가입일 가져오기
app.get('/getJoinDate', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT JOIN_DATE FROM users WHERE USER_NAME = (SELECT USER_NAME FROM users WHERE JOIN_DATE = (SELECT MAX(JOIN_DATE) FROM users))`
    );

    await connection.close();

    if (result.rows.length > 0) {
      const joinDate = result.rows[0][0];
      res.json({ joinDate });
    } else {
      res.status(404).json({ message: "가입일을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error('Error getting join date:', error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 노트 저장
app.post('/saveNote', async (req, res) => {
  const { N_TITLE, N_CONTENT, N_WRITER } = req.body;
  const N_DATE = new Date();

  try {
      const connection = await oracledb.getConnection(dbConfig);

      const data = [N_TITLE, N_CONTENT, N_DATE, N_WRITER];

      const result = await connection.execute(
          `INSERT INTO note (N_TITLE, N_CONTENT, N_DATE, N_WRITER) VALUES (:1, :2, :3, :4)`,
          data
      );

      console.log('Note saved to Oracle DB:', result);

      await connection.commit();
      await connection.close();

      res.status(200).json({ success: true, message: 'Note saved to Oracle DB' });
  } catch (error) {
      console.error('Error saving note to Oracle DB:', error);
      res.status(500).json({ success: false, message: 'Error saving note to Oracle DB' });
  }
});

// 저장된 노트 가져오기
app.get('/getNotes', async (req, res) => {
  try {
      const connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(
          `SELECT * FROM note`
      );
      
      const notes = result.rows.map(row => ({
          N_TITLE: row.N_TITLE,
          N_CONTENT: row.N_CONTENT,
          N_DATE: row.N_DATE,
          N_WRITER: row.N_WRITER,
      }));

      await connection.close();

      res.status(200).json({ notes });
  } catch (error) {
      console.error('Error fetching notes from Oracle DB:', error);
      res.status(500).json({ message: 'Error fetching notes from Oracle DB' });
  }
});

app.post('/saveBookmark', async (req, res) => {
  const { B_TITLE, B_LINK, B_WRITER } = req.body;
  const B_DATE = new Date();

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const data = [B_TITLE, B_LINK, B_DATE, B_WRITER];

    const result = await connection.execute(
      `INSERT INTO bookmark (B_TITLE, B_LINK, B_DATE, B_WRITER) VALUES (:1, :2, :3, :4)`,
      data
    );

    console.log('Bookmark saved to Oracle DB:', result);

    await connection.commit();
    await connection.close();

    res.status(200).json({ success: true, message: 'Bookmark saved to Oracle DB' });
  } catch (error) {
    console.error('Error saving bookmark to Oracle DB:', error);
    res.status(500).json({ success: false, message: 'Error saving bookmark to Oracle DB' });
  }
});


// 저장된 북마크 가져오기
app.get('/getBookmarks', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      'SELECT * FROM bookmark'
    );

    await connection.close();

    const bookmarks = result.rows.map(row => ({
      B_TITLE: row.B_TITLE,
      B_LINK: row.B_LINK,
    }));

    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks from Oracle DB:', error);
    res.status(500).json({ message: 'Error fetching bookmarks from Oracle DB' });
  }
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
