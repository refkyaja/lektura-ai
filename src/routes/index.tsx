import { createFileRoute } from "@tanstack/react-router";
import { LekturaOnboarding } from "@/components/lektura/LekturaOnboarding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lektura AI — Smart Study Companion" },
      {
        name: "description",
        content:
          "Lektura AI ubah rekaman kelas jadi catatan, ringkasan, flashcard, dan kuis otomatis. Belajar lebih pintar dengan AI.",
      },
      { property: "og:title", content: "Lektura AI — Smart Study Companion" },
      {
        property: "og:description",
        content:
          "Belajar modern bersama Lektura AI: transkrip otomatis, ringkasan, flashcard, dan kuis interaktif.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LekturaOnboarding />;
}
