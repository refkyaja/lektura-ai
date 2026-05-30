import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mic, Pause, Square, Type } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Particles } from "@/components/lektura/Particles";
import { notesStore } from "@/lib/notes-store";

export const Route = createFileRoute("/record")({
  head: () => ({ meta: [{ title: "Rekam — Lektura AI" }] }),
  component: RecordPage,
});

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}

function RecordPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"idle" | "recording" | "paused">("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (state === "recording") {
      timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [state]);

  const stop = () => {
    setState("idle");
    const note = notesStore.create({
      title: `Rekaman ${new Date().toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`,
      content: transcript || "(Transkrip akan muncul setelah pemrosesan)",
      category: "Rekaman",
      source: "recording",
    });
    navigate({ to: "/notes/$noteId", params: { noteId: note.id } });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(108,99,255,0.25)_0%,_rgba(15,23,42,0.98)_70%)]" />
      <Particles count={26} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Sesi Rekaman
          </div>
          <button
            onClick={() => navigate({ to: "/notes/new" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Ketik manual"
          >
            <Type className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {state === "recording" ? "Sedang merekam" : state === "paused" ? "Dijeda" : "Siap merekam"}
            </div>
            <div className="font-display text-5xl font-bold text-gradient mt-2 tabular-nums">
              {fmt(seconds)}
            </div>
          </div>

          <motion.button
            onClick={() => setState(state === "recording" ? "paused" : "recording")}
            whileTap={{ scale: 0.94 }}
            className="relative h-40 w-40 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
              boxShadow: "0 30px 80px -20px rgba(108,99,255,0.8)",
            }}
          >
            {state === "recording" && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
            {state === "recording" ? (
              <Pause className="h-14 w-14 text-white" />
            ) : (
              <Mic className="h-14 w-14 text-white" />
            )}
          </motion.button>

          <div className="flex items-end gap-1 h-10">
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-[#8FE3FF] to-[#B8A8FF]"
                animate={
                  state === "recording"
                    ? { height: [6, 12 + (i % 6) * 4, 6] }
                    : { height: 4 }
                }
                transition={{
                  duration: 1 + (i % 3) * 0.2,
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {state !== "idle" && (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-6 h-12 rounded-2xl glass border border-white/10 text-sm font-medium hover:bg-white/10 transition"
            >
              <Square className="h-4 w-4 text-[#FF6B8A]" /> Selesai & Simpan
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
