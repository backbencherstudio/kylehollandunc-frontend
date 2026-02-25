"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials, setRehydrated } from "@/redux/features/auth/authSlice";
import { getStorageItem } from "@/utils/storage";
import type { User } from "@/redux/features/auth/types";

/**
 * On mount, reads token and user from localStorage and restores Redux auth state.
 * PrivateRoute waits for rehydrated before redirecting, so refresh/new tab keeps login.
 */
export default function AuthRehydrate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getStorageItem("token");
    const userStr = getStorageItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        if (user?.id != null && user?.email && user?.name) {
          dispatch(setCredentials({ user, token }));
        }
      } catch {
        // ignore invalid stored user
      }
    }

    dispatch(setRehydrated());
  }, [dispatch]);

  return null;
}
