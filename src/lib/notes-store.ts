import { useEffect, useState } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  source: "manual" | "recording";
  createdAt: number;
  updatedAt: number;
};

const KEY = "lektura.notes.v1";
const EVT = "lektura:notes-changed";

const COLORS = ["#B8A8FF", "#8FE3FF", "#6C63FF", "#4D8DFF", "#FFB199"];

function read(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function write(notes: Note[]) {
  localStorage.setItem(KEY, JSON.stringify(notes));
  window.dispatchEvent(new CustomEvent(EVT));
}

function seed(): Note[] {
  const now = Date.now();
  const initial: Note[] = [
    {
      id: crypto.randomUUID(),
      title: "Kalkulus Diferensial — Bab 3",
      content:
        "Turunan fungsi mengukur laju perubahan. Aturan dasar: turunan x^n adalah n·x^(n-1). Aturan rantai dipakai untuk fungsi komposisi.",
      category: "Matematika",
      color: "#B8A8FF",
      source: "recording",
      createdAt: now - 1000 * 60 * 60 * 2,
      updatedAt: now - 1000 * 60 * 60 * 2,
    },
    {
      id: crypto.randomUUID(),
      title: "Sejarah Kemerdekaan Indonesia",
      content:
        "Proklamasi 17 Agustus 1945 dibacakan oleh Soekarno didampingi Hatta. Latar belakang: kekalahan Jepang dan peristiwa Rengasdengklok.",
      category: "Sejarah",
      color: "#8FE3FF",
      source: "manual",
      createdAt: now - 1000 * 60 * 60 * 26,
      updatedAt: now - 1000 * 60 * 60 * 26,
    },
  ];
  write(initial);
  return initial;
}

export const notesStore = {
  list(): Note[] {
    return read().sort((a, b) => b.updatedAt - a.updatedAt);
  },
  get(id: string): Note | undefined {
    return read().find((n) => n.id === id);
  },
  create(input: { title: string; content: string; category?: string; source?: Note["source"] }): Note {
    const now = Date.now();
    const note: Note = {
      id: crypto.randomUUID(),
      title: input.title.trim() || "Tanpa Judul",
      content: input.content,
      category: input.category?.trim() || "Umum",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      source: input.source ?? "manual",
      createdAt: now,
      updatedAt: now,
    };
    write([note, ...read()]);
    return note;
  },
  update(id: string, patch: Partial<Pick<Note, "title" | "content" | "category">>) {
    const next = read().map((n) =>
      n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n,
    );
    write(next);
  },
  remove(id: string) {
    write(read().filter((n) => n.id !== id));
  },
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => (typeof window === "undefined" ? [] : notesStore.list()));
  useEffect(() => {
    const sync = () => setNotes(notesStore.list());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return notes;
}

export function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Kemarin";
  if (d < 7) return `${d} hari lalu`;
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}
