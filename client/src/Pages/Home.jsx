import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = (props) => {
  const navigate = useNavigate();
  const navigateToDiagnoses = () => {
    navigate("/diagnoses");
  };

  // Generate random bubbles
  const bubbles = [...Array(10)];

  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 font-Satoshi mt-[60px] mb-[120px] w-full px-6 sm:px-12 overflow-hidden"
      id="Home"
      ref={props.HomeSection}
    >
      {/* Floating Bubbles in the Background */}
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 bg-pink-500 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 25}px`,
            height: `${10 + Math.random() * 25}px`,
          }}
          animate={{ y: [0, -300], opacity: [0, 1, 0] }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Left Section - Image */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="bg-gradient-to-tr from-[#FFC567] to-[#FFD98E] rounded-2xl shadow-2xl relative overflow-hidden w-[320px] h-[360px] sm:w-[450px] sm:h-[480px] md:w-[500px] md:h-[500px] flex justify-center items-center"
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <motion.img
            src="/assets/image 32.svg"
            alt="health illustration"
            className="absolute bottom-0 w-[280px] sm:w-[380px] md:w-[420px]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.08, rotate: 2, x: 10, y: -10 }}
          />

          {/* Decorative floating shapes */}
          <motion.div
            className="absolute top-6 left-6 w-10 h-10 bg-[#00A0AA] rounded-full opacity-80"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-6 h-6 bg-[#FFF] rounded-full shadow-lg"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Right Section - Text */}
      <motion.div
        className="flex flex-col justify-center lg:ml-[50px] text-start"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-[18px] sm:text-[22px] text-[#00A0AA] font-semibold tracking-wide uppercase">
          Welcome to Qurelio
        </p>
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111] leading-snug mt-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Your Journey to
          <br />
          <span className="text-[#00A0AA]">Better Health</span>
          <br />
          Starts Here
        </motion.h1>

        <motion.button
          onClick={navigateToDiagnoses}
          className="mt-10 sm:mt-14 bg-[#00A0AA] hover:bg-[#00838a] rounded-2xl text-[16px] sm:text-[20px] font-bold px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 w-fit"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover More
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;
