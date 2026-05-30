import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/lektura/BottomNav";
import { Particles } from "@/components/lektura/Particles";
import { Input } from "@/components/ui/input";
import { formatRelative, notesStore, useNotes } from "@/lib/notes-store";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Catatan — Lektura AI" },
      { name: "description", content: "Semua catatan dan transkrip kamu di Lektura AI." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const notes = useNotes();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(s) ||
        n.content.toLowerCase().includes(s) ||
        n.category.toLowerCase().includes(s),
    );
  }, [notes, q]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-28">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={18} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center justify-between">
          <Link to="/home" className="h-10 w-10 rounded-2xl glass flex items-center justify-center">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="font-display font-semibold text-lg">Catatan</h1>
          <button
            onClick={() => navigate({ to: "/notes/new" })}
            aria-label="Catatan baru"
            className="h-10 w-10 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)" }}
          >
            <Plus className="h-4 w-4 text-white" />
          </button>
        </header>

        <div className="mt-5 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari catatan…"
            className="pl-9 h-11 glass border-white/10"
          />
        </div>

        <div className="mt-5 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {q ? "Tidak ada catatan yang cocok." : "Belum ada catatan. Ketuk + untuk membuat."}
            </div>
          )}
          {filtered.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="glass rounded-2xl p-4 flex items-start gap-3 hover:bg-white/[0.07] transition"
            >
              <Link
                to="/notes/$noteId"
                params={{ noteId: n.id }}
                className="flex items-start gap-3 flex-1 min-w-0"
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${n.color}40, ${n.color}15)`,
                    border: `1px solid ${n.color}40`,
                  }}
                >
                  <FileText className="h-5 w-5" style={{ color: n.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm leading-snug truncate">{n.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {n.category} · {formatRelative(n.updatedAt)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                    {n.content || "Belum ada isi"}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => {
                  if (confirm("Hapus catatan ini?")) notesStore.remove(n.id);
                }}
                className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-[#FF6B8A] transition"
                aria-label="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
