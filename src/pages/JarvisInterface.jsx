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

const sectionFont = "font-['Space_Grotesk',sans-serif]";

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
      setStatusText("Didn't reach the server — tap to try again");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
      />

      {/* ── Header ────────────────────────────────────────── */}
      <header className="px-6 py-4 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)" }}
            >
              <FiMic className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold text-slate-800 tracking-tight ${sectionFont}`}>
                JARVIS
              </h1>
              <p className="text-slate-400 text-[11px] tracking-wide">KLIMS Hospital Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingBooking && (
              <div
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border"
                style={{
                  background: "linear-gradient(135deg, #ECFDF5, #F0F9FF)",
                  borderColor: "#A7F3D0",
                }}
              >
                <FiCalendar className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 text-xs font-medium">Booking in progress</span>
              </div>
            )}
            {/* Online indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              <span className="text-slate-400 text-[10px] font-medium tracking-wide uppercase">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Chat Area ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-6 py-8 space-y-5 max-w-3xl w-full mx-auto">
        {history.length === 0 && (
          <div className="flex flex-col items-center text-center pt-16">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
              style={{ background: "linear-gradient(135deg, #EEF2FF, #FAF5FF)" }}
            >
              <FiMessageCircle className="w-7 h-7 text-blue-400" />
            </div>
            <p className={`text-slate-700 text-base font-semibold mb-2 ${sectionFont}`}>
              How can I help you today?
            </p>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              Ask about a department, a doctor, a symptom — or say
              "book an appointment."
            </p>
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {[
                "Which doctors are available today?",
                "Book an appointment",
                "Tell me about cardiology",
                "Emergency department hours",
              ].map((chip) => (
                <div
                  key={chip}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50/60
                             text-slate-500 text-xs font-medium hover:border-blue-200 hover:text-blue-500
                             hover:bg-blue-50/50 transition-all duration-200 cursor-default"
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        )}

        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            style={{ animation: "fade-in-up 0.3s ease-out both" }}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === "user" ? "" : "bg-slate-100 border border-slate-200"
              }`}
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }
                  : undefined
              }
            >
              {msg.role === "user" ? (
                <FiUser className="w-3.5 h-3.5 text-white" />
              ) : (
                <FiMic className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[72%] px-5 py-3.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white rounded-2xl rounded-br-md shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
                  : "bg-white text-slate-700 rounded-2xl rounded-bl-md border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
              }`}
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }
                  : undefined
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
      </main>

      {/* ── Footer / Mic ──────────────────────────────────── */}
      <footer className="px-6 py-6 flex flex-col items-center gap-3 border-t border-slate-100/80 bg-white/80 backdrop-blur-xl">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center
                     transition-all duration-300 disabled:opacity-50 hover:scale-105 cursor-pointer"
          style={{
            background: isRecording
              ? "linear-gradient(135deg, #EF4444, #DC2626)"
              : "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)",
            boxShadow: isRecording
              ? "0 8px 30px rgba(239,68,68,0.35)"
              : "0 8px 30px rgba(59,130,246,0.3)",
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
          <p className={`text-sm font-medium ${hasError ? "text-red-400" : "text-slate-400"}`}>
            {statusText}
          </p>
        </div>
        <audio ref={audioPlayerRef} className="hidden" />
      </footer>
    </div>
  );
}