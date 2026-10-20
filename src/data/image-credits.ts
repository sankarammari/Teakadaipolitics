import type { ImageCredit } from "@/types";

/*
 * Demo photos from Wikimedia Commons. CC BY / CC BY-SA licences require the
 * credit shown on the page and on /credits. Replace with the publication's
 * own photos (and their credits) before launch.
 */
export const imageCredits: Record<string, ImageCredit> = {
  "/images/articles/ward-budgets-what-the-money-really-buys.jpg": { author: "Yercaud-elango", license: "CC BY 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building-1-central-chennai-India.jpg" },
  "/images/articles/reading-turnout-numbers-without-overreading-them.jpg": { author: "Al Jazeera English", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Queues_of_Indian_voters_-_Flickr_-_Al_Jazeera_English.jpg" },
  "/images/articles/assembly-session-what-passed-and-what-waited.jpg": { author: "L. Vivian Richard", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George,_Chennai_2.jpg" },
  "/images/articles/free-bus-travel-scheme-who-uses-it.jpg": { author: "Aravind Sivaraj", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Chennai_MTC%27s_ordinary_fare_bus.jpg" },
  "/images/articles/why-alliance-arithmetic-rarely-adds-up.jpg": { author: "Shagil Kannur", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Contr_Unit_of_Electronic_Voting_Machine_2.jpg" },
  "/images/articles/district-collectors-office-pending-petitions.jpg": { author: "Thamizhpparithi Maari", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Collectorate,_Thanjavur.jpg" },
  "/images/articles/state-budget-explained-in-five-numbers.jpg": { author: "Rajgovind Jawahar", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Moore_Market_Complex_Chennai_(119379983).jpeg" },
  "/images/articles/panchayat-elections-reservation-rotation.jpg": { author: "Palanis1", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kovilambakkam_panchayat_office.jpg" },
  "/images/articles/fuel-prices-and-the-tea-glass-index.jpg": { author: "Karthickbala", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tea_stall_tamil_nadu.jpg" },
  "/images/articles/school-breakfast-scheme-first-year-review.jpg": { author: "Matthew T Rader", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Children_in_an_elementary_school_in_Mayiladuthurai.jpg" },
  "/images/articles/booth-agents-the-campaigns-quiet-backbone.jpg": { author: "Ranjit Bhaskar / Al Jazeera English", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Rural_polling_station_in_Bangalore,_2009.jpg" },
  "/images/articles/metro-rail-phase-two-land-acquisition.jpg": { author: "Arjun1001", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Alstom_Metropolis_train-set_at_Guindy_Metro_station_in_Chennai.jpg" },
  "/images/articles/why-manifestos-deserve-a-second-reading.jpg": { author: "Arunankapilan", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E0%AE%A8%E0%AE%BE%E0%AE%B3%E0%AE%BF%E0%AE%A4%E0%AE%B4%E0%AF%8D_%E0%AE%B5%E0%AE%BE%E0%AE%9A%E0%AE%BF%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%81.JPG" },
  "/images/articles/draft-article-not-published.jpg": { author: "PlaneMad", license: "CC BY-SA 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama.jpg" },
  "/images/videos/bench-talk-what-the-assembly-session-left-unfinished.jpg": { author: "L. Vivian Richard", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George,_Chennai_3.jpg" },
  "/images/videos/turnout-explained-in-ten-minutes.jpg": { author: "McKay Savage", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_busy_T._Nagar_market_2_(3059483658).jpg" },
  "/images/videos/reading-a-ward-budget-together.jpg": { author: "PlaneMad", license: "CC BY 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama_2.jpg" },
  "/images/videos/free-bus-travel-riders-speak.jpg": { author: "PlaneMad", license: "CC BY-SA 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:MTC_bus_old.jpg" },
  "/images/videos/state-budget-five-numbers-whiteboard.jpg": { author: "Hiroki Ogawa", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George_George_Town_Chennai_India_-_panoramio_(1).jpg" },
  "/images/videos/a-day-with-a-booth-agent.jpg": { author: "Thamizhpparithi Maari", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Building_of_Village_Panchayat_Service_Centre.jpg" },
};

const licenseUrls: Record<string, string> = {
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
};

export const licenseUrl = (license: string) => licenseUrls[license];
