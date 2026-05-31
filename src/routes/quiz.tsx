import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { useState } from "react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Quiz — Lektura AI" }] }),
  component: QuizPage,
});

const questions = [
  {
    q: "Turunan dari x³ adalah…",
    options: ["x²", "3x²", "3x", "x³/3"],
    correct: 1,
  },
  {
    q: "Aturan rantai dipakai untuk…",
    options: ["Fungsi konstan", "Fungsi linear", "Fungsi komposisi", "Fungsi invers"],
    correct: 2,
  },
  {
    q: "Turunan kedua menunjukkan…",
    options: ["Luas", "Kecekungan", "Volume", "Kemiringan rata-rata"],
    correct: 1,
  },
];

function QuizPage() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === questions[i].correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 >= questions.length) setDone(true);
      else {
        setI((v) => v + 1);
        setPicked(null);
      }
    }, 900);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <main className="relative min-h-screen w-full overflow-x-hidden">
        <div className="absolute inset-0 bg-aurora opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
        <Particles count={26} />
        <div className="relative z-10 max-w-md mx-auto px-5 pt-24 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto h-28 w-28 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#6C63FF,#4D8DFF)",
              boxShadow: "0 30px 80px -20px rgba(108,99,255,0.7)",
            }}
          >
            <Trophy className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold mt-6">Mantap! 🎉</h1>
          <p className="text-muted-foreground mt-2">
            Kamu jawab {score} dari {questions.length} benar.
          </p>
          <div className="mt-6 inline-flex glass rounded-3xl px-8 py-5">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Skor</div>
              <div className="font-display text-4xl font-bold text-gradient">{pct}%</div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={() => {
                setI(0);
                setPicked(null);
                setScore(0);
                setDone(false);
              }}
              className="h-12 rounded-2xl text-white font-medium"
              style={{ background: "linear-gradient(135deg,#6C63FF,#4D8DFF)" }}
            >
              Ulang Quiz
            </button>
            <button
              onClick={() => navigate({ to: "/study" })}
              className="h-12 rounded-2xl glass text-sm"
            >
              Kembali
            </button>
          </div>
        </div>
      </main>
    );
  }

  const cur = questions[i];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-10">
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
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#B8A8FF]">Quiz</div>
            <h1 className="font-display text-lg font-semibold leading-tight">Kalkulus Bab 3</h1>
          </div>
          <div className="text-xs text-muted-foreground">{i + 1}/{questions.length}</div>
        </header>

        <div className="mt-4 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg,#6C63FF,#8FE3FF)" }}
            animate={{ width: `${((i + 1) / questions.length) * 100}%` }}
          />
        </div>

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass rounded-3xl p-6"
        >
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Pertanyaan {i + 1}
          </div>
          <h2 className="font-display text-xl font-semibold mt-2 leading-snug">{cur.q}</h2>
        </motion.div>

        <div className="mt-5 space-y-2.5">
          {cur.options.map((opt, idx) => {
            const isPicked = picked === idx;
            const isCorrect = idx === cur.correct;
            const reveal = picked !== null;
            let cls = "glass border-white/10";
            if (reveal && isCorrect) cls = "border-[#8FE3FF] bg-[#8FE3FF]/10";
            else if (reveal && isPicked && !isCorrect) cls = "border-[#FF6B8A] bg-[#FF6B8A]/10";

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => pick(idx)}
                disabled={picked !== null}
                className={`w-full text-left rounded-2xl px-4 py-4 border flex items-center gap-3 transition ${cls}`}
              >
                <span className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-medium">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-sm">{opt}</span>
                {reveal && isCorrect && <Check className="h-4 w-4 text-[#8FE3FF]" />}
                {reveal && isPicked && !isCorrect && <X className="h-4 w-4 text-[#FF6B8A]" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
