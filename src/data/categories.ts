import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "current-affairs",
    name: "Current affairs",
    slug: "current-affairs",
    description: "What happened this week in the Assembly, the Secretariat and the street.",
  },
  {
    id: "elections",
    name: "Elections",
    slug: "elections",
    description: "Campaigns, turnout, alliances and how voters actually decide.",
  },
  {
    id: "government-policy",
    name: "Government policy",
    slug: "government-policy",
    description: "Schemes, budgets and laws, read line by line.",
  },
  {
    id: "public-administration",
    name: "Public administration",
    slug: "public-administration",
    description: "How offices, departments and local bodies deliver, or fail to.",
  },
  {
    id: "economy",
    name: "Economy",
    slug: "economy",
    description: "Prices, jobs and the money behind political promises.",
  },
  {
    id: "local-governance",
    name: "Local governance",
    slug: "local-governance",
    description: "Panchayats, municipalities and ward councils, where politics is closest.",
  },
];
