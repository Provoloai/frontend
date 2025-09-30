// Types matching backend Go structs
export type RecurringInterval = "daily" | "weekly" | "monthly";
export type PlanRecurringInterval = "monthly";
export type FeatureSlug =
  | "profile_optimizer"
  | "ai_proposal_credit"
  | "ai_proposals_unlimited"
  | "linkedin_profile_optimizer"
  | "priority_support"
  | "resume_generator"
  | "advanced_ai_insights"
  | "early_access_features"
  | "direct_support_chat"
  | "standard_support";

export interface Feature {
  name: string;
  description: string;
  slug: FeatureSlug;
  limited: boolean;
  maxQuota: number;
  recurringInterval: RecurringInterval;
}

export interface Tier {
  name: string;
  slug: string;
  polarRefId: string;
  price: number;
  description: string;
  recurringInterval: PlanRecurringInterval;
  features: Feature[];
  createdAt: string; // ISO date string from JSON
  updatedAt: string; // ISO date string from JSON
}

interface APIResponse<T = any> {
  title: string;
  message: string;
  status: string;
  data: T;
  error?: string;
}

// API function to fetch tiers
export const fetchTiers = async (): Promise<Tier[]> => {
  const serverUrl = import.meta.env.VITE_SERVER_URL as string;

  if (!serverUrl) {
    console.error("VITE_SERVER_URL not configured in environment variables");
    throw new Error("Service temporarily unavailable. Please try again later.");
  }

  try {
    const response = await fetch(`${serverUrl}/payment/tiers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error("Unable to load pricing information. Please try again later.");
    }

    const result: APIResponse<Tier[]> = await response.json();

    if (result.status !== "success") {
      console.error("API returned error:", result.error || result.message);
      throw new Error("Unable to load pricing information. Please try again later.");
    }

    return result.data;
  } catch (error) {
    // Log the actual error for debugging
    console.error("Error fetching tiers:", error);

    // If it's already a user-friendly error, re-throw it
    if (error instanceof Error && error.message.includes("Unable to load")) {
      throw error;
    }

    // For network errors or other unexpected errors, show generic message
    throw new Error("Unable to load pricing information. Please check your connection and try again.");
  }
};
