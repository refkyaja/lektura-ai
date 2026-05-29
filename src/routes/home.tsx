import { createFileRoute, Link } from "@tanstack/react-router";
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
  TrendingUp,
} from "lucide-react";
import { Particles } from "@/components/lektura/Particles";
import lekturaLogo from "@/assets/lektura-logo.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Beranda — Lektura AI" },
      {
        name: "description",
        content:
          "Beranda Lektura AI — rekam kelas, lihat catatan terbaru, ringkasan, flashcard, dan kuis kamu.",
      },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  {
    label: "Ringkasan",
    icon: Sparkles,
    color: "from-[#6C63FF] to-[#4D8DFF]",
    desc: "AI rangkum materi",
  },
  {
    label: "Flashcard",
    icon: Layers,
    color: "from-[#B8A8FF] to-[#6C63FF]",
    desc: "Kartu hafalan",
  },
  {
    label: "Quiz",
    icon: HelpCircle,
    color: "from-[#8FE3FF] to-[#4D8DFF]",
    desc: "Uji pemahaman",
  },
  {
    label: "Catatan",
    icon: FileText,
    color: "from-[#4D8DFF] to-[#8FE3FF]",
    desc: "Semua transkrip",
  },
];

const recentNotes = [
  {
    title: "Kalkulus Diferensial — Bab 3",
    meta: "Matematika · 42 menit",
    tag: "Ringkasan siap",
    color: "#B8A8FF",
    time: "2 jam lalu",
  },
  {
    title: "Sejarah Kemerdekaan Indonesia",
    meta: "Sejarah · 28 menit",
    tag: "12 Flashcard",
    color: "#8FE3FF",
    time: "Kemarin",
  },
  {
    title: "Fotosintesis & Respirasi",
    meta: "Biologi · 35 menit",
    tag: "Quiz tersedia",
    color: "#6C63FF",
    time: "2 hari lalu",
  },
];

function HomePage() {
  const hour = new Date().getHours();
  const greet =
    hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 19 ? "Selamat sore" : "Selamat malam";

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-28">
      {/* Background */}
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={22} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        {/* Header */}
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
            <button className="h-10 w-10 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition">
              <Search className="h-4 w-4" />
            </button>
            <button className="relative h-10 w-10 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF6B8A]" />
            </button>
          </div>
        </motion.header>

        {/* Streak / stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 glass rounded-3xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4D8DFF] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display font-semibold">7 hari beruntun 🔥</div>
              <div className="text-xs text-muted-foreground">Pertahankan ritmenya!</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-lg font-bold text-gradient">82%</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Target</div>
          </div>
        </motion.div>

        {/* Big record CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 relative rounded-[32px] overflow-hidden"
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
                className="h-14 px-6 rounded-3xl font-display font-semibold text-primary-foreground flex items-center gap-3 animate-breathe"
                style={{
                  background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
                }}
              >
                <Mic className="h-5 w-5" />
                Rekam Sekarang
              </motion.button>
              <button className="h-14 w-14 rounded-3xl glass flex items-center justify-center hover:bg-white/10 transition">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Waveform decoration */}
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
            <button className="text-xs text-muted-foreground hover:text-foreground transition">
              Lihat semua
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                whileTap={{ scale: 0.94 }}
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
            <button className="text-xs text-muted-foreground hover:text-foreground transition">
              Lihat semua
            </button>
          </div>
          <div className="space-y-3">
            {recentNotes.map((n, i) => (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
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
                  <div className="font-medium text-sm leading-snug truncate">
                    {n.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {n.meta}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: `${n.color}20`,
                        color: n.color,
                      }}
                    >
                      {n.tag}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {n.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition"
          >
            ← Kembali ke onboarding
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-md w-[calc(100%-2rem)]"
      >
        <div className="glass rounded-3xl px-3 py-2.5 flex items-center justify-around backdrop-blur-2xl border border-white/10">
          {[
            { icon: Sparkles, label: "Beranda", active: true },
            { icon: FileText, label: "Catatan" },
            { icon: Mic, label: "Rekam", primary: true },
            { icon: Layers, label: "Belajar" },
            { icon: Bell, label: "Profil" },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-2xl transition ${
                item.primary
                  ? "-mt-7 h-14 w-14 justify-center"
                  : item.active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                item.primary
                  ? {
                      background:
                        "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
                      boxShadow: "0 12px 30px -8px rgba(108,99,255,0.7)",
                    }
                  : undefined
              }
            >
              <item.icon
                className={`${item.primary ? "h-6 w-6 text-white" : "h-5 w-5"}`}
              />
              {!item.primary && (
                <span className="text-[10px] font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </motion.nav>
    </main>
  );
}
