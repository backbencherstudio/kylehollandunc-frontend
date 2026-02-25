"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PrivateRoute({ children, redirectTo = "/login" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const rehydrated = useAppSelector((state) => state.auth.rehydrated);

  useEffect(() => {
    if (!rehydrated) return; // wait for localStorage auth check
    if (!isAuthenticated) {
      router.replace(`${redirectTo}?next=${encodeURIComponent(pathname)}`);
    }
  }, [rehydrated, isAuthenticated, router, redirectTo, pathname]);

  // Wait for rehydration before deciding; prevent flashing protected UI
  if (!rehydrated || !isAuthenticated) return null;

  return <>{children}</>;
}