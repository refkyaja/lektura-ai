import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Type } from "lucide-react";
import { useState } from "react";
import { Particles } from "@/components/lektura/Particles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notesStore } from "@/lib/notes-store";

export const Route = createFileRoute("/notes/new")({
  head: () => ({
    meta: [{ title: "Catatan Baru — Lektura AI" }],
  }),
  component: NewNote,
});

function NewNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const canSave = title.trim().length > 0 || content.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    const note = notesStore.create({ title, content, category, source: "manual" });
    navigate({ to: "/notes/$noteId", params: { noteId: note.id } });
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-10">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={14} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/notes" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Type className="h-3.5 w-3.5" /> Catatan Manual
          </div>
          <button
            onClick={save}
            disabled={!canSave}
            className="h-10 px-4 rounded-2xl flex items-center gap-1.5 text-sm font-medium text-white disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)" }}
          >
            <Check className="h-4 w-4" /> Simpan
          </button>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul catatan…"
            className="h-14 text-lg font-display font-semibold glass border-white/10"
          />
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Kategori (mis. Matematika)"
            className="h-11 glass border-white/10"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis catatan kamu di sini…"
            className="min-h-[340px] glass border-white/10 text-[15px] leading-relaxed"
          />
        </motion.div>
      </div>
    </main>
  );
}
