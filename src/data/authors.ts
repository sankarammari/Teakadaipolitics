import type { Author } from "@/types";

// Placeholder bylines for layout only. Replace with real contributors
// and their own bios; do not add credentials here that nobody holds.
export const authors: Author[] = [
  {
    id: "a-desk",
    name: "டீக்கடை செய்திக்குழு",
    slug: "teakadai-desk",
    bio: "செய்திக்குழு எழுதும் மாதிரிக் கட்டுரைகளுக்கான பொதுப் பெயர்.",
  },
  {
    id: "a-meena",
    name: "மீனா ராகவன்",
    slug: "meena-raghavan",
    bio: "பகுப்பாய்வுப் பக்க வடிவமைப்பைக் காட்டுவதற்கான கற்பனை எழுத்தாளர்.",
  },
  {
    id: "a-arul",
    name: "அருள் செல்வன்",
    slug: "arul-selvan",
    bio: "கருத்துப் பக்க வடிவமைப்பைக் காட்டுவதற்கான கற்பனை எழுத்தாளர்.",
  },
  {
    id: "a-farhana",
    name: "ஃபர்ஹானா இக்பால்",
    slug: "farhana-iqbal",
    bio: "செய்திப் பக்க வடிவமைப்பைக் காட்டுவதற்கான கற்பனை செய்தியாளர்.",
  },
];

export const authorById = (id: string): Author => {
  const author = authors.find((a) => a.id === id);
  if (!author) throw new Error(`Unknown author id in mock data: ${id}`);
  return author;
};
