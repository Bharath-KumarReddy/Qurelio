import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const [audioId, setAudioId] = useState(null);

  const startRecording = async () => {
    const token = sessionStorage.getItem("jwt");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");

    if (!token) {
      toast.error("Please login first to record audio!");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setTranscript("");

      // Initialize Web Speech API for transcription
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsTranscribing(true);
          console.log('Speech recognition started');
        };

        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsTranscribing(false);
        };

        recognition.onend = () => {
          setIsTranscribing(false);
          console.log('Speech recognition ended');
        };

        recognitionRef.current = recognition;
        recognition.start();
      }

      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("transcript", transcript);

        // Stop speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }

        axios
          .post("http://localhost:3000/upload-audio", formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            toast.success("Audio uploaded and analyzed successfully!");
            setAudioId(res.data.fileId);
            console.log("Analysis results:", res.data);
            const channel = new BroadcastChannel('audioUploadChannel');
            channel.postMessage('new-audio-uploaded');
            channel.close();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to upload audio.");
          });
      };

      recorder.start();
    } catch (err) {
      console.error("Microphone access denied:", err);
      toast.error("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current = null;
    }
  };

  return (
    <>
      {!isRecording && (
        <button
          onClick={startRecording}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 text-3xl rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
          aria-label="Start recording"
        >
          🎙️
        </button>
      )}

      {isRecording && (
        <div className="fixed bottom-24 right-6 bg-white p-5 rounded-xl shadow-lg z-50 flex flex-col gap-4 max-w-md">
          <div className="flex items-center gap-4">
            <p className="text-black font-semibold text-lg">Recording...</p>
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              aria-label="Stop recording"
            >
              Stop
            </button>
          </div>
          
          {isTranscribing && (
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Live Transcription:</p>
              <p className="mt-1 text-gray-800">{transcript || "Listening..."}</p>
            </div>
          )}
        </div>
      )}

      {audioId && (
        <audio
          controls
          src={`http://localhost:3000/audio/${audioId}`}
          className="mt-6"
        />
      )}

      <ToastContainer />
    </>
  );
};

export default VoiceRecorder;