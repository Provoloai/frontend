import { auth } from "@/lib/firebase";

export const logout = async (): Promise<void> => {
  const NODE_ENV = (import.meta.env.VITE_NODE_ENV as string) || "";
  const SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) || "";

  const apiBase =
    NODE_ENV === "development" && SERVER_URL
      ? SERVER_URL.replace(/\/$/, "")
      : "/api";

  const url = `${apiBase}/auth/logout`;

  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(
        "Logout failed from backend",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (error) {
    console.error("Error communicating with backend logout:", error);
  } finally {
    // ALWAYS sign out of Firebase client-side
    await auth.signOut();
  }
};
