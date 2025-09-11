import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EmergencyRanking = () => {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmergencyRanking = async () => {
    try {
      const res = await axios.get("http://localhost:3000/emergency-ranking");
      setRankedUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching emergency ranking:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyRanking();

    // Listen for new audio uploads
    const channel = new BroadcastChannel("audioUploadChannel");
    channel.onmessage = (event) => {
      if (event.data === "new-audio-uploaded") {
        console.log("🔄 Refreshing emergency ranking...");
        fetchEmergencyRanking();
      }
    };

    return () => channel.close();
  }, []);

  const getUrgencyColor = (urgencyRank) => {
    switch (urgencyRank) {
      case 1:
        return "bg-red-100 border-red-500 text-red-800";
      case 2:
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case 3:
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  const getUrgencyText = (urgencyRank) => {
    switch (urgencyRank) {
      case 1:
        return "HIGH PRIORITY";
      case 2:
        return "MEDIUM PRIORITY";
      case 3:
        return "LOW PRIORITY";
      default:
        return "UNKNOWN";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-xl text-red-700">Loading emergency cases...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-red-50 to-red-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-red-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🚨 Emergency Cases Ranking
        </motion.h1>
        <button
          onClick={() => {
            window.location.href = "/admin-audio";
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          View All Audios
        </button>
      </div>

      {rankedUsers.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Emergency Cases</h2>
          <p className="text-gray-500">No audio recordings have been analyzed yet.</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {rankedUsers.map((user, index) => (
            <motion.div
              key={user._id}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-red-600">#{index + 1}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 ${getUrgencyColor(
                      user.urgencyRank
                    )}`}
                  >
                    {getUrgencyText(user.urgencyRank)}
                  </span>
                  <div className="mt-2 text-lg font-bold text-red-600">
                    Score: {user.sentimentScore?.toFixed(2) || "N/A"}
                  </div>
                </div>
              </div>

              {user.transcript && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">📝 Patient's Message:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-800 italic">"{user.transcript}"</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <audio
                    controls
                    src={`http://localhost:3000/audio/${user.fileId}`}
                    className="h-10"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  ID: {user.fileId}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EmergencyRanking;
