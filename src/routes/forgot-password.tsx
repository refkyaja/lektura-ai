import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Lupa Password — Lektura AI" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Link reset password sudah dikirim");
  };

  return (
    <AuthShell
      kicker="Lupa Password"
      title="Reset Password"
      subtitle="Masukkan email kamu, kami kirim link untuk membuat password baru."
      footer={
        <Link to="/login" className="text-[#8FE3FF] hover:underline">
          ← Kembali ke Masuk
        </Link>
      }
    >
      {sent ? (
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-3xl mb-2">📨</div>
          <p className="text-sm">
            Cek inbox <span className="text-[#8FE3FF]">{email}</span> untuk link reset password.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamu@email.com"
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
            {loading ? "Mengirim…" : "Kirim link reset"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
