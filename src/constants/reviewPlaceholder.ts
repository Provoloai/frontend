import type { ReviewProfileData } from "@/types/review";

export const PLACEHOLDER_PROFILE: ReviewProfileData = {
  summary: {
    text: "Lorem ipsum dolor sit amet consectetur. Rhoncus mi ornare blandit eu vestibulum scelerisque erat at nec. Lacus interdum mattis eget facilisis lorem duis nulla dolor sagittis. Semper velit ut ultrices scelerisque et posuere sit. Tincidunt ultrices at ipsum posuere. Facilisi pretium vitae ipsum nisi egestas ac lectus. Lacus fringilla arcu magna suspendisse elementum risus. Nec tincidunt platea sed tempor nibh turpis est. Imperdiet in non lacus eget scelerisque. Quisque at in vivamus egestas congue congue sit mi faucibus.",
  },
  experience: [
    {
      id: "exp-1",
      title: "Design Engineer",
      employmentType: "Full-time",
      company: "Provolo Inc",
      startMonth: "Jan",
      startYear: "2024",
      endMonth: "",
      endYear: "",
      currentlyWorking: true,
      location: "Lagos, Nigeria",
      description:
        "Lorem ipsum dolor sit amet consectetur. Rhoncus mi ornare blandit eu vestibulum scelerisque at si et nec. Lacus interdum mattis eget facilisis lorem duis nulla dolor sagittis. Semper velit ut ultrices scelerisque et posuere sit. Ti...",
    },
    {
      id: "exp-2",
      title: "Design Engineer",
      employmentType: "Full-time",
      company: "Provolo Inc",
      startMonth: "Jun",
      startYear: "2022",
      endMonth: "Dec",
      endYear: "2023",
      currentlyWorking: false,
      location: "Lagos, Nigeria",
      description:
        "Lorem ipsum dolor sit amet consectetur. Rhoncus mi ornare blandit eu vestibulum scelerisque at si et nec. Lacus interdum mattis eget facilisis lorem duis nulla dolor sagittis. Semper velit ut ultrices scelerisque et posuere sit. Ti...",
    },
    {
      id: "exp-3",
      title: "Design Engineer",
      employmentType: "Contract",
      company: "Provolo Inc",
      startMonth: "Mar",
      startYear: "2020",
      endMonth: "May",
      endYear: "2022",
      currentlyWorking: false,
      location: "Lagos, Nigeria",
      description:
        "Lorem ipsum dolor sit amet consectetur. Rhoncus mi ornare blandit eu vestibulum scelerisque at si et nec. Lacus interdum mattis eget facilisis lorem duis nulla dolor sagittis. Semper velit ut ultrices scelerisque et posuere sit. Ti...",
    },
  ],
  skills: [
    { id: "sk-1", name: "UX Research" },
    { id: "sk-2", name: "UI Design" },
    { id: "sk-3", name: "Wireframing" },
    { id: "sk-4", name: "Prototyping" },
    { id: "sk-5", name: "HTML" },
    { id: "sk-6", name: "React" },
    { id: "sk-7", name: "TypeScript" },
    { id: "sk-8", name: "Python" },
    { id: "sk-9", name: "JavaScript" },
    { id: "sk-10", name: "SQL" },
    { id: "sk-11", name: "Database Management" },
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Edinburgh",
      degree: "MSc Computer Science",
      fieldOfStudy: "Computer Science",
      startDate: "2026",
      endDate: "2027",
      grade: "",
      description: "",
    },
    {
      id: "edu-2",
      school: "Lagos State University",
      degree: "BSc Microbiology",
      fieldOfStudy: "Microbiology",
      startDate: "2016",
      endDate: "2021",
      grade: "",
      description: "",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Introduction to Python",
      issuingOrganization: "Buildspace",
      issueMonth: "",
      issueYear: "2025",
      expirationMonth: "",
      expirationYear: "",
      credentialId: "",
      credentialUrl: "",
    },
    {
      id: "cert-2",
      name: "Learn React: Introduction Course",
      issuingOrganization: "Codecademy",
      issueMonth: "",
      issueYear: "2023",
      expirationMonth: "",
      expirationYear: "",
      credentialId: "",
      credentialUrl: "",
    },
    {
      id: "cert-3",
      name: "Learn JavaScript: Function and Scope",
      issuingOrganization: "Codecademy",
      issueMonth: "",
      issueYear: "2023",
      expirationMonth: "",
      expirationYear: "",
      credentialId: "",
      credentialUrl: "",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "PoKo",
      description:
        "PoKo is a modern, real-time online polling platform that enables users to create, share, and vote on polls with instant result updates.",
      currentlyWorking: false,
      startMonth: "May",
      startYear: "2023",
      endMonth: "Feb",
      endYear: "2024",
      projectLink: "",
      files: [],
    },
    {
      id: "proj-2",
      title: "NewsToday",
      description:
        "A modern news feed application built with React that displays the latest headlines using the NEWSDATA.IO API.",
      currentlyWorking: false,
      startMonth: "Nov",
      startYear: "2023",
      endMonth: "",
      endYear: "",
      projectLink: "",
      files: [],
    },
  ],
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const currentYear = new Date().getFullYear();
export const YEARS = Array.from({ length: 30 }, (_, i) =>
  String(currentYear - i)
);

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Self-employed",
] as const;
