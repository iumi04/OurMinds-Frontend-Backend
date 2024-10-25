// Register.js
import React from "react";
import "./Register.css";

const Register = () => {
  const createRegisterForm = () => {
    return (
      <div className="container">
        <h1>Create Account</h1>
        <form id="registerForm" onSubmit={validateForm}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <p id="error-message"></p>

          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

  const validateForm = (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    if (!username || !email || !password) {
      errorMessage.textContent = "All fields are required!";
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      errorMessage.textContent = "Please enter a valid email address!";
      return;
    }

    if (password.length < 6) {
      errorMessage.textContent = "Password must be at least 6 characters!";
      return;
    }

    alert("Account registered successfully!");

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return createRegisterForm();
};

export default Register;
