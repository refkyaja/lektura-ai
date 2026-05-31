import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HelpCircle, Layers, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/lektura/BottomNav";
import { Particles } from "@/components/lektura/Particles";
import { useNotes } from "@/lib/notes-store";

export const Route = createFileRoute("/study")({
  head: () => ({ meta: [{ title: "Belajar — Lektura AI" }] }),
  component: StudyPage,
});

const tools = [
  { label: "Ringkasan", icon: Sparkles, desc: "AI rangkum poin penting", color: "from-[#6C63FF] to-[#4D8DFF]", to: "/summary" as const },
  { label: "Flashcard", icon: Layers, desc: "Kartu hafalan otomatis", color: "from-[#B8A8FF] to-[#6C63FF]", to: "/flashcards" as const },
  { label: "Quiz", icon: HelpCircle, desc: "Uji pemahaman kamu", color: "from-[#8FE3FF] to-[#4D8DFF]", to: "/quiz" as const },
];

function StudyPage() {
  const notes = useNotes();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-28">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={18} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <h1 className="font-display text-2xl font-semibold">Belajar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pilih cara belajar yang paling cocok buat kamu.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {tools.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={t.to}
                className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.07] transition"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center`}
                >
                  <t.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </div>
                <span className="text-muted-foreground">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="font-display font-semibold mb-3">Pilih catatan</h2>
          {notes.length === 0 ? (
            <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
              Belum ada catatan untuk diolah.
            </div>
          ) : (
            <div className="space-y-2">
              {notes.slice(0, 5).map((n) => (
                <Link
                  key={n.id}
                  to="/notes/$noteId"
                  params={{ noteId: n.id }}
                  className="block glass rounded-2xl p-3 hover:bg-white/[0.07] transition"
                >
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-[11px] text-muted-foreground">{n.category}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
