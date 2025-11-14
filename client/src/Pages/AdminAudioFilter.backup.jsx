import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminAudioFilter = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        // Use the emergency ranking API instead of hardcoded priorities
        const res = await axios.get("http://localhost:3000/emergency-ranking");
        setAudios(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emergency ranking:", error);
        setAudios([]);
        setLoading(false);
      }
    };

    fetchAudios();

    // Listen for new audio uploads
    const channel = new BroadcastChannel("audioUploadChannel");
    channel.onmessage = (event) => {
      if (event.data === "new-audio-uploaded") {
        console.log("🔄 Refreshing emergency ranking...");
        fetchAudios();
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
      <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-xl text-purple-700">Loading prioritized cases...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-purple-50 to-purple-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-purple-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🚨 Prioritized Patient Audios (AI-Ranked)
        </motion.h1>
        <button
          onClick={() => {
            window.location.href = "/emergency-ranking";
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          View Emergency Cases
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-purple-600 text-white text-center">
            <tr>
              <th className="py-4 px-6">Rank</th>
              <th className="py-4 px-6">Patient Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Priority</th>
              <th className="py-4 px-6">Urgency Score</th>
              <th className="py-4 px-6">Transcript</th>
              <th className="py-4 px-6">Play Audio</th>
            </tr>
          </thead>
          <tbody>
            {audios.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No audio files found.
                </td>
              </tr>
            ) : (
              audios.map((audio, index) => {
                const audioUrl = `http://localhost:3000/audio/${audio.fileId}`;
                return (
                  <motion.tr
                    key={audio._id}
                    className="text-center border-b border-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                    }}
                  >
                    <td className="py-4 px-6 font-bold text-purple-600">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold">{audio.name}</td>
                    <td className="py-4 px-6">{audio.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 ${getUrgencyColor(
                          audio.urgencyRank
                        )}`}
                      >
                        {getUrgencyText(audio.urgencyRank)}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-purple-600">
                      {audio.sentimentScore?.toFixed(2) || "N/A"}
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <div className="text-sm text-gray-600 truncate" title={audio.transcript}>
                        {audio.transcript || "No transcript"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <audio controls src={audioUrl} className="h-10" />
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminAudioFilter;
