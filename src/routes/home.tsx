import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mic,
  Sparkles,
  Layers,
  HelpCircle,
  Search,
  Bell,
  Plus,
  FileText,
  Clock,
  Type,
} from "lucide-react";
import { BottomNav } from "@/components/lektura/BottomNav";
import { Particles } from "@/components/lektura/Particles";
import { formatRelative, useNotes } from "@/lib/notes-store";
import lekturaLogo from "@/assets/lektura-logo.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Beranda — Lektura AI" },
      {
        name: "description",
        content:
          "Beranda Lektura AI — rekam kelas, tulis catatan manual, dan kelola materi belajar kamu.",
      },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  { label: "Tulis", icon: Type, color: "from-[#6C63FF] to-[#4D8DFF]", to: "/notes/new" as const },
  { label: "Catatan", icon: FileText, color: "from-[#4D8DFF] to-[#8FE3FF]", to: "/notes" as const },
  { label: "Belajar", icon: Layers, color: "from-[#B8A8FF] to-[#6C63FF]", to: "/study" as const },
  { label: "Quiz", icon: HelpCircle, color: "from-[#8FE3FF] to-[#4D8DFF]", to: "/study" as const },
];

function HomePage() {
  const hour = new Date().getHours();
  const greet =
    hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 19 ? "Selamat sore" : "Selamat malam";
  const navigate = useNavigate();
  const notes = useNotes();
  const recent = notes.slice(0, 4);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-28">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={22} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <img
              src={lekturaLogo}
              alt="Lektura AI"
              className="h-10 w-10 object-contain drop-shadow-[0_4px_14px_rgba(108,99,255,0.55)]"
            />
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {greet}
              </div>
              <div className="font-display font-semibold text-base leading-tight">
                Halo, Pelajar ✨
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/notes"
              className="h-10 w-10 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Cari catatan"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/profile"
              className="relative h-10 w-10 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Profil"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF6B8A]" />
            </Link>
          </div>
        </motion.header>

        {/* Big record CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-7 relative rounded-[32px] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.35) 0%, rgba(77,141,255,0.25) 50%, rgba(143,227,255,0.18) 100%)",
            boxShadow: "0 20px 60px -20px rgba(108,99,255,0.5)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(184,168,255,0.3)_0%,_transparent_60%)]" />
          <div className="relative p-6">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#8FE3FF] mb-2">
              Mulai Sesi Baru
            </div>
            <div className="font-display text-2xl font-semibold leading-snug">
              Rekam kelas kamu sekarang
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-[240px]">
              Lektura akan mengubahnya jadi catatan rapi otomatis.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate({ to: "/record" })}
                className="h-14 px-6 rounded-3xl font-display font-semibold text-primary-foreground flex items-center gap-3 animate-breathe"
                style={{ background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)" }}
              >
                <Mic className="h-5 w-5" />
                Rekam Sekarang
              </motion.button>
              <button
                onClick={() => navigate({ to: "/notes/new" })}
                aria-label="Tulis catatan manual"
                className="h-14 w-14 rounded-3xl glass flex items-center justify-center hover:bg-white/10 transition"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-3 right-4 flex items-end gap-[3px] h-10 opacity-70">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-[#8FE3FF] to-[#B8A8FF]"
                animate={{ height: [6, 18 + (i % 5) * 4, 6] }}
                transition={{
                  duration: 1.1 + (i % 3) * 0.2,
                  repeat: Infinity,
                  delay: i * 0.06,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base">Aksi Cepat</h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate({ to: a.to })}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(108,99,255,0.6)] group-hover:scale-105 transition`}
                >
                  <a.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-[11px] font-medium text-center leading-tight">
                  {a.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent notes */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base">Catatan Terbaru</h2>
            <Link to="/notes" className="text-xs text-muted-foreground hover:text-foreground transition">
              Lihat semua
            </Link>
          </div>
          <div className="space-y-3">
            {recent.length === 0 && (
              <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
                Belum ada catatan. Mulai dengan rekaman atau tulis manual.
              </div>
            )}
            {recent.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              >
                <Link
                  to="/notes/$noteId"
                  params={{ noteId: n.id }}
                  className="glass rounded-2xl p-4 flex items-start gap-3 hover:bg-white/[0.07] transition cursor-pointer"
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
                    <div className="text-[11px] text-muted-foreground mt-0.5">{n.category}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatRelative(n.updatedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition">
            ← Kembali ke onboarding
          </Link>
        </div>
      </div>

      <BottomNav />

      {/* Hide unused icons referenced for parity */}
      <span className="hidden">
        <Sparkles />
      </span>
    </main>
  );
}
