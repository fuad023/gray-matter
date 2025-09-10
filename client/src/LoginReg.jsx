import { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginReg.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import axios from 'axios'

function LoginReg() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

const onSubmit = async (data) => {
  console.log("Submitting data:", data);
  try {
    const res = await axios.post('http://localhost:5000/api/user', data);
    alert(res.data.message);
    localStorage.setItem('token', res.data.token);
    reset();
  } catch (err) {
    console.error("❌ Axios error:", err);
  if (err.response) {
    alert("Login failed: " + err.response.data.message);
  } else {
    alert("Login failed: Unknown error");
  }
  }
};

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            {isSubmitting && <div>Loading...</div>}
            <input
              type="text"
              {...register("name", {
                required: { value: true, message: "*This field is required" },
                minLength: {value: 5, message: "*name should be 5 character!"},
              })}
              placeholder="name"
            />
            {errors.name && <div className="text-danger small">{errors.name.message}</div>}
            <input type="email" {...register("email", {
              required: {value: true, message: "*This field is required"},
            })} placeholder="Email" />
            {errors.email && <div className="text-danger small">{errors.email.message}</div>}
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "*This field is required" },
                minLength: {value: 8, message: "*Password should be 8 digit!"},
              })}
              placeholder="password"
            />
            {errors.password && <div className="text-danger small">{errors.password.message}</div>}
            <button disabled={isSubmitting} type="submit">Sign Up</button>
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
            <Link to="/">
              <button type="button">Sign In</button>
            </Link>
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
                Register with your requested details to start your awesome
                journey😄
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
    </>
  );
}

export default LoginReg;
