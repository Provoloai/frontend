import { FAQ } from "@/types/liveChat";

export const FAQs: FAQ[] = [
  {
    id: 1,
    question: "What is Provolo?",
    answer:
      "Provolo is an AI-powered tool helping freelancers stand out and land more clients through smarter profile optimization and AI-generated proposals. It analyzes your skills, writing tone, and past work to help you present a polished, high-converting freelance profile.",
  },
  {
    id: 2,
    question: "Can Provolo help me write proposals for Upwork jobs?",
    answer:
      "Yes! Provolo includes an AI-powered proposal generator that helps you craft personalized, confident, and high-converting proposals tailored to each job post. You can also customize tone and structure before sending.",
  },
  {
    id: 3,
    question: "What if I don't know what my Upwork title or tags should be?",
    answer:
      "Provolo analyzes your experience and suggests optimized job titles, categories, and skill tags that align with what clients search for. This ensures your profile ranks better and attracts relevant opportunities.",
  },
  {
    id: 4,
    question: "Does Provolo only work for Upwork?",
    answer:
      "Currently, Provolo is optimized for Upwork. However, we're actively working on expanding support to other platforms like Fiverr, Toptal, and Freelancer.com.",
  },
  {
    id: 5,
    question: "Is my data safe with Provolo?",
    answer:
      "Yes. We take privacy seriously. Your data is encrypted and never shared with third parties. All information you enter is stored securely and used solely to enhance your experience inside Provolo.",
  },
  {
    id: 6,
    question: "Can I edit or customize what the AI generates?",
    answer:
      "Of course! Everything Provolo generates is fully editable. You can tweak, rewrite, or personalize any section before saving or exporting — you're always in control.",
  },
];

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/rtf",
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/webm",
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
export const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB total
export const MAX_FILE_COUNT = 5;

