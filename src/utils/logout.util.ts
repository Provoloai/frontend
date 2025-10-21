export const logout = async () => {
  await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
