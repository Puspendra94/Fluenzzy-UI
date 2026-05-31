export type UserRole = "agency" | "brand" | "influencer";

export interface User {
  role: UserRole;
  email: string;
  currency: string;
}

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const getRoleBasedPath = (role: UserRole): string => {
  return `/${role}/dashboard`;
};

export const isValidRoleRoute = (
  userRole: UserRole,
  pathname: string
): boolean => {
  const rolePrefix = `/${userRole}/`;
  return pathname.startsWith(rolePrefix) || pathname === "/" || pathname === "/login" || pathname === "/signup";
};
