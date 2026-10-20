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
    title: "Bench talk: what the Assembly session left unfinished",
    description: "A short conversation on the two bills sent to a select committee and why they matter to renters and students.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("bench-talk-what-the-assembly-session-left-unfinished"),
    category: "current-affairs",
    publishedAt: "2026-10-19T20:00:00+05:30",
    featured: true,
    durationLabel: "14 min",
  },
  {
    id: "vid-002",
    slug: "turnout-explained-in-ten-minutes",
    title: "Turnout explained in ten minutes",
    description: "Why turnout percentages move even when the number of voters does not, using a sample voter roll.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("turnout-explained-in-ten-minutes"),
    category: "elections",
    publishedAt: "2026-10-15T18:30:00+05:30",
    featured: false,
    durationLabel: "10 min",
  },
  {
    id: "vid-003",
    slug: "reading-a-ward-budget-together",
    title: "Reading a ward budget together",
    description: "We open a sample ward budget on screen and walk through the three lines that decide what gets built.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("reading-a-ward-budget-together"),
    category: "local-governance",
    publishedAt: "2026-10-11T18:00:00+05:30",
    featured: false,
    durationLabel: "18 min",
  },
  {
    id: "vid-004",
    slug: "free-bus-travel-riders-speak",
    title: "Free bus travel: riders speak",
    description: "Commuters at a sample bus stop describe how fare-free travel changed their daily routes.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("free-bus-travel-riders-speak"),
    category: "government-policy",
    publishedAt: "2026-10-07T19:00:00+05:30",
    featured: false,
    durationLabel: "9 min",
  },
  {
    id: "vid-005",
    slug: "state-budget-five-numbers-whiteboard",
    title: "The state budget on one whiteboard",
    description: "Five illustrative numbers, one marker, and how they limit what any government can promise.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("state-budget-five-numbers-whiteboard"),
    category: "economy",
    publishedAt: "2026-10-03T18:00:00+05:30",
    featured: false,
    durationLabel: "12 min",
  },
  {
    id: "vid-006",
    slug: "a-day-with-a-booth-agent",
    title: "A day with a booth agent",
    description: "What a booth agent does from the mock poll at dawn to the sealing of the machine at night.",
    youtubeVideoId: "",
    channelName: "Teakadai Politics",
    ...thumb("a-day-with-a-booth-agent"),
    category: "elections",
    publishedAt: "2026-09-28T18:00:00+05:30",
    featured: false,
    durationLabel: "16 min",
  },
];
