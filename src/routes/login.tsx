import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { AuthShell, SocialButtons, Divider } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Lektura AI" },
      {
        name: "description",
        content: "Masuk ke Lektura AI dan lanjutkan belajar dengan bantuan AI.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Selamat datang kembali ✨");
    navigate({ to: "/" });
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("Gagal masuk dengan Google");
      return;
    }
    if (result.redirected) return;
    toast.success("Berhasil masuk ✨");
    navigate({ to: "/" });
  };

  return (
    <AuthShell
      kicker="Masuk"
      title="Selamat Datang Kembali"
      subtitle="Lanjutkan sesi belajarmu bersama Lektura AI."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/signup" className="text-[#8FE3FF] hover:underline">
            Daftar gratis
          </Link>
        </>
      }
    >
      <SocialButtons onGoogle={handleGoogle} loading={loading} />
      <Divider label="atau dengan email" />

      <form onSubmit={handleEmailLogin} className="space-y-3">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="kamu@email.com"
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
        />

        <div className="flex justify-end -mt-1">
          <Link
            to="/forgot-password"
            className="text-xs text-muted-foreground hover:text-[#8FE3FF] transition"
          >
            Lupa password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-13 mt-2 rounded-2xl font-display font-semibold text-base text-primary-foreground shadow-glow-primary transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
            height: "52px",
          }}
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </AuthShell>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full h-12 rounded-2xl glass px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition"
      />
    </label>
  );
}
