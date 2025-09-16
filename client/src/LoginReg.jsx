import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./components/hooks/useLogin.jsx";
import "./LoginReg.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { useSignup } from "./components/hooks/useSignup.jsx";

function LoginReg() {
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    reset: resetSignup,
    formState: { errors: errorsSignup, isSubmitting: isSubmittingSignup },
  } = useForm();

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    reset: resetSignin,
    formState: { errors: errorsSignin, isSubmitting: isSubmittingSignin },
  } = useForm();

  const { signup, error, isLoading } = useSignup();
  const { login, error: loginError, isLoading: loginIsLoading } = useLogin();

  const onSubmit = async (data) => {
    await signup(data.name, data.surname, data.email, data.password);
  };

  const onLogin = async (data) => {
    await login(data.email, data.password);
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form action="" onSubmit={handleSubmitSignup(onSubmit)}>
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
            {isSubmittingSignup && <div>Loading...</div>}
            <input
              type="text"
              {...registerSignup("name", {
                required: { value: true, message: "*This field is required" },
              })}
              placeholder="Name"
            />
            {errorsSignup.name && (
              <div className="text-danger small">
                {errorsSignup.name.message}
              </div>
            )}
            <input
              type="text"
              {...registerSignup("surname", {
                required: { value: true, message: "*This field is required" },
              })}
              placeholder="Surname"
            />
            {errorsSignup.surname && (
              <div className="text-danger small">
                {errorsSignup.surname.message}
              </div>
            )}
            <input
              type="text"
              {...registerSignup("username", {
                required: { value: true, message: "*This field is required" },
                minLength: {
                  value: 6,
                  message: "*Username should be 6 characters!",
                },
                maxLength: {
                  value: 12,
                  message: "*Username should be less than 12 characters!",
                },
              })}
              placeholder="Username"
            />
            {errorsSignup.username && (
              <div className="text-danger small">
                {errorsSignup.username.message}
              </div>
            )}
            <input
              type="email"
              {...registerSignup("email", {
                required: { value: true, message: "*This field is required" },
              })}
              placeholder="Email"
            />
            {errorsSignup.email && (
              <div className="text-danger small">
                {errorsSignup.email.message}
              </div>
            )}
            <input
              type="password"
              {...registerSignup("password", {
                required: { value: true, message: "*This field is required" },
                minLength: {
                  value: 8,
                  message: "*Password should be 8 digit!",
                },
              })}
              placeholder="password"
            />
            {errorsSignup.password && (
              <div className="text-danger small">
                {errorsSignup.password.message}
              </div>
            )}
            <button disabled={isSubmittingSignup} type="submit">
              Sign Up
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSubmitSignin(onLogin)}>
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
            {isSubmittingSignin && <span>Loading...</span>}
            <input
              type="email"
              {...registerSignin("email", {
                required: { value: true, message: "*This field is required" },
              })}
              placeholder="Email"
            />
            {errorsSignin.email && (
              <div className="text-danger small">
                {errorsSignin.email.message}
              </div>
            )}
            <input
              type="password"
              {...registerSignin("password", {
                required: { value: true, message: "*This field is required" },
                minLength: {
                  value: 8,
                  message: "*Password should be 8 digit!",
                },
              })}
              placeholder="password"
            />
            {errorsSignin.password && (
              <div className="text-danger small">
                {errorsSignin.password.message}
              </div>
            )}

            <a href="#">Forgot your password?</a>
            <button type="submit" disabled={isSubmittingSignin}>
              Sign In
            </button>
            {loginError && <div className="error">{loginError}</div>}
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
                type="butsuton"
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
