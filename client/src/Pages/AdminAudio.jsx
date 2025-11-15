import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminAudio = () =>{

  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        // console.log("Fetching audios...");
        // console.log("line 12...");
        const res = await axios.get("http://localhost:3000/audios");
        // console.log("Fetched audios line 4:", res.data);
        if (Array.isArray(res.data)) {
          setAudios(res.data);
        } else {
          setAudios([]);
        }
      } catch (error) {
        console.error("Error fetching audios line 21:", error);
        setAudios([]);
      }
    };

    fetchAudios();

    const channel = new BroadcastChannel("audioUploadChannel");
    channel.onmessage = (event) => {
      if (event.data === "new-audio-uploaded") {
        console.log("🔄 Refreshing audios on admin side...");
        fetchAudios();
      }
    };

    return () => channel.close();
  }, []);

  return (
    <motion.div
      className="p-10 min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100"
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
          Uploaded Audios
        </motion.h1>
        <button
          onClick={() => {
            window.location.href = "/admin-audio-filter";
          }}
          className="bg-red-700 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          Prior Patients
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="py-4 px-6">Patient Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Urgency Score</th>
              <th className="py-4 px-6">Priority</th>
              <th className="py-4 px-6">Transcript</th>
              <th className="py-4 px-6">Play</th>
            </tr>
          </thead>
          <tbody>
            {audios.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No audio files found.
                </td>
              </motion.tr>
            ) : (
              audios.map((audio, index) => {
                const audioUrl = `http://localhost:3000/audio/${audio.fileId || audio.id}`;
                
                // Get priority color and text
                const getPriorityInfo = (rank) => {
                  switch(rank) {
                    case 1: return { color: 'bg-red-500 text-white', text: 'HIGH' };
                    case 2: return { color: 'bg-yellow-500 text-white', text: 'MEDIUM' };
                    case 3: return { color: 'bg-green-500 text-white', text: 'LOW' };
                    default: return { color: 'bg-gray-500 text-white', text: 'N/A' };
                  }
                };
                
                const priority = getPriorityInfo(audio.urgencyRank);
                
                return (
                  <motion.tr
                    key={audio.id || audio.fileId}
                    className="text-center border-b border-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <td className="py-4 px-6 font-semibold">
                      {audio.name || 'Unknown'}
                    </td>
                    <td className="py-4 px-6">
                      {audio.email || 'Unknown'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-2xl font-bold text-blue-600">
                        {audio.sentimentScore ? audio.sentimentScore.toFixed(1) : 'N/A'}
                      </span>
                      <span className="text-xs text-gray-500 block">/10</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${priority.color}`}>
                        {priority.text}
                      </span>
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <div className="text-sm text-gray-600 truncate" title={audio.transcript}>
                        {audio.transcript || 'No transcript'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <audio controls src={audioUrl} className="w-64 h-10" />
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

export default AdminAudio;