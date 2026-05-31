import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Copy, Share2, RefreshCw } from "lucide-react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/summary")({
  head: () => ({ meta: [{ title: "Ringkasan — Lektura AI" }] }),
  component: SummaryPage,
});

const bullets = [
  "Turunan adalah ukuran laju perubahan suatu fungsi terhadap variabelnya.",
  "Aturan pangkat: turunan dari xⁿ adalah n·xⁿ⁻¹.",
  "Aturan rantai dipakai untuk fungsi komposisi f(g(x)).",
  "Turunan kedua menggambarkan kecekungan grafik.",
  "Aplikasi: kecepatan, optimasi, dan analisis fungsi.",
];

function SummaryPage() {
  const navigate = useNavigate();
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-16">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={14} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/study" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#B8A8FF]">Ringkasan AI</div>
            <h1 className="font-display text-lg font-semibold leading-tight">
              Kalkulus Diferensial — Bab 3
            </h1>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.18), rgba(143,227,255,0.10))",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#B8A8FF]" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Poin Penting
            </span>
          </div>
          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex gap-3 text-sm leading-relaxed"
              >
                <span
                  className="mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "linear-gradient(135deg,#6C63FF,#4D8DFF)" }}
                >
                  {i + 1}
                </span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <button className="glass rounded-2xl py-3 flex flex-col items-center gap-1 text-xs hover:bg-white/10 transition">
            <Copy className="h-4 w-4" /> Salin
          </button>
          <button className="glass rounded-2xl py-3 flex flex-col items-center gap-1 text-xs hover:bg-white/10 transition">
            <Share2 className="h-4 w-4" /> Bagikan
          </button>
          <button className="glass rounded-2xl py-3 flex flex-col items-center gap-1 text-xs hover:bg-white/10 transition">
            <RefreshCw className="h-4 w-4" /> Buat Ulang
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            to="/flashcards"
            className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition"
          >
            <div className="text-xs text-muted-foreground">Lanjut belajar</div>
            <div className="font-display font-semibold mt-1">Flashcard →</div>
          </Link>
          <Link
            to="/quiz"
            className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition"
          >
            <div className="text-xs text-muted-foreground">Uji diri</div>
            <div className="font-display font-semibold mt-1">Quiz →</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
