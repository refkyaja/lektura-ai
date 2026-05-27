import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Mode = "email" | "text";

// Normalize spoken text into an email address.
// Contoh: "kamu et email titik com" -> "kamu@email.com"
function normalizeEmail(raw: string) {
  let s = raw.toLowerCase().trim();

  const replacements: Array<[RegExp, string]> = [
    [/\s+at\s+/g, "@"],
    [/\s+et\s+/g, "@"],
    [/\s+a\s+keong\s+/g, "@"],
    [/\s+keong\s+/g, "@"],
    [/\s+monyet\s+/g, "@"],
    [/\s+strip\s+/g, "-"],
    [/\s+dash\s+/g, "-"],
    [/\s+minus\s+/g, "-"],
    [/\s+underscore\s+/g, "_"],
    [/\s+garis\s+bawah\s+/g, "_"],
    [/\s+titik\s+/g, "."],
    [/\s+dot\s+/g, "."],
    [/\s+koma\s+/g, "."],
  ];

  // Pad with spaces so word-boundary regexes catch start/end too.
  s = ` ${s} `;
  for (const [pat, val] of replacements) s = s.replace(pat, val);
  s = s.trim();

  // Remove any remaining whitespace inside an email.
  return s.replace(/\s+/g, "");
}

type SRConstructor = new () => any;

function getRecognition(): SRConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return (w.SpeechRecognition || w.webkitSpeechRecognition) ?? null;
}

export function VoiceField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  mode = "text",
  voiceLabel,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  mode?: Mode;
  voiceLabel?: string;
}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  useEffect(() => {
    setSupported(!!getRecognition());
    return () => {
      try {
        recRef.current?.stop?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const startListening = () => {
    const Ctor = getRecognition();
    if (!Ctor) {
      toast.error("Browsermu belum mendukung input suara");
      return;
    }
    try {
      const rec = new Ctor();
      rec.lang = mode === "email" ? "en-US" : "id-ID";
      rec.interimResults = true;
      rec.continuous = false;
      rec.maxAlternatives = 1;

      let finalText = "";

      rec.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += transcript;
          else interim += transcript;
        }
        const combined = (finalText + interim).trim();
        if (!combined) return;
        onChange(mode === "email" ? normalizeEmail(combined) : combined);
      };

      rec.onerror = (e: any) => {
        setListening(false);
        if (e?.error === "not-allowed") {
          toast.error("Izinkan akses mikrofon dulu ya");
        } else if (e?.error !== "aborted") {
          toast.error("Gagal mengenali suara");
        }
      };

      rec.onend = () => setListening(false);

      recRef.current = rec;
      rec.start();
      setListening(true);
      toast(`🎙️ Mendengarkan ${voiceLabel ?? label.toLowerCase()}…`);
    } catch {
      setListening(false);
      toast.error("Gagal memulai input suara");
    }
  };

  const stopListening = () => {
    try {
      recRef.current?.stop?.();
    } catch {
      // ignore
    }
    setListening(false);
  };

  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full h-12 rounded-2xl glass pl-4 pr-12 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition"
        />

        {supported && (
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            aria-label={listening ? "Berhenti merekam" : "Input dengan suara"}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl flex items-center justify-center transition group"
            style={{
              background: listening
                ? "linear-gradient(135deg,#6C63FF,#4D8DFF)"
                : "rgba(255,255,255,0.06)",
              boxShadow: listening
                ? "0 0 0 4px rgba(108,99,255,0.25)"
                : "none",
            }}
          >
            <AnimatePresence>
              {listening && (
                <>
                  <motion.span
                    key="r1"
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(108,99,255,0.5), transparent 70%)",
                    }}
                  />
                  <motion.span
                    key="r2"
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(143,227,255,0.5), transparent 70%)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>
            <MicIcon active={listening} />
          </button>
        )}
      </div>
      {mode === "email" && (
        <span className="block mt-1 text-[10px] text-muted-foreground/70">
          Tips: ucapkan "titik" untuk . dan "et" untuk @
        </span>
      )}
    </label>
  );
}

function MicIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 relative z-10 ${active ? "text-white" : "text-[#B8A8FF]"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}
