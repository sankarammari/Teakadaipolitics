import type { Video } from "@/types";
import { imageCredits } from "./image-credits";

/*
 * SAMPLE CONTENT. `youtubeVideoId` is left empty on purpose: the player
 * shows its "video not linked yet" fallback until a real id from the
 * publication's own channel is filled in. Paste either the 11-character id
 * or the full YouTube URL.
 */

const thumb = (slug: string) => {
  const thumbnail = `/images/videos/${slug}.jpg`;
  return { thumbnail, thumbnailCredit: imageCredits[thumbnail] };
};

export const videos: Video[] = [
  {
    id: "vid-001",
    slug: "bench-talk-what-the-assembly-session-left-unfinished",
    title: "பெஞ்சு பேச்சு: சட்டப்பேரவைக் கூட்டத்தொடர் முடிக்காமல் விட்டவை",
    description: "தேர்வுக் குழுவுக்கு அனுப்பப்பட்ட இரண்டு மசோதாக்கள் பற்றியும், அவை தமிழ்நாட்டு வாடகைதாரர்களுக்கும் மாணவர்களுக்கும் ஏன் முக்கியம் என்பது பற்றியும் ஒரு சிறு உரையாடல்.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("bench-talk-what-the-assembly-session-left-unfinished"),
    category: "current-affairs",
    publishedAt: "2026-10-19T20:00:00+05:30",
    featured: true,
    durationLabel: "14 நிமிடம்",
  },
  {
    id: "vid-002",
    slug: "turnout-explained-in-ten-minutes",
    title: "பத்து நிமிடத்தில் வாக்குப்பதிவு விகிதம்",
    description: "வாக்காளர் எண்ணிக்கை மாறாவிட்டாலும் வாக்குப்பதிவு சதவீதம் ஏன் மாறுகிறது? ஒரு மாதிரி வாக்காளர் பட்டியலை வைத்து விளக்குகிறோம்.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("turnout-explained-in-ten-minutes"),
    category: "elections",
    publishedAt: "2026-10-15T18:30:00+05:30",
    featured: false,
    durationLabel: "10 நிமிடம்",
  },
  {
    id: "vid-003",
    slug: "reading-a-ward-budget-together",
    title: "சென்னை வார்டு பட்ஜெட்டை ஒன்றாகப் படிப்போம்",
    description: "ஒரு மாதிரி மாநகராட்சி வார்டு பட்ஜெட்டைத் திரையில் திறந்து, எது கட்டப்படும் என்பதைத் தீர்மானிக்கும் மூன்று வரிகளைப் பார்க்கிறோம்.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("reading-a-ward-budget-together"),
    category: "local-governance",
    publishedAt: "2026-10-11T18:00:00+05:30",
    featured: false,
    durationLabel: "18 நிமிடம்",
  },
  {
    id: "vid-004",
    slug: "free-bus-travel-riders-speak",
    title: "கட்டணமில்லாப் பேருந்து: பயணிகள் சொல்வது",
    description: "சென்னைப் பேருந்து நிறுத்தம் ஒன்றில், கட்டணமில்லாப் பயணம் தங்கள் அன்றாடப் பயணத்தை எப்படி மாற்றியது என்று பயணிகள் பேசுகிறார்கள்.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("free-bus-travel-riders-speak"),
    category: "government-policy",
    publishedAt: "2026-10-07T19:00:00+05:30",
    featured: false,
    durationLabel: "9 நிமிடம்",
  },
  {
    id: "vid-005",
    slug: "state-budget-five-numbers-whiteboard",
    title: "தமிழ்நாடு பட்ஜெட்: ஒரே வெள்ளைப் பலகையில்",
    description: "ஐந்து எடுத்துக்காட்டு எண்கள், ஒரு மார்க்கர்: எந்த அரசும் எவ்வளவு வாக்குறுதி தர முடியும் என்பதை அவை எப்படிக் கட்டுப்படுத்துகின்றன.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("state-budget-five-numbers-whiteboard"),
    category: "economy",
    publishedAt: "2026-10-03T18:00:00+05:30",
    featured: false,
    durationLabel: "12 நிமிடம்",
  },
  {
    id: "vid-006",
    slug: "a-day-with-a-booth-agent",
    title: "ஒரு பூத் முகவருடன் ஒரு நாள்",
    description: "விடியற்காலை மாதிரி வாக்குப்பதிவு முதல் இரவு இயந்திரத்துக்குச் சீல் வைப்பது வரை, தமிழ்நாட்டுத் தொகுதி ஒன்றில் பூத் முகவர் என்ன செய்கிறார்.",
    youtubeVideoId: "",
    channelName: "டீக்கடை அரசியல்",
    ...thumb("a-day-with-a-booth-agent"),
    category: "elections",
    publishedAt: "2026-09-28T18:00:00+05:30",
    featured: false,
    durationLabel: "16 நிமிடம்",
  },
];
