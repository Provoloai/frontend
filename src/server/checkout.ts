import { apiRequest } from "@/api";

// Minimal shape of the user object we rely on here
interface SessionUser {
  userId?: string;
  email?: string;
  polarId?: string;
}

export const proSubscription = async (
  polarRefId: string,
  user: SessionUser
) => {
  if (!polarRefId)
    throw new Error(
      "No subscription ref ID provided, if error persists, contact support."
    );
  if (!user || !user.userId || !user.email)
    throw new Error(
      "You must be logged in to subscribe, if error persists, contact support."
    );
  const response = await apiRequest<{ data?: { url?: string } }>(
    "/payment/checkout-session",
    {
      method: "POST",
      body: JSON.stringify({ polarRefId }),
    }
  );
  const checkoutUrl = response?.data?.url;
  if (!checkoutUrl) {
    throw new Error("Unable to create checkout session.");
  }
  return checkoutUrl;
};

// Create (or reuse) a customer session to access the Polar customer portal
export const getCustomerPortalUrl = async (user: SessionUser) => {
  if (!user) throw new Error("Not authenticated");

  try {
    const response = await apiRequest<{ data?: { url?: string } }>(
      "/payment/customer-portal-session",
      {
        method: "POST",
      }
    );
    const portalUrl = response?.data?.url;
    if (!portalUrl) throw new Error("Unable to retrieve customer portal URL.");
    return portalUrl;
  } catch (err) {
    console.error("Failed to create Polar customer session:", err);
    throw new Error(
      "Could not open subscription portal. Please try again later."
    );
  }
};
