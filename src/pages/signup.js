import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({ id: "", password: "" });

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
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="id"
          placeholder="이름"
          value={formData.id}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
