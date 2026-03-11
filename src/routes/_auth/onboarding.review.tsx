import { createFileRoute } from "@tanstack/react-router";
import OnboardingReview from "../../pages/auth/OnboardingReview";

export const Route = createFileRoute("/_auth/onboarding/review")({
  component: OnboardingReview,
});
