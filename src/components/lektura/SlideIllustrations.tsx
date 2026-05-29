import { motion } from "framer-motion";
import lekturaLogo from "@/assets/lektura-logo.png";

function LogoMark({ size = 140 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, #B8A8FF 0%, #6C63FF 45%, transparent 72%)",
        }}
      />
      <img
        src={lekturaLogo}
        alt="Lektura AI"
        className="relative h-full w-full object-contain drop-shadow-[0_8px_30px_rgba(108,99,255,0.6)]"
      />
    </motion.div>
  );
}


// Slide 1 — Welcome / hero
export function HeroIllustration() {
  const bars = Array.from({ length: 18 });

  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto">
      {/* Greeting bubble */}
      <motion.div
        className="absolute left-2 top-0 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-1.5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span>👋</span>
        <span>Hai, siap belajar?</span>
      </motion.div>

      {/* Floating quiz chip */}
      <motion.div
        className="absolute right-1 top-2 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-1.5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.35, duration: 0.5 },
          x: { delay: 0.35, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>❓</span>
        <span>Quiz siap</span>
      </motion.div>

      {/* Main recording card */}
      <motion.div
        className="absolute left-1/2 top-16 -translate-x-1/2 glass-strong rounded-3xl px-5 py-4 w-[280px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B6B] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B6B]" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8FE3FF]">
              Merekam kelas
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">00:42</span>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-[3px] h-8 mb-3">
          {bars.map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-[#4D8DFF] to-[#B8A8FF]"
              animate={{
                height: [
                  `${20 + Math.random() * 20}%`,
                  `${55 + Math.random() * 45}%`,
                  `${20 + Math.random() * 20}%`,
                ],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              style={{ height: "30%" }}
            />
          ))}
        </div>

        {/* Mini transcript */}
        <div className="rounded-2xl bg-white/5 px-3 py-2 space-y-1.5">
          <div className="text-[9px] uppercase tracking-widest text-[#8FE3FF]">
            Transkrip
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/15" />
          <div className="h-1.5 w-[78%] rounded-full bg-white/10" />
        </div>
      </motion.div>

      {/* Summary chip */}
      <motion.div
        className="absolute left-0 bottom-6 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-1.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          x: { delay: 0.7, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>📄</span>
        <span>Ringkasan</span>
      </motion.div>

      {/* Flashcard chip */}
      <motion.div
        className="absolute right-0 bottom-2 glass rounded-2xl px-3 py-2 text-xs flex items-center gap-1.5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.85, duration: 0.5 },
          x: { delay: 0.85, duration: 0.5 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>🃏</span>
        <span>Flashcard</span>
      </motion.div>
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

// Slide 4 — Smart Organization / note transformations
export function DashboardIllustration() {
  const outputs = [
    {
      label: "Ringkasan",
      icon: "📄",
      tint: "from-[#6C63FF] to-[#4D8DFF]",
      delay: 0.5,
    },
    {
      label: "Flashcards",
      icon: "🃏",
      tint: "from-[#B8A8FF] to-[#6C63FF]",
      delay: 0.7,
    },
    {
      label: "Quiz",
      icon: "❓",
      tint: "from-[#4D8DFF] to-[#8FE3FF]",
      delay: 0.9,
    },
  ];

  return (
    <div className="relative h-[320px] w-full max-w-[360px] mx-auto">
      {/* Source: raw transcript card */}
      <motion.div
        className="absolute left-1/2 top-2 -translate-x-1/2 glass-strong rounded-2xl px-4 py-3 w-[260px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🎙️</span>
          <div className="text-[10px] uppercase tracking-widest text-[#8FE3FF]">
            Transkrip mentah
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/15" />
          <div className="h-1.5 w-[80%] rounded-full bg-white/10" />
          <div className="h-1.5 w-[60%] rounded-full bg-white/10" />
        </div>
      </motion.div>

      {/* Connecting flow lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 360 320"
      >
        {[
          { x: 70, y: 220 },
          { x: 180, y: 230 },
          { x: 290, y: 220 },
        ].map((p, i) => (
          <motion.line
            key={i}
            x1="180"
            y1="90"
            x2={p.x}
            y2={p.y}
            stroke="url(#flowG)"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ delay: 0.35 + i * 0.15, duration: 0.8 }}
          />
        ))}
        <defs>
          <linearGradient id="flowG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B8A8FF" />
            <stop offset="100%" stopColor="#8FE3FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* AI label in the middle of the flow */}
      <motion.div
        className="absolute left-1/2 top-[120px] -translate-x-1/2 glass rounded-full px-3 py-1 flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <span className="text-xs">✦</span>
        <span className="text-[10px] uppercase tracking-widest text-[#8FE3FF]">
          AI memproses
        </span>
      </motion.div>

      {/* Three transformation outputs */}
      <div className="absolute left-0 right-0 bottom-4 flex items-end justify-between px-1">
        {outputs.map((o) => (
          <motion.div
            key={o.label}
            className="glass-strong rounded-2xl px-3 py-3 flex flex-col items-center gap-1.5 w-[100px]"
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
            transition={{
              opacity: { delay: o.delay, duration: 0.5 },
              scale: { delay: o.delay, duration: 0.5, type: "spring" },
              y: {
                delay: o.delay + 0.5,
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div
              className={`h-10 w-10 rounded-xl bg-gradient-to-br ${o.tint} flex items-center justify-center text-lg`}
            >
              {o.icon}
            </div>
            <span className="text-[11px] font-semibold">{o.label}</span>
          </motion.div>
        ))}
      </div>
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
