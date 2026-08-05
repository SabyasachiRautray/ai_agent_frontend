import { useRef, useState } from "react";
import { useConverseMutation } from "../api/jarvisApi";
import {
  FiMic,
  FiSquare,
  FiUser,
  FiMessageCircle,
  FiCalendar,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

export default function JarvisInterface() {
  const [history, setHistory] = useState([]);
  const [pendingBooking, setPendingBooking] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState("Tap to speak");
  const [hasError, setHasError] = useState(false);

  const [converse, { isLoading }] = useConverseMutation();

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioPlayerRef = useRef(null);

  const startRecording = async () => {
    setHasError(false);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = handleRecordingStop;

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setStatusText("Listening...");
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    setIsRecording(false);
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    setStatusText("Thinking...");

    try {
      const result = await converse({
        audioBlob,
        history,
        pendingBooking,
        currentBooking,
      }).unwrap();

      setHistory(result.history);
      setPendingBooking(result.pending_booking);
      setCurrentBooking(result.current_booking);
      setStatusText("Tap to speak");
      setHasError(false);

      if (result.audio_base64 && audioPlayerRef.current) {
        audioPlayerRef.current.src = `data:audio/mp3;base64,${result.audio_base64}`;
        audioPlayerRef.current.play();
      }
    } catch (err) {
      setHasError(true);
      setStatusText("Didn't reach the server -- tap to try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFD] flex flex-col">
      <style>{`
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <header className="px-8 py-6 border-b border-slate-100 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6,#7C3AED)" }}
            >
              <FiMic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight font-['Space_Grotesk',sans-serif]">
                JARVIS
              </h1>
              <p className="text-slate-400 text-xs">KLIMS Hospital Assistant</p>
            </div>
          </div>

          {pendingBooking && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
              <FiCalendar className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-cyan-700 text-xs font-medium">Booking in progress</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-8 py-8 space-y-4 max-w-3xl w-full mx-auto">
        {history.length === 0 && (
          <div className="flex flex-col items-center text-center pt-20">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
              <FiMessageCircle className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-slate-300 text-sm max-w-xs">
              Ask about a department, a doctor, a symptom -- or say "book an appointment."
            </p>
          </div>
        )}
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "" : "bg-slate-100"
              }`}
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg,#06B6D4,#3B82F6)" }
                  : undefined
              }
            >
              {msg.role === "user" ? (
                <FiUser className="w-3.5 h-3.5 text-white" />
              ) : (
                <FiMic className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
                  : "bg-white text-slate-700 border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
              }`}
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg,#06B6D4,#3B82F6)" }
                  : undefined
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
      </main>

      <footer className="px-8 py-8 flex flex-col items-center gap-3 border-t border-slate-100 bg-white/70 backdrop-blur-sm">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className="relative w-20 h-20 rounded-full flex items-center justify-center transition-transform
                     disabled:opacity-50 hover:scale-105 shadow-[0_8px_30px_rgba(59,130,246,0.3)]"
          style={{
            background: isRecording
              ? "linear-gradient(135deg,#EF4444,#DC2626)"
              : "linear-gradient(135deg,#06B6D4,#3B82F6,#7C3AED)",
          }}
        >
          {isRecording && (
            <span
              className="absolute inset-0 rounded-full border-2 border-red-400"
              style={{ animation: "pulse-ring 1.4s ease-out infinite" }}
            />
          )}
          {isLoading ? (
            <FiLoader className="w-6 h-6 text-white" style={{ animation: "spin 0.9s linear infinite" }} />
          ) : isRecording ? (
            <FiSquare className="w-6 h-6 text-white" />
          ) : (
            <FiMic className="w-6 h-6 text-white" />
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {hasError && <FiAlertCircle className="w-3.5 h-3.5 text-red-400" />}
          <p className={`text-sm ${hasError ? "text-red-400" : "text-slate-400"}`}>
            {statusText}
          </p>
        </div>
        <audio ref={audioPlayerRef} className="hidden" />
      </footer>
    </div>
  );
}