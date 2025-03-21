"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/auth/login", "/auth/register"];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("virkam", token);

    if (token) {
      setUser({ token });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (!token && pathname === "/auth/register") {
      router.replace("/auth/register");
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.replace("/auth/login") || router.replace("/auth/register");
    } else if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.replace("/"); // Redirect logged-in user to home page
    }
  }, [isAuthenticated, pathname]);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setUser({ token });
    setIsAuthenticated(true);
    router.push("/"); // Redirect after successful login
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
