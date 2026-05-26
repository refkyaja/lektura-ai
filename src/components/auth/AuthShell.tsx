import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Particles } from "@/components/lektura/Particles";

export function AuthShell({
  kicker,
  title,
  subtitle,
  children,
  footer,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,23,42,0)_0%,_rgba(15,23,42,0.92)_70%)]" />
      <Particles count={22} />

      <section className="relative z-10 min-h-screen flex flex-col px-6 py-8 max-w-md mx-auto">
        <Link to="/" className="flex items-center gap-2 mb-6 w-fit">
          <div
            className="relative h-9 w-9 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,#B8A8FF 0%,#6C63FF 50%,#4D8DFF 100%)",
              boxShadow: "0 6px 20px -4px rgba(108,99,255,0.6)",
            }}
          >
            <span className="text-sm font-display font-bold text-white">L</span>
            <span className="absolute -top-0.5 -right-0.5 text-[10px]">✦</span>
          </div>
          <div className="font-display font-semibold tracking-tight">
            Lektura<span className="text-[#8FE3FF]"> AI</span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center py-4"
        >
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#8FE3FF] mb-3">
            {kicker}
          </div>
          <h1 className="font-display text-3xl font-semibold leading-tight text-gradient">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-7">{children}</div>
        </motion.div>

        <div className="text-center text-sm text-muted-foreground mt-6">
          {footer}
        </div>
      </section>
    </main>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#EA4335" d="M12 11v3.4h4.7c-.2 1.2-1.4 3.6-4.7 3.6-2.8 0-5.1-2.3-5.1-5.2S9.2 7.6 12 7.6c1.6 0 2.7.7 3.3 1.3l2.3-2.2C16.1 5.4 14.2 4.6 12 4.6 7.8 4.6 4.4 8 4.4 12.2S7.8 19.8 12 19.8c6.7 0 7.6-6.2 7-9.3H12z"/>
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.48.11-3.08 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.78.11 3.08.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

export function SocialButtons({
  onGoogle,
  loading,
}: {
  onGoogle: () => void;
  loading?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onGoogle}
        disabled={loading}
        className="h-12 rounded-2xl glass-strong flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10 transition disabled:opacity-50"
      >
        <GoogleIcon />
        Google
      </button>
      <button
        type="button"
        disabled
        title="GitHub login segera hadir"
        className="h-12 rounded-2xl glass flex items-center justify-center gap-2 text-sm font-medium opacity-60 cursor-not-allowed relative"
      >
        <GitHubIcon />
        GitHub
        <span className="absolute -top-2 -right-1 text-[9px] px-1.5 py-0.5 rounded-full bg-[#6C63FF]/40 text-[#B8A8FF] border border-[#B8A8FF]/30">
          segera
        </span>
      </button>
    </div>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}
