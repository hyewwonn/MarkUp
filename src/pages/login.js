import React, { useState } from "react";
import styles from '../styles/sign.module.css';

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

function App() {
    return (
        <div className={styles.container}>
        <h1 className={styles.h1}>LOGIN</h1>
        <form className={styles.form}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>SUBMIT</button>
        </form>
        <div className={styles["login-or-signup"]}>
          <p className={styles["login-p"]}>계정이 없으신가요?</p>
          <a className={styles["signup-to-login"]} href="/signup">회원가입</a>
        </div>
      </div>
    );
}

export default App;
