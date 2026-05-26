import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { AuthShell, SocialButtons, Divider } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Daftar — Lektura AI" },
      {
        name: "description",
        content:
          "Buat akun Lektura AI dan mulai belajar pintar dengan transkrip otomatis, ringkasan, flashcard, dan kuis.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Cek email kamu untuk verifikasi ✉️");
    navigate({ to: "/login" });
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("Gagal mendaftar dengan Google");
      return;
    }
    if (result.redirected) return;
    toast.success("Akun siap ✨");
    navigate({ to: "/" });
  };

  return (
    <AuthShell
      kicker="Daftar"
      title="Mulai Belajar Lebih Pintar"
      subtitle="Buat akun gratis dan biarkan AI bantu kamu mencatat, meringkas, dan menguji diri."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#8FE3FF] hover:underline">
            Masuk
          </Link>
        </>
      }
    >
      <SocialButtons onGoogle={handleGoogle} loading={loading} />
      <Divider label="atau daftar dengan email" />

      <form onSubmit={handleSignup} className="space-y-3">
        <Field
          label="Nama tampilan"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Nama kamu"
          required
        />
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
          placeholder="Minimal 6 karakter"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 rounded-2xl font-display font-semibold text-base text-primary-foreground shadow-glow-primary transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
            height: "52px",
          }}
        >
          {loading ? "Membuat akun…" : "Buat akun"}
        </button>

        <p className="text-[11px] text-muted-foreground text-center mt-3">
          Dengan mendaftar kamu setuju dengan syarat &amp; ketentuan Lektura AI.
        </p>
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
