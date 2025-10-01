import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Pages/Hero";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ChangePassword from "./Pages/ChangePassword";
import PageNotFound from "./Pages/PageNotFound";
import Doctors from "./Pages/Doctors";
import DiagnosesPage from "./Pages/DiagnosesPage";
import ForgotPassword from "./Pages/ForgotPassword";
import VoiceRecorder from "./Components/VoiceRecorder";
import Admin from "./Pages/Admin";
import AdminUser from "./Pages/AdminUser";
import AdminAudio from "./Pages/AdminAudio";
import AdminAudioFilter from "./Pages/AdminAudioFilter";
import EmergencyRanking from "./Pages/EmergencyRanking";

// 🟢 New Pages
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/ConnectWithUs";

import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const jwt = sessionStorage.getItem("jwt");
  const encryptedData = sessionStorage.getItem("encryptedData");
  const location = useLocation();

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      {/* Navbar stays fixed */}
      <Navbar message={"login successful"} />

      {/* Toastify Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Hero />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AboutPage />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ContactPage />
              </motion.div>
            }
          />
          <Route
            path="/hospitals"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Doctors />
              </motion.div>
            }
          />
          <Route
            path="/diagnoses"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <DiagnosesPage />
              </motion.div>
            }
          />
          <Route
            path="/forgetPassword"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ForgotPassword />
              </motion.div>
            }
          />
          {!jwt && (
            <Route
              path="/login"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <LoginPage />
                </motion.div>
              }
            />
          )}
          {!jwt && (
            <Route
              path="/signup"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <SignUpPage />
                </motion.div>
              }
            />
          )}
          {encryptedData && (
            <Route
              path="/changePass"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ChangePassword />
                </motion.div>
              }
            />
          )}
          <Route
            path="/admin-dashboard"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Admin />
              </motion.div>
            }
          />
          <Route
            path="/admin-users"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AdminUser />
              </motion.div>
            }
          />
          <Route
            path="/admin-audio"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AdminAudio />
              </motion.div>
            }
          />
          <Route
            path="/admin-audio-filter"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AdminAudioFilter />
              </motion.div>
            }
          />
          <Route
            path="/emergency-ranking"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <EmergencyRanking />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PageNotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Floating Voice Recorder */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <VoiceRecorder />
      </motion.div>
    </div>
  );
}

export default App;