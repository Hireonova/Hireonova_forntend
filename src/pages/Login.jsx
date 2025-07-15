import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundGrid from "../components/Background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Set the page title based on login/signup
  useEffect(() => {
    document.title = isLogin ? "Login Page" : "Signup Page";
  }, [isLogin]);

  // Safe redirect if user already has token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Delay navigation until next browser frame
      window.requestAnimationFrame(() => {
        navigate("/home");
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

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

        // Navigate after a short delay to let toast show
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.success("Signup successful! You can now login.", {
          position: "top-center",
        });
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

  return (
    <section className="w-full min-h-screen bg-zinc-950 text-white overflow-hidden">
      <ToastContainer />
      <BackgroundGrid>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h1 className="text-4xl font-bold mb-6">
            {isLogin ? "Login" : "Create an Account"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl px-8 pt-6 pb-8 w-full max-w-md"
          >
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-zinc-300 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded bg-zinc-800 text-white focus:outline-none focus:ring"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-zinc-300 text-sm font-bold mb-2">
                {isLogin ? "Email or Username" : "Email"}
              </label>
              <input
                type={isLogin ? "text" : "email"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-zinc-800 text-white focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label className="block text-zinc-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-zinc-800 text-white focus:outline-none focus:ring"
              />
            </div>
            {errorMsg && (
              <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
            )}
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded w-full transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
            <p className="mt-4 text-sm text-center text-zinc-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-yellow-400 underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </form>
        </div>
        <Footer />
      </BackgroundGrid>
    </section>
  );
};

export default Login;
