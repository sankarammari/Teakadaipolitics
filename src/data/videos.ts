import type { Video } from "@/types";
import { imageCredits } from "./image-credits";

/*
 * Planned videos for the Teakadai Politics YouTube channel. While
 * `youtubeVideoId` is empty the site shows them as "coming soon" with a
 * subscribe link; paste the 11-character id or the full YouTube URL once a
 * video is uploaded and the player switches on by itself.
 */

const thumb = (slug: string) => {
  const thumbnail = `/images/videos/${slug}.jpg`;
  return { thumbnail, thumbnailCredit: imageCredits[thumbnail] };
};

export const videos: Video[] = [
  {
    id: "vid-101",
    slug: "power-purchase-explained",
    title: "யூனிட்டுக்கு ₹37 மின்சாரம்: ஒப்பந்தத்தின் முழு விவரம்",
    description: "TNPDCL-இன் குறுகிய கால மின்சாரக் கொள்முதல், அரசின் விளக்கம், எதிர்க்கட்சிகளின் கேள்விகள், பிற மாநிலங்கள் கொடுத்த விலை: எளிய விளக்கம்.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("power-purchase-explained"),
    category: "economy",
    publishedAt: "2026-10-24T18:00:00+05:30",
    featured: true,
  },
  {
    id: "vid-102",
    slug: "sir-voter-roll-row-explained",
    title: "SIR என்றால் என்ன? வாக்காளர் பட்டியல் சர்ச்சை ஏன்?",
    description: "சிறப்புத் தீவிரத் திருத்தம் குறித்து திமுக, தவெக, காங்கிரஸ் நிலைப்பாடுகள், தேர்தல் ஆணையத்தின் மீதான கோரிக்கைகள்.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("sir-voter-roll-row-explained"),
    category: "elections",
    publishedAt: "2026-10-25T18:00:00+05:30",
    featured: false,
  },
  {
    id: "vid-103",
    slug: "chennai-rain-drainage-readiness",
    title: "சென்னை மழை: 300 மி.மீ. மழைக்கு நகரம் தயாரா?",
    description: "அக்டோபர் 17 மழைப் பதிவுகள், ஏரிகளின் நீர் இருப்பு, மழைநீர் வடிகால் முன்னேற்பாடுகள்.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("chennai-rain-drainage-readiness"),
    category: "public-administration",
    publishedAt: "2026-10-26T18:00:00+05:30",
    featured: false,
  },
  {
    id: "vid-104",
    slug: "teakadai-bench-weekly-roundup",
    title: "டீக்கடை பெஞ்சு: இந்த வாரத் தமிழ்நாட்டு அரசியல்",
    description: "மெட்ரோ திறப்பு முதல் இடைத்தேர்தல் கைது வரை: ஒரு கிளாஸ் டீ நேரத்தில் வாரத்தின் முக்கிய அரசியல் செய்திகள்.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("teakadai-bench-weekly-roundup"),
    category: "current-affairs",
    publishedAt: "2026-10-27T18:00:00+05:30",
    featured: false,
  },
];
