import React, { useState } from "react";
import styles from '../styles/sign.module.css';

function App() {
  const [formData, setFormData] = useState({ name: "", id: "", password: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/save-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Error saving data");
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
      <h1 className={styles.h1}>SIGN UP</h1>
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
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
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
        <button type="submit" className={styles.submit}>SUBMIT</button>
      </form>
      <div className={styles["login-or-signup"]}>
        <p className={styles["login-p"]}>계정이 있으신가요?</p>
        <a className={styles["signup-to-login"]} href="/login">로그인</a>
      </div>
    </div>
  );
}

export default App;
