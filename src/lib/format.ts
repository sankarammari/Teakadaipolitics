const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

export const contentTypeLabel = {
  news: "News",
  analysis: "Analysis",
  opinion: "Opinion",
} as const;
