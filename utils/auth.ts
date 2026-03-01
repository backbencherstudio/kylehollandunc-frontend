"use client";
import { useRouter } from "next/navigation";

export const getStoredUser = () => {
    if (typeof window === "undefined") return null;
  
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
  
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  };
  
  export const getUserRole = (): string | null => {
    const user = getStoredUser();
    return user?.role ?? null;
  };


  export const getLoginPathByRole = (role: string | null): string => {
    if (role === "admin") return "/admin-login";
    return "/login";
  };

  export const useRoleRedirect = () => {
    const router = useRouter();
  
    const redirectToLoginByRole = () => {
      const role = getUserRole();
      const path = getLoginPathByRole(role);
      router.replace(path);
    };
  
    return { redirectToLoginByRole };
  };