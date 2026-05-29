import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "@/components/lektura/Particles";
import {
  HeroIllustration,
  SpeechIllustration,
  BrainIllustration,
  DashboardIllustration,
  ReadyIllustration,
} from "@/components/lektura/SlideIllustrations";
import lekturaLogo from "@/assets/lektura-logo.png";

type Slide = {
  illustration: React.ReactNode;
  kicker: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    illustration: <HeroIllustration />,
    kicker: "Halo, selamat datang ✨",
    title: "Belajar Jadi Lebih Ringan Bareng Lektura",
    subtitle:
      "Asisten belajar AI kamu — rekam kelas, ubah jadi catatan, ringkasan, flashcard, dan quiz dalam sekali ketuk.",
  },
  {
    illustration: <SpeechIllustration />,
    kicker: "Speech to Text",
    title: "Rekam Sekali, Catatan Langsung Jadi",
    subtitle:
      "AI akan mengubah penjelasan guru atau dosen menjadi transkrip rapi secara otomatis.",
  },
  {
    illustration: <BrainIllustration />,
    kicker: "AI Summary",
    title: "AI Membantu Kamu Memahami Materi",
    subtitle:
      "Ringkasan otomatis, kartu hafalan, dan kuis dibuat hanya dalam beberapa detik.",
  },
  {
    illustration: <DashboardIllustration />,
    kicker: "Smart Organization",
    title: "Semua Catatan Terorganisir Otomatis",
    subtitle:
      "AI memberikan judul, kategori, dan struktur catatan kamu secara instan.",
  },
  {
    illustration: <ReadyIllustration />,
    kicker: "Ready to Start",
    title: "Siap Upgrade Cara Belajarmu?",
    subtitle: "Mulai perjalanan belajar modern bersama Lektura AI.",
  },
];

type Stage = "splash" | "onboarding";

export function LekturaOnboarding() {
  const [stage, setStage] = useState<Stage>("splash");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStage("onboarding"), 2400);
    return () => clearTimeout(t);
  }, []);

  const next = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const skip = () => setIndex(slides.length - 1);

  const isLast = index === slides.length - 1;
  const slide = slides[index];

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,23,42,0)_0%,_rgba(15,23,42,0.9)_70%)]" />
      <Particles count={30} />

      <AnimatePresence mode="wait">
        {stage === "splash" ? (
          <Splash key="splash" />
        ) : (
          <motion.section
            key="onboard"
            className="relative z-10 min-h-screen flex flex-col px-6 pt-10 pb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top bar */}
            <header className="flex items-center justify-between">
              <Logo small />
              {!isLast && (
                <button
                  onClick={skip}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lewati
                </button>
              )}
            </header>

            {/* Illustration */}
            <div className="flex-1 flex items-center justify-center py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full"
                >
                  {slide.illustration}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Copy */}
            <div className="text-center min-h-[170px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#8FE3FF] mb-3">
                    {slide.kicker}
                  </div>
                  <h1 className="font-display text-3xl font-semibold leading-tight text-gradient">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6 mb-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 28 : 8,
                    background:
                      i === index
                        ? "linear-gradient(90deg,#B8A8FF,#6C63FF,#8FE3FF)"
                        : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Actions */}
            <AnimatePresence mode="wait">
              {isLast ? (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3"
                >
                  <a
                    href="/signup"
                    className="w-full h-14 rounded-3xl font-display font-semibold text-base animate-breathe text-primary-foreground flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
                    }}
                  >
                    Mulai Sekarang ✨
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="/login" className="h-12 rounded-2xl glass text-sm font-medium hover:bg-white/10 transition flex items-center justify-center">
                      Masuk
                    </a>
                    <a href="/signup" className="h-12 rounded-2xl glass text-sm font-medium hover:bg-white/10 transition flex items-center justify-center">
                      Daftar
                    </a>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="nav"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={next}
                    className="w-full h-14 rounded-3xl font-display font-semibold text-base text-primary-foreground shadow-glow-primary transition-transform active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
                    }}
                  >
                    Lanjut
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  const size = small ? "h-8 w-8" : "h-10 w-10";
  return (
    <div className="flex items-center gap-2">
      <img
        src={lekturaLogo}
        alt="Lektura AI"
        className={`${size} object-contain drop-shadow-[0_4px_14px_rgba(108,99,255,0.55)]`}
      />
      <div className="font-display font-semibold tracking-tight">
        Lektura<span className="text-[#8FE3FF]"> AI</span>
      </div>
    </div>
  );
}

function Splash() {
  return (
    <motion.div
      key="splash"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: 220, height: 220 }}
      >
        {/* Pulsing halo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #B8A8FF 0%, #6C63FF 45%, transparent 75%)",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0.5, 0.85, 0.6], scale: [0.95, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo */}
        <motion.img
          src={lekturaLogo}
          alt="Lektura AI"
          width={512}
          height={512}
          className="relative h-44 w-44 object-contain drop-shadow-[0_12px_40px_rgba(108,99,255,0.7)]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <div className="font-display text-3xl font-semibold text-gradient">
          Lektura AI
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Smart Study Companion
        </div>
      </motion.div>
    </motion.div>
  );
}

