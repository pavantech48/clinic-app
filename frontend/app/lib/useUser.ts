export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

// =====================
// GET USER FROM STORAGE
// =====================
export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// =====================
// GET TOKEN
// =====================
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
};

// =====================
// SET LOGIN DATA
// =====================
export const setAuth = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

// =====================
// LOGOUT USER
// =====================
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};