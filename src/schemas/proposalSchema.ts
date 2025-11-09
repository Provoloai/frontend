import { z } from "zod";

// Proposal form validation schema for React Hook Form
export const proposalFormSchema = z.object({
  clientName: z.string().min(1, "Client's name is required").max(100, "Name too long"),
  proposalTone: z.enum(["conversational", "professional", "confident", "calm"], {
    message: "Proposal tone is required",
  }),
  jobTitle: z.string().min(1, "Job title is required").max(200, "Job title too long"),
  jobSummary: z.string().min(50, "Job summary must be at least 50 characters").max(5000, "Job summary too long"),
});

// Type inference for form data
export type ProposalFormData = z.infer<typeof proposalFormSchema>;

