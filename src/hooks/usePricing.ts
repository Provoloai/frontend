import { useState } from "react";
import { proSubscription } from "@/server/checkout";

export const usePricing = (user: any) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const checkout = async (polarRefId: string) => {
    setCheckoutLoading(true);
    setSubscriptionError("");
    try {
      const paymentUrl = await proSubscription(polarRefId, user);
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionError(
        "An error occurred during subscription. Please try again, if persists, contact support."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const clearError = () => {
    setSubscriptionError("");
  };

  return {
    checkoutLoading,
    subscriptionError,
    checkout,
    clearError,
  };
};
