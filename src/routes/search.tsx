import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search as SearchIcon, FileText, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Particles } from "@/components/lektura/Particles";
import { formatRelative, useNotes } from "@/lib/notes-store";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Cari — Lektura AI" }] }),
  component: SearchPage,
});

const suggestions = ["Kalkulus", "Sejarah", "Rangkuman", "Quiz", "Flashcard"];

function SearchPage() {
  const navigate = useNavigate();
  const notes = useNotes();
  const [q, setQ] = useState("");

  const results = q.trim()
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q.toLowerCase()) ||
          n.content.toLowerCase().includes(q.toLowerCase()) ||
          n.category.toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-16">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={12} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center gap-2">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari catatan, kategori…"
              className="pl-10 h-10 glass border-white/10"
            />
          </div>
        </header>

        {!q && (
          <>
            <div className="mt-7">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Saran
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="glass rounded-full px-3 py-1.5 text-xs hover:bg-white/10 transition flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3 text-[#B8A8FF]" />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Terbaru
              </div>
              <div className="space-y-2">
                {notes.slice(0, 5).map((n) => (
                  <Link
                    key={n.id}
                    to="/notes/$noteId"
                    params={{ noteId: n.id }}
                    className="glass rounded-2xl p-3 flex items-center gap-3 hover:bg-white/[0.07] transition"
                  >
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${n.color}25`, border: `1px solid ${n.color}40` }}
                    >
                      <FileText className="h-4 w-4" style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {n.category} · {formatRelative(n.updatedAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {q && (
          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {results.length} hasil
            </div>
            {results.length === 0 ? (
              <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
                Tidak ada yang cocok dengan “{q}”.
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((n) => (
                  <Link
                    key={n.id}
                    to="/notes/$noteId"
                    params={{ noteId: n.id }}
                    className="glass rounded-2xl p-3 flex items-center gap-3 hover:bg-white/[0.07] transition"
                  >
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${n.color}25`, border: `1px solid ${n.color}40` }}
                    >
                      <FileText className="h-4 w-4" style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {n.content.slice(0, 70)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
