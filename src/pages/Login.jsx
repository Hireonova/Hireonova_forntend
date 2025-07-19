import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundGrid from "../components/Background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle } from "lucide-react";

// Helper component for checklist items
const PasswordCriteriaItem = ({ isMet, text }) => (
  <li className={`flex items-center gap-2 transition-colors duration-300 ${isMet ? "text-green-400" : "text-zinc-400"}`}>
    {isMet ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
    <span>{text}</span>
  </li>
);

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ✨ RENAMED STATE: This state now controls if the checklist has ever been shown.
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });

  useEffect(() => {
    document.title = isLogin ? "Login Page" : "Signup Page";
  }, [isLogin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.requestAnimationFrame(() => {
        navigate("/home");
      });
    }
  }, [navigate]);

  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

    if (!isLogin && !isPasswordValid) {
      setErrorMsg("Password must meet all the criteria.");
      return;
    }

    const endpoint = isLogin
      ? "https://auth-universal-repo.vercel.app/api/auth/login"
      : "https://auth-universal-repo.vercel.app/api/auth/signup";

    const payload = isLogin
      ? { identifier, password }
      : { username, email: identifier, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Something went wrong");
        return;
      }
      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => navigate("/home"), 1500);
      } else {
        toast.success("Signup successful! You can now login.", { position: "top-center" });
        setIsLogin(true);
        setIdentifier("");
        setPassword("");
        setUsername("");
        localStorage.setItem("email", identifier);
      }
    } catch (err) {
      setErrorMsg("Server error. Try again.");
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `https://auth-universal-repo.vercel.app/api/auth/${provider}`;
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-zinc-900 to-black dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black text-white relative">
      <ToastContainer />
      <BackgroundGrid>
        <Navbar />
        <div className="flex flex-col items-center mt-20 justify-center min-h-[80vh] px-4">
          <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 border my-6 border-white/20 dark:border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h1 className="text-3xl text-black dark:text-white  font-semibold text-center mb-6">
              {isLogin ? "Login" : "Create an Account"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              {!isLogin && (
                <div>
                  <label className="text-sm  text-zinc-900 dark:text-zinc-400">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 dark:bg-zinc-800 text-black bg-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring"
                  />
                </div>
              )}
              <div>
                <label className="text-sm text-zinc-800 dark:text-zinc-400">
                  {isLogin ? "Email or Username" : "Email"}
                </label>
                <input
                  type={isLogin ? "text" : "email"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full px-4 py-2 dark:bg-zinc-800 text-black bg-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-800 dark:text-zinc-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsChecklistVisible(true)}
                  required
                  className="w-full px-4 py-2 dark:bg-zinc-800 text-black bg-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring"
                />
                
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden 
                    ${isChecklistVisible ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-3 bg-zinc-800/80 rounded-lg text-sm">
                    <ul className="space-y-2">
                      <PasswordCriteriaItem
                        isMet={passwordCriteria.length}
                        text="At least 6 characters"
                      />
                      <PasswordCriteriaItem
                        isMet={passwordCriteria.uppercase}
                        text="One uppercase letter (A-Z)"
                      />
                      <PasswordCriteriaItem
                        isMet={passwordCriteria.specialChar}
                        text="One special character (!@#$%^&*)"
                      />
                    </ul>
                  </div>
                </div>
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full dark:bg-white dark:hover:bg-gray-200 dark:text-black hover:bg-zinc-800 bg-black text-white font-semibold py-2 rounded-lg transition"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
              <p className="text-center text-sm text-zinc-400 dark:text-zinc-300">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="text-black dark:text-white underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  className="bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-2 rounded-lg font-medium hover:opacity-90"
                >
                  Sign in with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth("github")}
                  className="bg-zinc-700 text-white dark:bg-zinc-700 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-600"
                >
                  GitHub
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </BackgroundGrid>
    </section>
  );
};

export default Login;
