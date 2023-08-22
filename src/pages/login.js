import React, { useState } from "react";
import styles from '../styles/sign.module.css';

function App() {
    const [formData, setFormData] = useState({ name: "", password: "" });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // JSON 데이터 전송
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            alert("로그인 성공");
            window.location.href = "/home";
          } else {
            console.error("Error logging in");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };      

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>LOGIN</h1>
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <button type="submit" className={styles.submit}>로그인</button>
            </form>
            <div className={styles["login-or-signup"]}>
                <p className={styles["login-p"]}>계정이 없으신가요?</p>
                <a className={styles["signup-to-login"]} href="/signup">회원가입</a>
            </div>
        </div>
    );
}

export default App;
