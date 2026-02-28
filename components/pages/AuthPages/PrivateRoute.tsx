// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";

// type Props = {
//   children: React.ReactNode;
//   redirectTo?: string;
// };

// export default function PrivateRoute({ children, redirectTo = "/login" }: Props) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
//   const rehydrated = useAppSelector((state) => state.auth.rehydrated);

//   useEffect(() => {
//     if (!rehydrated) return; // wait for localStorage auth check
//     if (!isAuthenticated) {
//       router.replace(`${redirectTo}?next=${encodeURIComponent(pathname)}`);
//     }
//   }, [rehydrated, isAuthenticated, router, redirectTo, pathname]);

//   // Wait for rehydration before deciding; prevent flashing protected UI
//   if (!rehydrated || !isAuthenticated) return null;

//   return <>{children}</>;
// }


"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
};

export default function PrivateRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, rehydrated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!rehydrated) return;

    // Not logged in
    if (!isAuthenticated) {
      router.replace(
        `${redirectTo}?next=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // Logged in but wrong role
    if (
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
  ]);

  if (!rehydrated) return null;
  if (!isAuthenticated) return null;

  if (
    allowedRoles &&
    user &&
    (!user.role || !allowedRoles.includes(user.role))
  ) {
    return null;
  }

  return <>{children}</>;
}