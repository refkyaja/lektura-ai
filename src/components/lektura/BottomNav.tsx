import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, FileText, Mic, GraduationCap, User } from "lucide-react";

type Item = {
  to: "/home" | "/notes" | "/study" | "/profile";
  icon: typeof Home;
  label: string;
};

const items: Item[] = [
  { to: "/home", icon: Home, label: "Beranda" },
  { to: "/notes", icon: FileText, label: "Catatan" },
  { to: "/study", icon: GraduationCap, label: "Belajar" },
  { to: "/profile", icon: User, label: "Profil" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-md w-[calc(100%-2rem)]"
    >
      <div className="glass rounded-3xl px-3 py-2.5 flex items-center justify-around backdrop-blur-2xl border border-white/10">
        {items.slice(0, 2).map((it) => (
          <NavBtn key={it.to} item={it} active={path.startsWith(it.to)} />
        ))}

        <button
          onClick={() => navigate({ to: "/record" })}
          aria-label="Rekam"
          className="-mt-7 h-14 w-14 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#6C63FF 0%,#4D8DFF 100%)",
            boxShadow: "0 12px 30px -8px rgba(108,99,255,0.7)",
          }}
        >
          <Mic className="h-6 w-6 text-white" />
        </button>

        {items.slice(2).map((it) => (
          <NavBtn key={it.to} item={it} active={path.startsWith(it.to)} />
        ))}
      </div>
    </motion.nav>
  );
}

function NavBtn({ item, active }: { item: Item; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl transition ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-medium">{item.label}</span>
    </Link>
  );
}
