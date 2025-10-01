import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        sessionStorage.setItem("jwt", data.token);
        sessionStorage.setItem("encryptedData", data.data.encryptedData);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("name", data.name);

        toast.success("Login successful!");

        setTimeout(() => {
          if (
            email.toLowerCase() === "kbr1@gmail.com" ||
            email.toLowerCase() === "lk5@gmail.com"
          ) {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(`Error logging in:`, err.message);
      toast.error("An error occurred while logging in.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7F9] via-[#FDFDFD] to-[#EAEAEA] relative overflow-hidden px-6">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-[#00A0AA] rounded-full opacity-20 blur-2xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-[#FFC567] rounded-full opacity-20 blur-2xl"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 w-full max-w-6xl">
        {/* Left Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex justify-center"
        >
          <motion.img
            src="assets/undraw_medicine_b-1-ol.svg"
            alt="Login Illustration"
            className="h-[420px] drop-shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30"
        >
          <h1 className="text-[36px] font-extrabold text-[#111] mb-8 text-center">
            Welcome Back 👋
          </h1>

          <form onSubmit={handleLogIn} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[50px] rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[50px] rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-[50px] bg-[#00A0AA] text-white font-bold rounded-xl shadow-lg hover:bg-[#00838a] transition-all"
            >
              Login
            </motion.button>
          </form>

          {/* Links */}
          <div className="mt-5 text-center">
            <p>
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="text-[#00A0AA] hover:underline font-semibold"
              >
                Create account
              </Link>
            </p>
            <Link
              to="/forgetPassword"
              className="text-[#00A0AA] hover:underline block mt-2"
            >
              Forgot Password?
            </Link>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </section>
  );
};

export default LoginPage;
