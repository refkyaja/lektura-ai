import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, LogOut, Settings, Shield, User } from "lucide-react";
import { BottomNav } from "@/components/lektura/BottomNav";
import { Particles } from "@/components/lektura/Particles";
import { useNotes } from "@/lib/notes-store";
import lekturaLogo from "@/assets/lektura-logo.png";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — Lektura AI" }] }),
  component: ProfilePage,
});

const items = [
  { icon: Settings, label: "Pengaturan", to: "/settings" as const },
  { icon: Bell, label: "Notifikasi", to: "/notifications" as const },
  { icon: Shield, label: "Privasi & Keamanan", to: "/privacy" as const },
];

function ProfilePage() {
  const notes = useNotes();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-28">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={16} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 -m-4 rounded-full bg-[radial-gradient(circle,_rgba(108,99,255,0.5)_0%,_transparent_70%)] blur-2xl" />
            <img src={lekturaLogo} alt="" className="relative h-20 w-20 object-contain" />
          </div>
          <h1 className="font-display text-xl font-semibold mt-3">Pelajar Lektura</h1>
          <p className="text-xs text-muted-foreground">Belajar lebih pintar setiap hari</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { v: notes.length, l: "Catatan" },
            { v: notes.filter((n) => n.source === "recording").length, l: "Rekaman" },
            { v: notes.filter((n) => n.source === "manual").length, l: "Manual" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-3 text-center">
              <div className="font-display text-xl font-bold text-gradient">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 glass rounded-2xl overflow-hidden divide-y divide-white/5">
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.to}
              className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.05] transition text-left"
            >
              <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center">
                <it.icon className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm">{it.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          <Link
            to="/login"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.05] transition"
          >
            <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center">
              <LogOut className="h-4 w-4 text-[#FF6B8A]" />
            </div>
            <span className="flex-1 text-sm text-[#FF6B8A]">Keluar</span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <User className="h-3 w-3" /> Lektura AI · v0.1
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
