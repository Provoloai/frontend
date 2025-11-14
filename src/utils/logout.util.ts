export const logout = async () => {
  await fetch(`/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
