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
  "/images/articles/state-budget-explained-in-five-numbers.jpg": { author: "Osama Shukir Muhammed Amin", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Trial_design_for_a_1_rupee_banknote._Government_of_India,_1940._On_display_at_the_British_Museum_in_London.jpg" },
  "/images/articles/panchayat-elections-reservation-rotation.jpg": { author: "Palanis1", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kovilambakkam_panchayat_office.jpg" },
  "/images/articles/fuel-prices-and-the-tea-glass-index.jpg": { author: "Karthickbala", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tea_stall_tamil_nadu.jpg" },
  "/images/articles/school-breakfast-scheme-first-year-review.jpg": { author: "Ajay Tallam", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Children_at_a_rural_school_provided_with_lunch_Uttar_Pradesh_India.jpg" },
  "/images/articles/booth-agents-the-campaigns-quiet-backbone.jpg": { author: "Ranjit Bhaskar / Al Jazeera English", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Rural_polling_station_in_Bangalore,_2009.jpg" },
  "/images/articles/metro-rail-phase-two-land-acquisition.jpg": { author: "Arjun1001", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Alstom_Metropolis_train-set_at_Guindy_Metro_station_in_Chennai.jpg" },
  "/images/articles/why-manifestos-deserve-a-second-reading.jpg": { author: "Jorge Royan", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:India_-_Varanasi_paper_bag_maker_-_0078.jpg" },
  "/images/articles/draft-article-not-published.jpg": { author: "PlaneMad", license: "CC BY-SA 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama.jpg" },
  "/images/videos/bench-talk-what-the-assembly-session-left-unfinished.jpg": { author: "L. Vivian Richard", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George,_Chennai_3.jpg" },
  "/images/videos/turnout-explained-in-ten-minutes.jpg": { author: "GeoEvan (www.polgeonow.com)", license: "CC BY 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Meghalaya_2023_election_polling_station.jpg" },
  "/images/videos/reading-a-ward-budget-together.jpg": { author: "PlaneMad", license: "CC BY 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama_2.jpg" },
  "/images/videos/free-bus-travel-riders-speak.jpg": { author: "PlaneMad", license: "CC BY-SA 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:MTC_bus_old.jpg" },
  "/images/videos/state-budget-five-numbers-whiteboard.jpg": { author: "Hiroki Ogawa", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George_George_Town_Chennai_India_-_panoramio_(1).jpg" },
  "/images/videos/a-day-with-a-booth-agent.jpg": { author: "GeoEvan (www.polgeonow.com)", license: "CC BY 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Meghalaya_2023_election_polling_station_(people_waiting).jpg" },
};

const licenseUrls: Record<string, string> = {
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
};

export const licenseUrl = (license: string) => licenseUrls[license];
