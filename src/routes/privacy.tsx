import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Shield, Lock, Eye, Download, Trash2, ChevronRight } from "lucide-react";
import { Particles } from "@/components/lektura/Particles";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privasi & Keamanan — Lektura AI" }] }),
  component: PrivacyPage,
});

const sections = [
  {
    label: "Keamanan akun",
    items: [
      { icon: Lock, label: "Ubah kata sandi", desc: "Terakhir diubah 2 minggu lalu" },
      { icon: Shield, label: "Verifikasi 2 langkah", desc: "Belum aktif" },
    ],
  },
  {
    label: "Data kamu",
    items: [
      { icon: Eye, label: "Riwayat aktivitas", desc: "Lihat semua sesi belajar" },
      { icon: Download, label: "Unduh data saya", desc: "Ekspor semua catatan & rekaman" },
      { icon: Trash2, label: "Hapus akun", desc: "Permanen dan tidak bisa dibatalkan", danger: true },
    ],
  },
];

function PrivacyPage() {
  const navigate = useNavigate();

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
          <h1 className="font-display text-xl font-semibold">Privasi & Keamanan</h1>
        </header>

        <div className="mt-6 glass rounded-3xl p-5 flex items-center gap-4 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(143,227,255,0.15))",
          }}
        >
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-white/10">
            <Shield className="h-7 w-7 text-[#B8A8FF]" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold">Akun kamu aman</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Data dienkripsi end-to-end & disimpan lokal.
            </p>
          </div>
        </div>

        {sections.map((s) => (
          <div key={s.label} className="mt-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {s.label}
            </div>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
              {s.items.map((it) => (
                <button
                  key={it.label}
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.05] transition text-left"
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                      it.danger ? "bg-[#FF6B8A]/15" : "bg-white/5"
                    }`}
                  >
                    <it.icon className={`h-4 w-4 ${it.danger ? "text-[#FF6B8A]" : ""}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${it.danger ? "text-[#FF6B8A]" : ""}`}>
                      {it.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{it.desc}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
