import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Sparkles, FileText, Trophy, Clock } from "lucide-react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifikasi — Lektura AI" }] }),
  component: NotificationsPage,
});

const groups = [
  {
    label: "Hari ini",
    items: [
      { icon: Sparkles, color: "#B8A8FF", title: "Ringkasan siap", desc: "Catatan ‘Kalkulus Bab 3’ sudah dirangkum AI.", time: "5 menit lalu", unread: true },
      { icon: FileText, color: "#8FE3FF", title: "Catatan tersimpan", desc: "Rekaman sejarah kamu disimpan otomatis.", time: "1 jam lalu", unread: true },
    ],
  },
  {
    label: "Kemarin",
    items: [
      { icon: Trophy, color: "#FFB199", title: "Kerja bagus! 🎉", desc: "Kamu menyelesaikan 3 quiz hari ini.", time: "Kemarin", unread: false },
      { icon: Clock, color: "#6C63FF", title: "Pengingat belajar", desc: "Waktunya review flashcard kamu.", time: "Kemarin", unread: false },
    ],
  },
];

function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-16">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={12} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/home" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="font-display text-xl font-semibold flex-1">Notifikasi</h1>
          <button className="text-xs text-muted-foreground hover:text-foreground transition">
            Tandai dibaca
          </button>
        </header>

        <div className="mt-6 space-y-6">
          {groups.map((g) => (
            <section key={g.label}>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {g.label}
              </div>
              <div className="space-y-2">
                {g.items.map((n, i) => (
                  <motion.div
                    key={n.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="glass rounded-2xl p-4 flex items-start gap-3 relative"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${n.color}40, ${n.color}15)`,
                        border: `1px solid ${n.color}40`,
                      }}
                    >
                      <n.icon className="h-5 w-5" style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{n.title}</span>
                        {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B8A]" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      <div className="text-[10px] text-muted-foreground mt-1.5">{n.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center text-center text-muted-foreground">
          <Bell className="h-4 w-4 mb-1 opacity-60" />
          <span className="text-[11px]">Itu semua notifikasinya ✨</span>
        </div>
      </div>
    </main>
  );
}
