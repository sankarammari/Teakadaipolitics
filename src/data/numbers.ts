/*
 * "இந்த வாரம் எண்களில்" on the homepage: one figure per card, each taken
 * from (and linking to) an article. Update alongside the articles.
 */
export interface WeekNumber {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  articleSlug: string;
}

export const weekNumbers: WeekNumber[] = [
  {
    value: 37,
    prefix: "₹",
    label: "ஒரு யூனிட் மின்சாரத்துக்குத் தமிழ்நாடு இதுவரை கொடுத்த அதிகபட்ச விலை",
    articleSlug: "tamil-nadu-power-purchase-rs-37-per-unit-row",
  },
  {
    value: 10.89,
    decimals: 2,
    suffix: " லட்சம்",
    label: "ஜனவரி–செப்டம்பர் 2026-இல் பறிமுதலான போதை மாத்திரைகள் (முந்தைய ஆண்டு: 89,435)",
    articleSlug: "drug-seizures-surge-opposition-targets-government",
  },
  {
    value: 310.2,
    decimals: 1,
    suffix: " மி.மீ.",
    label: "அக்டோபர் 17 இரவு கத்திவாக்கத்தில் பெய்த மழை",
    articleSlug: "chennai-heavy-rain-cm-vijay-reviews-monsoon-preparations",
  },
  {
    value: 10.62,
    decimals: 2,
    suffix: "%",
    label: "செப்டம்பரில் தமிழ்நாட்டின் உணவுப் பணவீக்கம், மாநிலங்களில் அதிகம்",
    articleSlug: "fine-rice-prices-push-tamil-nadu-inflation",
  },
];
