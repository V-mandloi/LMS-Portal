"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/auth/login", "/auth/register"];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
      setIsAuthenticated(true);
      // if (pathname === "/") {
      //   router.push("/auth/login"); // Redirect to dashboard or main page
      // }
    } else {
      setIsAuthenticated(false);

      if (!publicRoutes.includes(pathname)) {
        router.push("/auth/login");
      }
    }

    setLoading(false);
  }, [router, pathname]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
    setIsAuthenticated(true);
    router.push("/auth/login"); // Redirect after successful login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
