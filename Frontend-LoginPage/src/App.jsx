import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("test@example.com"); // Mock email
  const [password, setPassword] = useState("password123"); // Mock password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password123") {
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="app-container">
      {/* Add the rectangle photo */}
      <div className="photo-container">
        <img src="/logo2.jpg" alt="Rectangle" className="logo" />
      </div>

      <div className="login-container">
        <h2 className="form-title">Log in</h2>
        <SocialLogin />
        <p className="separator"></p>
        <form action="#" className="login-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email address"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password-link">Forgot password?</a>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account? <a href="#" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default App;
