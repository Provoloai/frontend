import { z } from "zod";

// Zod schema for portfolio optimization response
export const portfolioResponseSchema = z.object({
  weaknessesAndOptimization: z.string().min(1, "Weaknesses analysis is required"),
  optimizedProfileOverview: z.string().min(1, "Optimized profile overview is required"),
  suggestedProjectTitles: z.string().min(1, "Project title suggestions are required"),
  recommendedVisuals: z.string().min(1, "Visual recommendations are required"),
  beforeAfterComparison: z.string().min(1, "Before/after comparison is required"),
});

// Input validation schema
export const portfolioInputSchema = z.object({
  freelancerName: z.string().min(1, "Name is required").max(100, "Name too long"),
  profileTitle: z.string().min(1, "Professional title is required").max(200, "Title too long"),
  profileDescription: z.string().min(50, "Description must be at least 50 characters").max(5000, "Description too long"),
});

// Validation helper functions
export const validatePortfolioInput = (data) => {
  const result = portfolioInputSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.format() };
};

export function parseJsonBlock(text) {
  if (!text) return null;
  // Remove code block markers and trim
  const cleaned = text
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export const validatePortfolioResponse = (data) => {
  try {
    // Try to parse as JSON first if it's a string
    const parsedData = typeof data === "string" ? parseJsonBlock(data) : data;
    const result = portfolioResponseSchema.safeParse(parsedData);

    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, errors: result.error.format() };
  } catch {
    return { success: false, errors: { _errors: ["Invalid JSON format"] } };
  }
};
