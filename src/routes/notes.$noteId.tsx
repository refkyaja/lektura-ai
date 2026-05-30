import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Particles } from "@/components/lektura/Particles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatRelative, notesStore } from "@/lib/notes-store";

export const Route = createFileRoute("/notes/$noteId")({
  head: () => ({ meta: [{ title: "Catatan — Lektura AI" }] }),
  component: NoteDetail,
});

function NoteDetail() {
  const { noteId } = Route.useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(() =>
    typeof window === "undefined" ? undefined : notesStore.get(noteId),
  );
  const [title, setTitle] = useState(note?.title ?? "");
  const [category, setCategory] = useState(note?.category ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const n = notesStore.get(noteId);
    setNote(n);
    setTitle(n?.title ?? "");
    setCategory(n?.category ?? "");
    setContent(n?.content ?? "");
  }, [noteId]);

  if (!note) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-muted-foreground">Catatan tidak ditemukan.</p>
        <button
          onClick={() => navigate({ to: "/notes" })}
          className="text-sm underline"
        >
          Kembali ke daftar
        </button>
      </main>
    );
  }

  const save = () => {
    notesStore.update(noteId, { title, content, category });
    setSavedAt(Date.now());
  };

  const remove = () => {
    if (confirm("Hapus catatan ini?")) {
      notesStore.remove(noteId);
      navigate({ to: "/notes" });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-10">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={14} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center justify-between gap-2">
          <button
            onClick={() => navigate({ to: "/notes" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {note.source === "manual" ? "Catatan Manual" : "Dari Rekaman"} · {formatRelative(note.updatedAt)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={remove}
              className="h-10 w-10 rounded-2xl glass flex items-center justify-center text-muted-foreground hover:text-[#FF6B8A] transition"
              aria-label="Hapus"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={save}
              className="h-10 px-4 rounded-2xl flex items-center gap-1.5 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)" }}
            >
              <Check className="h-4 w-4" /> Simpan
            </button>
          </div>
        </header>

        {savedAt && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-[11px] text-[#8FE3FF] text-center"
          >
            Tersimpan ✓
          </motion.div>
        )}

        <div className="mt-5 space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul"
            className="h-14 text-lg font-display font-semibold glass border-white/10"
          />
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Kategori"
            className="h-11 glass border-white/10"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[360px] glass border-white/10 text-[15px] leading-relaxed"
          />
        </div>
      </div>
    </main>
  );
}
