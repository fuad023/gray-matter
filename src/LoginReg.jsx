import { useState } from "react";
import "./LoginReg.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function LoginReg() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1 className="inverse">Create Account</h1>
          <div className="social-icons">
            <a href="https://www.google.com/" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="https://www.facebook.com/" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.github.com/" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>

          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1 className="inverse">Sign In</h1>
          <div className="social-icons">
            <a href="https://www.google.com/" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="https://www.facebook.com/" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.github.com/" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>

          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>
              Enter your requested details to hop back from where you left😀
            </p>
            <button
              type="button"
              className="hidden"
              id="login"
              onClick={() => setIsActive(false)}
            >
              Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello there!</h1>
            <p>
              Register with your requested details to start your awesome journey😄
            </p>
            <button
              type="button"
              className="hidden"
              id="register"
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginReg;
