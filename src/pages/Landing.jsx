import { useEffect, useState } from "react";
import {
  FiMic,
  FiCalendar,
  FiGlobe,
  FiClock,
  FiShield,
  FiCpu,
  FiMessageCircle,
  FiVolume2,
  FiArrowRight,
} from "react-icons/fi";

const FEATURES = [
  {
    icon: FiMessageCircle,
    title: "Ask anything",
    desc: "Departments, doctors, symptoms -- explained in plain language, not medical jargon.",
  },
  {
    icon: FiCalendar,
    title: "Book in seconds",
    desc: "End-to-end appointment booking, entirely by voice. No forms, no hold music.",
  },
  {
    icon: FiGlobe,
    title: "Hindi + English",
    desc: "Switches language mid-conversation. Speaks and understands both, naturally.",
  },
  {
    icon: FiClock,
    title: "Always on",
    desc: "Available around the clock -- for the question that can't wait until morning.",
  },
  {
    icon: FiShield,
    title: "Private by design",
    desc: "Fully stateless. Nothing about your conversation is stored once you close the tab.",
  },
  {
    icon: FiCpu,
    title: "Real hospital data",
    desc: "Trained on KLIMS Hospital's actual departments, doctors, and schedules -- not guesses.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tap to speak",
    desc: "Press the mic and ask your question the way you'd ask a person.",
  },
  {
    n: "02",
    title: "JARVIS listens & understands",
    desc: "Your speech is transcribed and matched against live hospital data in real time.",
  },
  {
    n: "03",
    title: "Get your answer -- or book",
    desc: "A doctor's name, a department, or a confirmed appointment -- all in one conversation.",
  },
];

const STATS = [
  { value: "2", label: "Languages" },
  { value: "24/7", label: "Availability" },
  { value: "0", label: "Data retained" },
  { value: "1", label: "Voice, real answers" },
];

const STACK = [
  { icon: FiMic, label: "Real-time speech recognition" },
  { icon: FiCpu, label: "Hospital-tuned retrieval (RAG)" },
  { icon: FiVolume2, label: "Natural neural voice replies" },
  { icon: FiGlobe, label: "Automatic language detection" },
];

export default function Landing({ onEnter }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#FBFCFD] relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.16] blur-3xl"
        style={{
          background: "conic-gradient(from 90deg, #06B6D4, #3B82F6, #7C3AED, #06B6D4)",
          animation: "spin 24s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin { to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes breathe { 0%,100% { transform: scale(1); opacity: .55; } 50% { transform: scale(1.08); opacity: .9; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Nav */}
        <div className="pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#06B6D4,#7C3AED)" }}
            />
            <span className="text-slate-600 text-sm font-medium tracking-wide">
              KLIMS Hospital
            </span>
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-slate-400">
            AI Voice Assistant
          </span>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center text-center pt-14 pb-16">
          <div className="relative mb-8">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
                animation: mounted ? "breathe 3.5s ease-in-out infinite" : "none",
              }}
            />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100">
              <FiMic className="w-8 h-8" style={{ color: "#3B82F6" }} />
            </div>
          </div>

          <h1
            className="text-7xl md:text-8xl font-semibold tracking-tight mb-6 font-['Space_Grotesk',sans-serif]"
            style={{
              background: "linear-gradient(135deg,#0F172A 20%,#3B82F6 60%,#7C3AED 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            JARVIS
          </h1>

          <p className="text-slate-500 max-w-xl mb-4 text-lg leading-relaxed">
            A voice assistant trained on KLIMS Hospital's own departments, doctors,
            and scheduling -- built to answer the question you have right now.
          </p>
          <p className="text-slate-400 max-w-lg mb-10 text-sm leading-relaxed">
            Powered by real-time speech recognition and a hospital-tuned language
            model, JARVIS listens, understands symptoms in context, and can book
            your appointment before you'd finish filling out a form.
          </p>

          <button
            onClick={onEnter}
            className="group relative flex items-center gap-2 px-10 py-4 rounded-full text-white font-medium text-lg
                       shadow-[0_10px_40px_rgba(59,130,246,0.35)] hover:shadow-[0_10px_50px_rgba(124,58,237,0.4)]
                       transition-shadow"
            style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6,#7C3AED)" }}
          >
            Activate JARVIS
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20 group-hover:opacity-40" />
          </button>
          <p className="text-slate-400 text-xs mt-4 tracking-wide">
            Tap once, then just speak -- English or Hindi
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-4 py-8 mb-4 border-y border-slate-100">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl font-semibold font-['Space_Grotesk',sans-serif]"
                style={{
                  background: "linear-gradient(135deg,#3B82F6,#7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="text-slate-400 text-xs mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="pt-16 pb-4 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight font-['Space_Grotesk',sans-serif] mb-2">
            What JARVIS can do
          </h2>
          <p className="text-slate-400 text-sm mb-10">
            Six things it handles better than a waiting-room brochure
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_20px_rgba(15,23,42,0.04)]
                         hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6)" }}
              >
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-slate-900 font-semibold text-lg mb-1.5 font-['Space_Grotesk',sans-serif]">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works -- a real sequence, so numbering earns its place */}
        <div className="pb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight font-['Space_Grotesk',sans-serif] mb-2">
              How it works
            </h2>
            <p className="text-slate-400 text-sm">One conversation, start to finish</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div
                  className="text-5xl font-semibold mb-3 font-['Space_Grotesk',sans-serif] opacity-20"
                  style={{
                    background: "linear-gradient(135deg,#3B82F6,#7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="text-slate-900 font-semibold text-lg mb-1.5 font-['Space_Grotesk',sans-serif]">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About the AI */}
        <div className="pb-24 rounded-3xl bg-white border border-slate-100 shadow-[0_2px_30px_rgba(15,23,42,0.05)] p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-cyan-600 font-medium">
                Under the hood
              </span>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight font-['Space_Grotesk',sans-serif] mt-2 mb-4">
                Not a chatbot with a microphone bolted on
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                JARVIS pairs real-time speech recognition with a language model
                grounded in KLIMS Hospital's own records -- so answers about
                doctors, departments, and availability come from actual data,
                not a general knowledge guess. Every reply is spoken back in a
                natural voice, in whichever language you asked in.
              </p>
            </div>
            <div className="space-y-4">
              {STACK.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6)" }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-600 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center pb-16">
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight font-['Space_Grotesk',sans-serif] mb-6">
            Your question is one tap away
          </h2>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-medium text-lg
                       shadow-[0_10px_40px_rgba(59,130,246,0.35)] hover:shadow-[0_10px_50px_rgba(124,58,237,0.4)]
                       transition-shadow"
            style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6,#7C3AED)" }}
          >
            Activate JARVIS
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="text-center pb-10 text-slate-300 text-xs tracking-wide">
          Built for KLIMS Hospital &middot; Speech recognized on-device, processed securely
        </div>
      </div>
    </div>
  );
}