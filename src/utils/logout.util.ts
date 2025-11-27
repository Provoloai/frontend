export const logout = async (): Promise<void> => {
  const NODE_ENV = (import.meta.env.VITE_NODE_ENV as string) || "";
  const SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) || "";

  const apiBase =
    NODE_ENV === "development" && SERVER_URL
      ? SERVER_URL.replace(/\/$/, "")
      : "/api";

  const url = `${apiBase}/auth/logout`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    console.error(
      "Logout failed",
      res.status,
      await res.text().catch(() => "")
    );
    throw new Error("Logout failed");
  }
};
