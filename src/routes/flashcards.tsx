import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useState } from "react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/flashcards")({
  head: () => ({ meta: [{ title: "Flashcard — Lektura AI" }] }),
  component: FlashcardsPage,
});

const cards = [
  { q: "Apa itu turunan?", a: "Ukuran laju perubahan suatu fungsi terhadap variabelnya." },
  { q: "Aturan pangkat?", a: "Turunan dari xⁿ adalah n·xⁿ⁻¹." },
  { q: "Kapan pakai aturan rantai?", a: "Untuk fungsi komposisi f(g(x))." },
  { q: "Apa arti turunan kedua?", a: "Menggambarkan kecekungan grafik fungsi." },
];

function FlashcardsPage() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setI((v) => (v + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setI((v) => (v - 1 + cards.length) % cards.length);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-10">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={16} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10 flex flex-col min-h-screen">
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/study" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#B8A8FF]">Flashcard</div>
            <h1 className="font-display text-lg font-semibold leading-tight">Kalkulus Bab 3</h1>
          </div>
          <div className="text-xs text-muted-foreground">
            {i + 1}/{cards.length}
          </div>
        </header>

        {/* Progress */}
        <div className="mt-4 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg,#6C63FF,#8FE3FF)" }}
            animate={{ width: `${((i + 1) / cards.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Card */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div
            onClick={() => setFlipped((f) => !f)}
            className="relative w-full aspect-[3/4] cursor-pointer"
            style={{ perspective: 1200 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${i}-${flipped}`}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 rounded-[32px] p-8 flex flex-col justify-between glass"
                style={{
                  background: flipped
                    ? "linear-gradient(135deg, rgba(143,227,255,0.25), rgba(108,99,255,0.15))"
                    : "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(77,141,255,0.12))",
                  boxShadow: "0 30px 80px -30px rgba(108,99,255,0.6)",
                }}
              >
                <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {flipped ? "Jawaban" : "Pertanyaan"}
                </div>
                <div className="font-display text-2xl font-semibold leading-snug text-center">
                  {flipped ? cards[i].a : cards[i].q}
                </div>
                <div className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                  <RotateCw className="h-3 w-3" /> Ketuk untuk balik
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pb-6">
          <button
            onClick={prev}
            className="h-14 w-14 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 flex gap-2">
            <button className="flex-1 h-12 rounded-2xl border border-[#FF6B8A]/40 text-[#FF6B8A] text-sm font-medium hover:bg-[#FF6B8A]/10 transition">
              Belum hafal
            </button>
            <button
              onClick={next}
              className="flex-1 h-12 rounded-2xl text-white text-sm font-medium"
              style={{ background: "linear-gradient(135deg,#6C63FF,#4D8DFF)" }}
            >
              Sudah hafal
            </button>
          </div>
          <button
            onClick={next}
            className="h-14 w-14 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
