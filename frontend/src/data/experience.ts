export type ExperienceCategory = "Internship" | "Hackathons" | "Technical Experience";

export type ExperienceItem = {
  id: string;
  title: string;
  category: ExperienceCategory;
  date: string;
  project: string;
  role?: string;
  teamSize?: string;
  description: string;
  result?: string;
  projectHref?: string;
  visual: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "solar-tracking-internship", title: "Data Science Internship — Electronics Department", category: "Internship", date: "15–30 June 2025", project: "Solar Tracking System", role: "Team Lead · Data Analysis", teamSize: "3-person team",
    description: "Completed technical training after first year, leading a three-person team and contributing through performance-data collection and analysis.", visual: "ST",
  },
  {
    id: "sih-2025", title: "Smart India Hackathon 2025", category: "Hackathons", date: "2025", project: "CityNav", role: "Team Lead",
    description: "Led the team in developing CityNav and presented the project in the college-level selection round.", result: "Cleared the college-level round", visual: "CN",
  },
  {
    id: "robothon-2026", title: "ROBOTHON 2026", category: "Hackathons", date: "February 2026", project: "CityNav",
    description: "Showcased CityNav at ROBOTHON, competing among 50 participating teams.", result: "Top 10 of 50 teams", visual: "10",
  },
  {
    id: "shankara-2026", title: "Shankara Hackathon 2026", category: "Hackathons", date: "End of March 2026", project: "Skillect AI", role: "Team Lead", teamSize: "5-person team",
    description: "Led a five-person team to build Skillect AI for the hackathon.", result: "Top 10 teams in the finals", visual: "SA",
  },
  {
    id: "sih-2026", title: "Smart India Hackathon 2026", category: "Hackathons", date: "2026", project: "IntelliLandAI", role: "Team Lead", projectHref: "/projects/intelliland-ai",
    description: "Led the team developing IntelliLandAI and cleared the college-level selection round.", result: "Finals shortlist pending at time of writing", visual: "IL",
  },
  {
    id: "paypal-ai-2026", title: "PayPal AI Hackathon 2026", category: "Hackathons", date: "2026", project: "Wealthra AI", projectHref: "/projects/wealthra-ai",
    description: "Participated with Wealthra AI, applying the project to the hackathon brief.", result: "Results pending at time of writing", visual: "PA",
  },
  {
    id: "flip-switch-2026", title: "Flip the Switch AI Hackathon 2026", category: "Hackathons", date: "2026", project: "Wealthra AI", projectHref: "/projects/wealthra-ai",
    description: "Participated with Wealthra AI, applying the project to the hackathon brief.", result: "Results pending at time of writing", visual: "FS",
  },
];

export const experienceCategories = ["All", "Internship", "Hackathons", "Technical Experience"] as const;
