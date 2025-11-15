import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminAudioFilter = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const detailsRef = useRef(null); // Reference to the details section

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        // Use the emergency ranking API to get AI-analyzed audios
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
        console.log("🔄 Refreshing emergency ranking with new AI analysis...");
        fetchAudios();
      }
    };

    return () => channel.close();
  }, []);

  // Auto-scroll to details when expanded
  useEffect(() => {
    if (expandedRow && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
  }, [expandedRow]);

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

  // Get severity color based on AI analysis
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-600 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      case "minimal":
        return "bg-blue-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Format symptoms for display
  const formatSymptoms = (symptoms) => {
    if (!symptoms || symptoms.length === 0) return "None detected";
    return symptoms.map(s => s.symptom).join(", ");
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
          🤖 AI-Powered Emergency Triage System
        </motion.h1>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = "/admin-dashboard"}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => window.location.href = "/admin-audio"}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
          >
            View All Audios
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-red-100 border-2 border-red-500 rounded-lg p-4 shadow"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <h3 className="text-red-700 font-bold text-lg">Critical Cases</h3>
          <p className="text-3xl font-bold text-red-600">
            {audios.filter(a => a.urgencyRank === 1 && a.aiAnalysis?.severity === 'critical').length}
          </p>
        </motion.div>
        <motion.div
          className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 shadow"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-orange-700 font-bold text-lg">High Priority</h3>
          <p className="text-3xl font-bold text-orange-600">
            {audios.filter(a => a.urgencyRank === 1).length}
          </p>
        </motion.div>
        <motion.div
          className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 shadow"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-yellow-700 font-bold text-lg">Medium Priority</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {audios.filter(a => a.urgencyRank === 2).length}
          </p>
        </motion.div>
        <motion.div
          className="bg-green-100 border-2 border-green-500 rounded-lg p-4 shadow"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-green-700 font-bold text-lg">Low Priority</h3>
          <p className="text-3xl font-bold text-green-600">
            {audios.filter(a => a.urgencyRank === 3).length}
          </p>
        </motion.div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center">
            <tr>
              <th className="py-4 px-4 text-sm">Rank</th>
              <th className="py-4 px-4 text-sm">Patient</th>
              <th className="py-4 px-4 text-sm">Priority</th>
              <th className="py-4 px-4 text-sm">AI Severity</th>
              <th className="py-4 px-4 text-sm">Score</th>
              <th className="py-4 px-4 text-sm">Confidence</th>
              <th className="py-4 px-4 text-sm">Detected Symptoms</th>
              <th className="py-4 px-4 text-sm">Transcript</th>
              <th className="py-4 px-4 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audios.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">No patient audio recordings found.</p>
                    <p className="text-sm text-gray-400">Upload voice recordings to see AI-powered emergency analysis</p>
                  </div>
                </td>
              </tr>
            ) : (
              audios.map((audio, index) => {
                const audioUrl = `http://localhost:3000/audio/${audio.fileId}`;
                const aiAnalysis = audio.aiAnalysis || {};
                const isExpanded = expandedRow === audio._id;
                
                return (
                  <motion.tr
                    key={audio._id}
                    className={`text-center border-b border-gray-200 ${
                      audio.urgencyRank === 1 ? 'bg-red-50' : 
                      audio.urgencyRank === 2 ? 'bg-yellow-50' : 
                      'bg-green-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: audio.urgencyRank === 1 ? 'rgba(254, 226, 226, 1)' : 
                                     audio.urgencyRank === 2 ? 'rgba(254, 249, 195, 1)' : 
                                     'rgba(220, 252, 231, 1)',
                    }}
                  >
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                        audio.urgencyRank === 1 ? 'bg-red-600 text-white' :
                        audio.urgencyRank === 2 ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-gray-800">{audio.name}</span>
                        <span className="text-xs text-gray-500">{audio.email}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(audio.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${getUrgencyColor(audio.urgencyRank)}`}>
                        {getUrgencyText(audio.urgencyRank)}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase ${getSeverityColor(aiAnalysis.severity)}`}>
                        {aiAnalysis.severity || 'N/A'}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-purple-600">
                          {audio.sentimentScore?.toFixed(1) || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">/ 10</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-center">
                        <span className={`text-lg font-bold ${
                          aiAnalysis.confidence >= 80 ? 'text-green-600' :
                          aiAnalysis.confidence >= 60 ? 'text-yellow-600' :
                          'text-orange-600'
                        }`}>
                          {aiAnalysis.confidence?.toFixed(0) || 'N/A'}%
                        </span>
                        <span className="text-xs text-gray-500">AI Confidence</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4 max-w-xs">
                      {aiAnalysis.detectedSymptoms && aiAnalysis.detectedSymptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {aiAnalysis.detectedSymptoms.slice(0, 3).map((symptom, idx) => (
                            <span
                              key={idx}
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                symptom.severity === 'critical' ? 'bg-red-200 text-red-800' :
                                symptom.severity === 'serious' ? 'bg-orange-200 text-orange-800' :
                                'bg-yellow-200 text-yellow-800'
                              }`}
                              title={symptom.severity}
                            >
                              {symptom.symptom}
                            </span>
                          ))}
                          {aiAnalysis.detectedSymptoms.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{aiAnalysis.detectedSymptoms.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">None detected</span>
                      )}
                    </td>
                    
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-xs text-gray-700 line-clamp-2" title={audio.transcript}>
                        {audio.transcript || "No transcript available"}
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : audio._id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded transition"
                        >
                          {isExpanded ? '▲ Hide Details' : '▼ View Details'}
                        </button>
                        <audio controls src={audioUrl} className="w-48 h-10" />
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Expanded Details Section */}
      {expandedRow && audios.find(a => a._id === expandedRow) && (
        <motion.div
          ref={detailsRef}
          className="mt-6 bg-white rounded-xl shadow-xl p-6 border-2 border-purple-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const audio = audios.find(a => a._id === expandedRow);
            const aiAnalysis = audio.aiAnalysis || {};
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                    <span>🩺</span> Patient Details
                  </h2>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Patient Name</p>
                    <p className="text-lg font-bold text-gray-800">{audio.name}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{audio.email}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Recording Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(audio.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Full Transcript</p>
                    <div className="bg-white p-3 rounded border border-purple-200 max-h-40 overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {audio.transcript || "No transcript available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - AI Analysis */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                    <span>🤖</span> AI Medical Analysis
                  </h2>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
                    <p className="text-sm text-gray-600">AI Classification</p>
                    <p className="text-md font-semibold text-purple-800 mt-1">
                      {aiAnalysis.aiClassification || "Not available"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-xs text-gray-600">Urgency Score</p>
                      <p className="text-3xl font-bold text-red-600">
                        {audio.sentimentScore?.toFixed(1) || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">out of 10</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600">AI Confidence</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {aiAnalysis.confidence?.toFixed(0) || 'N/A'}%
                      </p>
                      <p className="text-xs text-gray-500">certainty level</p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600 mb-2">Detected Symptoms</p>
                    {aiAnalysis.detectedSymptoms && aiAnalysis.detectedSymptoms.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.detectedSymptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              symptom.severity === 'critical' ? 'bg-red-600 text-white' :
                              symptom.severity === 'serious' ? 'bg-orange-600 text-white' :
                              'bg-yellow-500 text-white'
                            }`}
                          >
                            {symptom.symptom} ({symptom.severity})
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No specific symptoms detected</p>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    audio.urgencyRank === 1 ? 'bg-red-100 border-red-400' :
                    audio.urgencyRank === 2 ? 'bg-yellow-100 border-yellow-400' :
                    'bg-green-100 border-green-400'
                  }`}>
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      🏥 Medical Recommendation
                    </p>
                    <p className={`text-sm font-semibold ${
                      audio.urgencyRank === 1 ? 'text-red-700' :
                      audio.urgencyRank === 2 ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      {aiAnalysis.recommendation || "No recommendation available"}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setExpandedRow(null)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminAudioFilter;
