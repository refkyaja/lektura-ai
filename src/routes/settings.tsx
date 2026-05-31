import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Moon, Globe, Volume2, Sparkles, Database, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — Lektura AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [autoSum, setAutoSum] = useState(true);
  const [sound, setSound] = useState(false);

  const toggles = [
    { icon: Moon, label: "Mode Gelap", desc: "Tampilan gelap nyaman di mata", value: dark, set: setDark },
    { icon: Sparkles, label: "Ringkasan Otomatis", desc: "AI rangkum setelah rekaman", value: autoSum, set: setAutoSum },
    { icon: Volume2, label: "Efek Suara", desc: "Bunyi tombol & notifikasi", value: sound, set: setSound },
  ];

  const links = [
    { icon: Globe, label: "Bahasa", value: "Indonesia" },
    { icon: Database, label: "Penyimpanan", value: "12 MB" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden pb-16">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(108,99,255,0.18)_0%,_rgba(15,23,42,0.95)_70%)]" />
      <Particles count={12} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10">
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/profile" })}
            className="h-10 w-10 rounded-2xl glass flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="font-display text-xl font-semibold">Pengaturan</h1>
        </header>

        <div className="mt-6 glass rounded-2xl overflow-hidden divide-y divide-white/5">
          {toggles.map((t) => (
            <div key={t.label} className="flex items-center gap-3 p-4">
              <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center">
                <t.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-[11px] text-muted-foreground">{t.desc}</div>
              </div>
              <button
                onClick={() => t.set(!t.value)}
                className={`relative h-6 w-11 rounded-full transition ${
                  t.value ? "bg-gradient-to-r from-[#6C63FF] to-[#4D8DFF]" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    t.value ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 glass rounded-2xl overflow-hidden divide-y divide-white/5">
          {links.map((l) => (
            <button key={l.label} className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.05] transition text-left">
              <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center">
                <l.icon className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm">{l.label}</span>
              <span className="text-xs text-muted-foreground">{l.value}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-[11px] text-muted-foreground">
          Lektura AI · versi 0.1.0
        </div>
      </div>
    </main>
  );
}
