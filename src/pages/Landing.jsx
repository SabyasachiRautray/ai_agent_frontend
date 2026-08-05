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
  FiCheck,
  FiHeart,
  FiZap,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

/* ── Data ───────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: FiMessageCircle,
    title: "Ask anything",
    desc: "Departments, doctors, symptoms — explained in plain language, not medical jargon.",
    gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)",
  },
  {
    icon: FiCalendar,
    title: "Book in seconds",
    desc: "End-to-end appointment booking, entirely by voice. No forms, no hold music.",
    gradient: "linear-gradient(135deg, #3B82F6, #7C3AED)",
  },
  {
    icon: FiGlobe,
    title: "Hindi + English",
    desc: "Switches language mid-conversation. Speaks and understands both, naturally.",
    gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
  },
  {
    icon: FiClock,
    title: "Always on",
    desc: "Available around the clock — for the question that can't wait until morning.",
    gradient: "linear-gradient(135deg, #EC4899, #F97316)",
  },
  {
    icon: FiShield,
    title: "Private by design",
    desc: "Fully stateless. Nothing about your conversation is stored once you close the tab.",
    gradient: "linear-gradient(135deg, #06B6D4, #10B981)",
  },
  {
    icon: FiCpu,
    title: "Real hospital data",
    desc: "Trained on KLIMS Hospital's actual departments, doctors, and schedules — not guesses.",
    gradient: "linear-gradient(135deg, #F97316, #EAB308)",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tap to speak",
    desc: "Press the mic and ask your question the way you'd ask a person.",
    icon: FiMic,
  },
  {
    n: "02",
    title: "JARVIS listens & understands",
    desc: "Your speech is transcribed and matched against live hospital data in real time.",
    icon: FiCpu,
  },
  {
    n: "03",
    title: "Get your answer — or book",
    desc: "A doctor's name, a department, or a confirmed appointment — all in one conversation.",
    icon: FiCheck,
  },
];

const STATS = [
  { value: "2", label: "Languages", icon: FiGlobe },
  { value: "24/7", label: "Availability", icon: FiClock },
  { value: "0", label: "Data retained", icon: FiShield },
  { value: "1s", label: "Avg. response", icon: FiZap },
];

const STACK = [
  { icon: FiMic, label: "Real-time speech recognition", desc: "Converts your voice to text instantly using cutting-edge ASR" },
  { icon: FiCpu, label: "Hospital-tuned retrieval (RAG)", desc: "Fetches answers from KLIMS Hospital's live database" },
  { icon: FiVolume2, label: "Natural neural voice replies", desc: "Replies spoken back in a natural, human-like voice" },
  { icon: FiGlobe, label: "Automatic language detection", desc: "Detects Hindi or English and responds accordingly" },
];

const TESTIMONIALS = [
  {
    text: "I asked about orthopaedic doctors at midnight and got a complete list with available slots. Incredible.",
    name: "Patient Visitor",
    role: "Emergency Ward",
    icon: FiHeart,
  },
  {
    text: "Booked my mother's appointment in 30 seconds flat — she was impressed it understood Hindi perfectly.",
    name: "Family Member",
    role: "Outpatient Dept.",
    icon: FiUsers,
  },
  {
    text: "We've seen reception call volume drop noticeably since the pilot. Patients get answers faster now.",
    name: "Staff Coordinator",
    role: "KLIMS Admin",
    icon: FiActivity,
  },
];

/* ── Helpers ────────────────────────────────────────────────── */
const sectionFont = "font-['Space_Grotesk',sans-serif]";

