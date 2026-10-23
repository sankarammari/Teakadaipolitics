import type { ImageCredit } from "@/types";

/*
 * Photos from Wikimedia Commons, used to illustrate each story's topic. CC BY / CC BY-SA licences require the
 * credit shown on the page and on /credits. Replace with the publication's
 * own photos (and their credits) before launch.
 */
export const imageCredits: Record<string, ImageCredit> = {
  "/images/articles/chennai-metro-poonamallee-vadapalani-stretch-opens.jpg": { author: "Arjun1001", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Alstom_Metropolis_train-set_at_Guindy_Metro_station_in_Chennai.jpg" },
  "/images/articles/dmk-demands-cec-removal-in-sir-row.jpg": { author: "Al Jazeera English", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Queues_of_Indian_voters_-_Flickr_-_Al_Jazeera_English.jpg" },
  "/images/articles/tvk-joins-india-bloc-anti-sir-protest.jpg": { author: "Shagil Kannur", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Contr_Unit_of_Electronic_Voting_Machine_2.jpg" },
  "/images/articles/dharapuram-ntk-candidate-karthika-arrested.jpg": { author: "Ranjit Bhaskar / Al Jazeera English", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Rural_polling_station_in_Bangalore,_2009.jpg" },
  "/images/articles/tamil-nadu-semiconductor-ecosystem-scheme-2026.jpg": { author: "L. Vivian Richard", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George,_Chennai_2.jpg" },
  "/images/articles/rural-employment-additional-25-days.jpg": { author: "Thamizhpparithi Maari", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Building_of_Village_Panchayat_Service_Centre.jpg" },
  "/images/articles/madras-hc-upholds-resignations-of-six-aiadmk-mlas.jpg": { author: "Suresh Babunair", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Madras_high_court,_chennai_-_panoramio.jpg" },
  "/images/articles/anti-defection-law-resignations-explained.jpg": { author: "Raki_Man", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Madras_High_Court_-_panoramio.jpg" },
  "/images/articles/tamil-nadu-power-purchase-rs-37-per-unit-row.jpg": { author: "Prateek Rungta", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:North_Chennai_thermal_power_station.jpg" },
  "/images/articles/vijay-naidu-telugu-ganga-water-for-chennai.jpg": { author: "Saral Shots", license: "CC0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Poondi_Reservoir.jpg" },
  "/images/articles/fine-rice-prices-push-tamil-nadu-inflation.jpg": { author: "Thamizhpparithi Maari", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%22A_paddy_field_in_Tamil_Nadu%22.jpg" },
  "/images/articles/l-murugan-quits-union-ministry.jpg": { author: "Pinakpani", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Parliament_of_India_in_New_Delhi_06.jpg" },
  "/images/articles/chennai-heavy-rain-cm-vijay-reviews-monsoon-preparations.jpg": { author: "McKay Savage", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_Monsoon_-_01_(3058208937).jpg" },
  "/images/articles/drug-seizures-surge-opposition-targets-government.jpg": { author: "Ssriram mt", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Nagapattinam1.JPG" },
  "/images/articles/kodaikanal-online-tickets-for-tourist-spots.jpg": { author: "Manimavet", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Pillar_Rocks_Kodaikanal.jpg" },
  "/images/articles/asset-declaration-mandatory-for-promotion.jpg": { author: "L. Vivian Richard", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_St._George,_Chennai_3.jpg" },
  "/images/articles/chennai-electric-bus-tender-cancelled-then-revived.jpg": { author: "Aravind Sivaraj", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Chennai_MTC%27s_ordinary_fare_bus.jpg" },
  "/images/articles/chennai-civic-tenders-cancelled-mayor-priya.jpg": { author: "PlaneMad", license: "CC BY 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama_2.jpg" },
  "/images/videos/power-purchase-explained.jpg": { author: "Prateek Rungta", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:North_Chennai_thermal_power_station.jpg" },
  "/images/videos/sir-voter-roll-row-explained.jpg": { author: "McKay Savage", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_busy_T._Nagar_market_2_(3059483658).jpg" },
  "/images/videos/chennai-rain-drainage-readiness.jpg": { author: "PlaneMad", license: "CC BY 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ripon_Building_panorama_2.jpg" },
  "/images/videos/teakadai-bench-weekly-roundup.jpg": { author: "Karthickbala", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tea_stall_tamil_nadu.jpg" },
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
