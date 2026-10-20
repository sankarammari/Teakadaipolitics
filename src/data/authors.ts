import type { Author } from "@/types";

// Placeholder bylines for layout only. Replace with real contributors
// and their own bios; do not add credentials here that nobody holds.
export const authors: Author[] = [
  {
    id: "a-desk",
    name: "Teakadai Desk",
    slug: "teakadai-desk",
    bio: "Placeholder byline for desk-written sample pieces.",
  },
  {
    id: "a-meena",
    name: "Meena Raghavan",
    slug: "meena-raghavan",
    bio: "Fictional sample contributor used to preview analysis layouts.",
  },
  {
    id: "a-arul",
    name: "Arul Selvan",
    slug: "arul-selvan",
    bio: "Fictional sample contributor used to preview opinion layouts.",
  },
  {
    id: "a-farhana",
    name: "Farhana Iqbal",
    slug: "farhana-iqbal",
    bio: "Fictional sample contributor used to preview news layouts.",
  },
];

export const authorById = (id: string): Author => {
  const author = authors.find((a) => a.id === id);
  if (!author) throw new Error(`Unknown author id in mock data: ${id}`);
  return author;
};
