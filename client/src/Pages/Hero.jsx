import Home from "./Home";
import About from "./About";
import ServicesPage from "./ServicesPage";
import WhyChooseUs from "./WhyChooseUs";
import CarousalPage from "./CarousalPage";
import ConnectWithUs from "./ConnectWithUs";
import Footer from "./Footer";
import { useRef } from "react";
import { motion } from "framer-motion";

// Animation settings for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Bubble animation settings
const bubbleVariants = {
  animate: {
    y: [0, -200], // move upward
    opacity: [0, 1, 0], // fade in/out
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = (props) => {
  const MessageNameSection = useRef(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fdfdfd] via-[#fafafa] to-[#f5f7fa]">
      {/* Floating Bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 bg-pink-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
          }}
          variants={bubbleVariants}
          animate="animate"
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Here we pass hover motion to Home image */}
        <Home HomeSection={props.HomeSection} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <About AboutSection={props.AboutSection} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ServicesPage ServicesPageSection={props.ServicesPageSection} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <WhyChooseUs WhyChooseUsSection={props.WhyChooseUsSection} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CarousalPage CarousalPageSection={props.CarousalPageSection} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ConnectWithUs
          ConnectWithUsSection={props.ConnectWithUsSection}
          MessageNameSection={MessageNameSection}
        />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer
          ConnectWithUsSection={props.ConnectWithUsSection}
          MessageNameSection={MessageNameSection}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
