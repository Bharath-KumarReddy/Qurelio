import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const encryptedData = sessionStorage.getItem("encryptedData");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/${encryptedData}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          passwordConfirm,
        }),
      });

      if (response.ok) {
        toast.success("Password successfully changed! Please login.");
        sessionStorage.removeItem("encryptedData");
        sessionStorage.removeItem("jwt");
        setTimeout(() => navigateToLogin(), 1200);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Password change failed.");
      }
    } catch (err) {
      console.error("Error changing the password:", err.message);
      toast.error("Something went wrong. Try again.");
    }

    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F7F9] via-[#FDFDFD] to-[#EAEAEA] relative overflow-hidden px-6">
      {/* Animated background blobs (same as login page) */}
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
        {/* Left illustration */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex justify-center"
        >
          <motion.img
            src="assets/authentication-two-color-b35f8.svg"
            alt="Change Password Illustration"
            className="h-[400px] drop-shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30"
        >
          <h1 className="text-[32px] font-extrabold text-[#111] mb-6 text-center">
            Change Password 🔒
          </h1>

          <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[50px] rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full h-[50px] rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-[50px] bg-[#00A0AA] text-white font-bold rounded-xl shadow-lg hover:bg-[#00838a] transition-all"
            >
              Update Password
            </motion.button>
          </form>

          <div className="mt-5 text-center">
            <p>
              Don’t want to change?{" "}
              <Link to="/" className="text-[#00A0AA] hover:underline font-semibold">
                Go Home
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </section>
  );
};

export default ChangePassword;