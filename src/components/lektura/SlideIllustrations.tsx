import { motion } from "framer-motion";
import { AIOrb } from "./AIOrb";

// Slide 1 — Hero / AI study companion
export function HeroIllustration() {
  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto">
      {/* Student avatar card */}
      <motion.div
        className="absolute left-1/2 top-8 -translate-x-1/2 glass-strong rounded-3xl px-6 py-5 w-[220px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#B8A8FF] to-[#6C63FF] flex items-center justify-center text-2xl">
            🎧
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Sedang fokus</div>
            <div className="text-sm font-semibold">Belajar Fisika</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#8FE3FF]"
            initial={{ width: "0%" }}
            animate={{ width: "72%" }}
            transition={{ delay: 0.8, duration: 1.2 }}
          />
        </div>
      </motion.div>

      {/* Floating note */}
      <motion.div
        className="absolute right-2 top-44 glass rounded-2xl px-3 py-2 text-xs"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          x: { delay: 0.6, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        📝 Catatan ✦
      </motion.div>

      {/* Floating mini card */}
      <motion.div
        className="absolute left-0 top-52 glass rounded-2xl px-3 py-2 text-xs"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          x: { delay: 0.7, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        💡 Insight
      </motion.div>

      {/* AI Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <AIOrb size={110} />
      </div>
    </div>
  );
}

// Slide 2 — Speech to text
export function SpeechIllustration() {
  const bars = Array.from({ length: 24 });
  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto flex flex-col items-center justify-center gap-8">
      {/* Mic */}
      <motion.div
        className="relative h-28 w-28 rounded-full flex items-center justify-center animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #B8A8FF, #6C63FF 60%, #4D8DFF)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-5xl">🎙️</div>
      </motion.div>

      {/* Waveform */}
      <div className="flex items-end gap-1 h-12">
        {bars.map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#4D8DFF] to-[#B8A8FF]"
            animate={{
              height: [
                `${20 + Math.random() * 20}%`,
                `${50 + Math.random() * 50}%`,
                `${20 + Math.random() * 20}%`,
              ],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              delay: i * 0.04,
              ease: "easeInOut",
            }}
            style={{ height: "30%" }}
          />
        ))}
      </div>

      {/* Transcript bubble */}
      <motion.div
        className="glass-strong rounded-2xl px-4 py-3 max-w-[280px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="text-[10px] uppercase tracking-widest text-[#8FE3FF] mb-1">
          Transkrip otomatis
        </div>
        <Typewriter
          text="Hari ini kita akan membahas hukum Newton tentang gerak…"
        />
      </motion.div>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  return (
    <motion.p className="text-sm leading-relaxed">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.025, duration: 0.05 }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Slide 3 — AI Summary / Brain
export function BrainIllustration() {
  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto flex items-center justify-center">
      <AIOrb size={140} />

      {/* Output cards radiating */}
      {[
        { label: "Summary", icon: "📄", x: -130, y: -40, delay: 0.4 },
        { label: "Flashcards", icon: "🃏", x: 130, y: -20, delay: 0.6 },
        { label: "Quiz", icon: "❓", x: 0, y: 120, delay: 0.8 },
      ].map((c) => (
        <motion.div
          key={c.label}
          className="absolute glass-strong rounded-2xl px-4 py-3 flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: c.x,
            y: c.y,
          }}
          transition={{ delay: c.delay, duration: 0.7, type: "spring" }}
        >
          <span className="text-2xl">{c.icon}</span>
          <span className="text-sm font-semibold">{c.label}</span>
        </motion.div>
      ))}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 320">
        {[
          { x: 50, y: 120 },
          { x: 310, y: 140 },
          { x: 180, y: 280 },
        ].map((p, i) => (
          <motion.line
            key={i}
            x1="180"
            y1="160"
            x2={p.x}
            y2={p.y}
            stroke="url(#g)"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
          />
        ))}
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#B8A8FF" />
            <stop offset="100%" stopColor="#8FE3FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Slide 4 — Organization / dashboard
export function DashboardIllustration() {
  const folders = [
    { name: "Matematika", icon: "📐", color: "from-[#6C63FF] to-[#4D8DFF]" },
    { name: "Sejarah", icon: "📜", color: "from-[#B8A8FF] to-[#6C63FF]" },
    { name: "Pemrograman", icon: "💻", color: "from-[#4D8DFF] to-[#8FE3FF]" },
    { name: "Biologi", icon: "🧬", color: "from-[#8FE3FF] to-[#B8A8FF]" },
  ];
  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto">
      <motion.div
        className="glass-strong rounded-3xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              My Workspace
            </div>
            <div className="text-base font-display font-semibold">Catatanmu</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#B8A8FF] to-[#6C63FF]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {folders.map((f, i) => (
            <motion.div
              key={f.name}
              className="glass rounded-2xl p-3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring" }}
            >
              <div
                className={`h-9 w-9 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-base mb-2`}
              >
                {f.icon}
              </div>
              <div className="text-xs font-semibold">{f.name}</div>
              <div className="text-[10px] text-muted-foreground">
                {3 + i * 2} catatan
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["#AI", "#kuis", "#minggu-ini"].map((t, i) => (
            <motion.span
              key={t}
              className="text-[10px] px-2 py-1 rounded-full glass text-[#8FE3FF]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, -3, 0] }}
              transition={{
                opacity: { delay: 0.8 + i * 0.15, duration: 0.4 },
                y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Slide 5 — Ready to start
export function ReadyIllustration() {
  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-aurora opacity-60 blur-2xl" />
      <AIOrb size={160} />
      {/* Sparkles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 140;
        return (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white"
            style={{
              left: `calc(50% + ${Math.cos(angle) * r}px)`,
              top: `calc(50% + ${Math.sin(angle) * r}px)`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
            transition={{
              duration: 2.5,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
