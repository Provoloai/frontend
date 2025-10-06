import { Polar } from "@polar-sh/sdk";

const POLAR_ACCESS_TOKEN = import.meta.env?.VITE_POLAR_ACCESS_TOKEN || "";
const POLAR_ORG_ID = import.meta.env?.VITE_POLAR_ORG_ID || "";

const polar = new Polar({
  server: "sandbox",
  accessToken: POLAR_ACCESS_TOKEN,
});

// Minimal shape of the user object we rely on here
interface SessionUser {
  userId?: string;
  email?: string;
  polarId?: string;
}

export const proSubscription = async (polarRefId: string, user: SessionUser) => {
  console.log(user);
  if (!polarRefId)
    throw new Error("No subscription ref ID provided, if error persists, contact support.");
  if (!user || !user.userId || !user.email)
    throw new Error("You must be logged in to subscribe, if error persists, contact support.");
  const checkoutData: any = {
    products: [polarRefId],
    metadata: {
      user_id: user.userId,
    },
    customer_id: user.polarId,
    customerEmail: user.email,
  };
  const checkout = await polar.checkouts.create(checkoutData);
  console.log("Checkout created:", checkout);
  return checkout.url;
};

// Create (or reuse) a customer session to access the Polar customer portal
export const getCustomerPortalUrl = async (user: SessionUser) => {
  if (!user) throw new Error("Not authenticated");
  if (!user.polarId) throw new Error("No Polar customer ID associated with this account.");

  try {
    const session = await polar.customerSessions.create({
      customerId: user.polarId,
    });
    const portalUrl = (session as any)?.customerPortalUrl || (session as any)?.url;
    if (!portalUrl) throw new Error("Unable to retrieve customer portal URL.");
    return portalUrl;
  } catch (err) {
    console.error("Failed to create Polar customer session:", err);
    throw new Error("Could not open subscription portal. Please try again later.");
  }
};