/* ── Component ──────────────────────────────────────────────── */
export default function Landing({ onEnter }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Ambient background decorations ───────────────────── */}
      <div
        className="pointer-events-none fixed top-[-320px] left-[-200px] w-[700px] h-[700px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed bottom-[-300px] right-[-200px] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed top-[40%] left-[60%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)" }}
      />

      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-100/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)" }}
            >
              <FiMic className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className={`text-slate-800 text-base font-semibold tracking-tight ${sectionFont}`}>
                JARVIS
              </span>
              <span className="text-slate-400 text-[11px] ml-2 tracking-widest uppercase hidden sm:inline">
                by KLIMS Hospital
              </span>
            </div>
          </div>
          <button
            onClick={onEnter}
            className="group flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-medium
                       shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.35)]
                       transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #3B82F6, #7C3AED)" }}
          >
            Try JARVIS
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Copy */}
          <div
            className="flex-1 text-center lg:text-left"
            style={{ animation: mounted ? "fade-in-up 0.7s ease-out both" : "none" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
                          border border-slate-200 bg-slate-50/60"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(135deg, #10B981, #06B6D4)" }}
              />
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                AI-Powered • Bilingual • Always Available
              </span>
            </div>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 ${sectionFont}`}
            >
              <span className="text-slate-800">Your health</span>
              <br />
              <span className="text-slate-800">questions, </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 4s ease infinite",
                }}
              >
                answered
              </span>
            </h1>

            <p className="text-slate-500 max-w-lg mb-3 text-lg leading-relaxed mx-auto lg:mx-0">
              Meet <strong className="text-slate-700">JARVIS</strong> — a voice
              assistant trained on KLIMS Hospital's own departments, doctors, and
              scheduling. Ask a question. Book an appointment. All by voice.
            </p>
            <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed mx-auto lg:mx-0">
              Powered by real-time speech recognition and a hospital-tuned
              language model that understands symptoms in context — in Hindi or
              English, 24 hours a day.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={onEnter}
                className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-base
                           shadow-[0_10px_40px_rgba(59,130,246,0.35)] hover:shadow-[0_14px_50px_rgba(124,58,237,0.4)]
                           transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)" }}
              >
                Activate JARVIS
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-15" />
              </button>
              <span className="text-slate-400 text-sm">No signup required</span>
            </div>
          </div>

          {/* Right: Orb visual */}
          <div
            className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 shrink-0"
            style={{ animation: mounted ? "fade-in-up 0.9s ease-out 0.2s both" : "none" }}
          >
            {/* Outer glow rings */}
            <div
              className="absolute inset-0 rounded-full opacity-20 blur-2xl"
              style={{
                background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
                animation: "breathe 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-6 rounded-full opacity-15 blur-xl"
              style={{
                background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
                animation: "breathe 4s ease-in-out 1s infinite",
              }}
            />
            {/* Core orb */}
            <div
              className="absolute inset-12 rounded-full shadow-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)",
                boxShadow: "0 0 80px rgba(59,130,246,0.3), inset 0 0 40px rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-center">
                <FiMic className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-2" />
                <span className={`text-white/90 text-sm font-medium ${sectionFont}`}>
                  Tap & speak
                </span>
              </div>
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{ animation: `orbit ${18 + i * 6}s linear infinite`, animationDelay: `${i * 2}s` }}
              >
                <div
                  className="w-3 h-3 rounded-full shadow-lg"
                  style={{ background: ["#06B6D4", "#3B82F6", "#7C3AED"][i] }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-8 rounded-2xl
                        border border-slate-100 bg-white shadow-[0_4px_30px_rgba(15,23,42,0.04)]"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #EEF2FF, #F0F9FF)" }}
                  >
                    <s.icon className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div
                  className={`text-3xl font-bold ${sectionFont}`}
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-slate-400 text-xs mt-1 tracking-wide font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-8">
        <div className="text-center mb-14">
          <span
            className="inline-block text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Capabilities
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight ${sectionFont} mb-3`}>
            What JARVIS can do
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Six things it handles better than a waiting-room brochure — fast, accurate, and completely voice-driven.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              className="group relative p-7 rounded-2xl bg-white border border-slate-100
                         shadow-[0_2px_20px_rgba(15,23,42,0.04)]
                         hover:shadow-[0_12px_40px_rgba(15,23,42,0.09)] hover:-translate-y-1
                         transition-all duration-300"
              style={{ animation: mounted ? `fade-in-up 0.5s ease-out ${0.1 * idx}s both` : "none" }}
            >
              {/* Hover gradient line at top */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: f.gradient }}
              />
              <div
                className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center
                            shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300"
                style={{ background: f.gradient }}
              >
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-slate-800 font-semibold text-lg mb-2 ${sectionFont}`}>
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <div className="text-center mb-14">
          <span
            className="inline-block text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full border border-violet-100 bg-violet-50/50"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            How it works
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight ${sectionFont} mb-3`}>
            Three steps, one conversation
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            From question to answer (or booked appointment) — it all happens in a single voice session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 z-0" />

          {STEPS.map((s, idx) => (
            <div key={s.n} className="relative z-10 text-center">
              <div className="flex flex-col items-center">
                {/* Step circle */}
                <div
                  className="w-[68px] h-[68px] rounded-full flex items-center justify-center mb-5 shadow-lg
                              relative bg-white border-2 border-slate-100"
                >
                  <div
                    className="absolute inset-1 rounded-full flex items-center justify-center"
                    style={{
                      background: [
                        "linear-gradient(135deg, #06B6D4, #3B82F6)",
                        "linear-gradient(135deg, #3B82F6, #7C3AED)",
                        "linear-gradient(135deg, #7C3AED, #EC4899)",
                      ][idx],
                    }}
                  >
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold tracking-widest uppercase mb-2 ${sectionFont}`}
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Step {s.n}
                </span>
                <h3 className={`text-slate-800 font-semibold text-lg mb-2 ${sectionFont}`}>
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Under the hood ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div
          className="rounded-3xl overflow-hidden border border-slate-100
                      shadow-[0_4px_40px_rgba(15,23,42,0.06)]"
          style={{ background: "linear-gradient(135deg, #FAFBFF 0%, #F8FAFC 50%, #FAF5FF 100%)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left copy */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span
                className="inline-block text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 w-fit px-3 py-1 rounded-full border border-cyan-100 bg-cyan-50/50"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Under the hood
              </span>
              <h2 className={`text-3xl font-bold text-slate-800 tracking-tight ${sectionFont} mb-4`}>
                Not a chatbot with a microphone bolted on
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                JARVIS pairs real-time speech recognition with a language model
                grounded in KLIMS Hospital's own records — so answers about
                doctors, departments, and availability come from actual data,
                not a general knowledge guess. Every reply is spoken back in a
                natural voice, in whichever language you asked in.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                The system uses Retrieval-Augmented Generation (RAG) to query live
                hospital schedules and departmental information, ensuring responses
                are always current and verifiable.
              </p>
            </div>

            {/* Right stack cards */}
            <div className="p-10 md:p-14 flex items-center">
              <div className="space-y-4 w-full">
                {STACK.map((item, idx) => (
                  <div
                    key={item.label}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-slate-100/80
                               hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:-translate-y-0.5
                               transition-all duration-300"
                    style={{ animation: mounted ? `slide-in-left 0.5s ease-out ${0.15 * idx}s both` : "none" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm
                                  group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
                    >
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className={`text-slate-700 text-sm font-semibold ${sectionFont}`}>
                        {item.label}
                      </span>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <span
            className="inline-block text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full border border-pink-100 bg-pink-50/50"
            style={{
              background: "linear-gradient(135deg, #EC4899, #F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What people say
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight ${sectionFont} mb-3`}>
            Trusted by patients & staff
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Early feedback from the pilot programme at KLIMS Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="group relative p-7 rounded-2xl bg-white border border-slate-100
                         shadow-[0_2px_20px_rgba(15,23,42,0.04)]
                         hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]
                         transition-all duration-300"
            >
              {/* Quote mark */}
              <div
                className="text-4xl font-serif leading-none mb-4 opacity-30"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                "
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: [
                      "linear-gradient(135deg, #EC4899, #F97316)",
                      "linear-gradient(135deg, #06B6D4, #3B82F6)",
                      "linear-gradient(135deg, #7C3AED, #3B82F6)",
                    ][idx],
                  }}
                >
                  <t.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-slate-700 text-sm font-semibold ${sectionFont}`}>{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="relative rounded-3xl overflow-hidden py-16 px-8 text-center"
          style={{
            background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)",
          }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute top-[-60px] left-[-60px] w-[200px] h-[200px] rounded-full bg-white/5 blur-xl" />
          <div className="pointer-events-none absolute bottom-[-80px] right-[-40px] w-[250px] h-[250px] rounded-full bg-white/5 blur-xl" />

          <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight ${sectionFont} mb-4`}>
            Your question is one tap away
          </h2>
          <p className="text-white/70 max-w-md mx-auto text-sm mb-8 leading-relaxed">
            No account, no download, no waiting. Just tap the button and speak — JARVIS will do the rest.
          </p>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-full
                       bg-white text-slate-800 font-semibold text-base
                       shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_50px_rgba(0,0,0,0.3)]
                       hover:scale-[1.03] transition-all duration-300"
          >
            Activate JARVIS
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-6 pb-10">
        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6, #7C3AED)" }}
            >
              <FiMic className="w-3 h-3 text-white" />
            </div>
            <span className={`text-slate-400 text-xs ${sectionFont}`}>
              JARVIS · KLIMS Hospital
            </span>
          </div>
          <p className="text-slate-300 text-xs tracking-wide text-center">
            Speech recognized on-device · Processed securely · No data stored
          </p>
        </div>
      </footer>
    </div>
  );
}