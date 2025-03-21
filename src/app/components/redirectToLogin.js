"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectToLogin() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/auth/login") {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, pathname]);

  return null;
}
