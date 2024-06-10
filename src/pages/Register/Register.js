import React, { useState } from "react";
import "./Register.css";

// Component for registering new users
const Register = () => {
  // State hooks for username, password, and success message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setMessage("Registered Successfully");
    console.log(localStorage);
  };

  // Render the component
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="email"
            id="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {/* Display success message */}
        {message && <div className="success-message">{message}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
