"use client";

import { useAuth } from "@/app/context/authContext";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Define public routes
  const publicRoutes = ["/auth/login", "/auth/register"];

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Allow rendering for public routes
  if (publicRoutes.includes(pathname)) {
    return children;
  }

  // Block rendering for protected routes if not authenticated
  if (!isAuthenticated) {
    return null; // Redirection is handled in `AuthProvider`
  }

  return children;
}
