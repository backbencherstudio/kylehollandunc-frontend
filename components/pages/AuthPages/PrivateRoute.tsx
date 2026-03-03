"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
  allowGuest?: boolean; // ✅ NEW
};

export default function PrivateRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
  allowGuest = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, rehydrated, user } = useAppSelector(
    (state) => state.auth
  );

  // ✅ check guest token
  const guestToken =
    typeof window !== "undefined"
      ? localStorage.getItem("guest_token")
      : null;

  useEffect(() => {
    if (!rehydrated) return;

    const hasSession = isAuthenticated || guestToken;

    // ❌ No session at all
    if (!hasSession) {
      router.replace(
        `${redirectTo}?next=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // 🔐 If guest is NOT allowed but only real users
    if (!isAuthenticated && !allowGuest) {
      router.replace(
        `${redirectTo}?next=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // 🔐 Role restriction (only applies to logged users)
    if (
      isAuthenticated &&
      allowedRoles &&
      user &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      router.replace("/unauthorized");
    }
  }, [
    rehydrated,
    isAuthenticated,
    user,
    allowedRoles,
    router,
    pathname,
    redirectTo,
    guestToken,
    allowGuest,
  ]);

  if (!rehydrated) return null;

  const hasSession = isAuthenticated || guestToken;

  if (!hasSession) return null;

  if (!isAuthenticated && !allowGuest) return null;

  if (
    isAuthenticated &&
    allowedRoles &&
    user &&
    (!user.role || !allowedRoles.includes(user.role))
  ) {
    return null;
  }

  return <>{children}</>;
}