import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Password Baru — Lektura AI" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    if (password !== confirm) return toast.error("Password tidak cocok");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password berhasil diperbarui ✨");
    navigate({ to: "/login" });
  };

  return (
    <AuthShell
      kicker="Password Baru"
      title="Buat Password Baru"
      subtitle="Masukkan password baru untuk akun Lektura AI kamu."
      footer={<span>Pastikan password kamu aman dan mudah diingat.</span>}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Password baru</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
            required
            className="mt-1.5 w-full h-12 rounded-2xl glass px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Konfirmasi password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password"
            required
            className="mt-1.5 w-full h-12 rounded-2xl glass px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 rounded-2xl font-display font-semibold text-base text-primary-foreground shadow-glow-primary transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
            height: "52px",
          }}
        >
          {loading ? "Menyimpan…" : "Simpan password"}
        </button>
      </form>
    </AuthShell>
  );
}
