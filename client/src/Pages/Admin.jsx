import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-tr from-pink-50 to-pink-50 flex items-center justify-center text-white px-4 pt-16">
      <div className="text-center max-w-2xl space-y-8">
        <motion.h1
          className="text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-black">Welcome to</span> <span className="text-purple-500">Your Dynamic Dashboard</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Easily manage users, analyze key metrics, and visualize data insights with our interactive tools.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.button
            onClick={() => navigate("/admin-users")}
            className="bg-purple-600 text-white font-semibold px-6 py-4 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Manage Users
            <i className="ri-arrow-right-line text-xl ml-3"></i>
          </motion.button>
          <motion.button
            onClick={() => navigate("/emergency-ranking")}
            className="bg-red-600 text-white font-semibold px-6 py-4 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🚨 Emergency Cases
            <i className="ri-arrow-right-line text-xl ml-3"></i>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
