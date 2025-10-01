import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const ConnectWithUs = (props) => {
  const navigate = useNavigate();
  const encryptedData = sessionStorage.getItem("encryptedData");
  const jwt = sessionStorage.getItem("jwt");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!jwt) {
      toast.error("Please login to send us a message!!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/sendMessage/${encryptedData}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message }),
        }
      );

      if (response.ok) {
        toast.success("Thanks for your message!");
        setName("");
        setMessage("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Message sending failed");
      }
    } catch (err) {
      console.error("Error sending message:", err.message);
      toast.error("Something went wrong while sending your message.");
    }
  };

  return (
    <section
      className="relative py-[100px] bg-gradient-to-br from-[#E6F7F9] via-[#FDFDFD] to-[#EAEAEA] overflow-hidden"
      id="ConnectWithUs"
      ref={props.ConnectWithUsSection}
    >
      {/* Decorative Background Circles */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-[#00A0AA] rounded-full opacity-20 blur-2xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-56 h-56 bg-[#FFC567] rounded-full opacity-20 blur-2xl"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto px-6">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-semibold text-lg text-[#00A0AA] uppercase tracking-wide">
            Connect With Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-4">
            Take a Step Towards <br />
            <span className="text-[#00A0AA]">Better Prevention</span>
          </h1>
          <p className="text-lg text-gray-700 mt-6">
            We’re here to listen. Share your thoughts, questions, or feedback —
            let’s build a healthier future together. 🌱
          </p>
        </motion.div>

        {/* Right Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl p-10 border border-white/30"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send us a Message ✉️
          </h2>
          <form onSubmit={handleSendMessage} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              ref={props.MessageNameSection}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-[50px] rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all"
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full h-[120px] rounded-xl px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A0AA] transition-all resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-[50px] bg-[#00A0AA] text-white font-bold rounded-xl shadow-lg hover:bg-[#00838a] transition-all"
            >
              Submit Now
            </motion.button>
          </form>
        </motion.div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </section>
  );
};

export default ConnectWithUs;