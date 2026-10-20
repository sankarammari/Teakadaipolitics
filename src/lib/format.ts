const dateFormatter = new Intl.DateTimeFormat("ta-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

export const readingTimeLabel = (minutes: number) => `${minutes} நிமிட வாசிப்பு`;

export const contentTypeLabel = {
  news: "செய்தி",
  analysis: "பகுப்பாய்வு",
  opinion: "கருத்து",
} as const;
