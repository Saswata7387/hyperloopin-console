import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";

const App = () => {
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
        <form action="#" className="login-form">
          <InputField type="email" placeholder="Email address" icon="mail" />
          <InputField type="password" placeholder="Password" icon="lock" />
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