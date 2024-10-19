import React, { useState } from "react";
import axios from "axios";
import "../Pages/Login.css";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and registration

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register button clicked!"); // Debug log
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Clear fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setIsLoginMode(true); // Switch to login mode after registration
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked!"); // Debug log
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response.data);
      // Clear fields after successful login
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up" style={{ display: isLoginMode ? 'none' : 'block' }}>
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p onClick={() => setIsLoginMode(true)} style={{ cursor: 'pointer' }}>
            Already have an account? Sign In
          </p>
        </form>
      </div>

      <div className="form-container sign-in" style={{ display: isLoginMode ? 'block' : 'none' }}>
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <span>or use your email and password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
          <p onClick={() => setIsLoginMode(false)} style={{ cursor: 'pointer' }}>
            Don't have an account? Sign Up
          </p>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" id="login">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;