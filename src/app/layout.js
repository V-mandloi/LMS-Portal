import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/authContext";
import ProtectedRoute from "@/app/components/protectedroute";
import Navbar from "./navbar/page";
import RedirectToLogin from "@/app/components/redirectToLogin";
import ToastProvider from "@/app/components/showToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LMS Portal",
  description: "A learning management system for educational content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider />
          <RedirectToLogin />
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-800">
              <ProtectedRoute>{children}</ProtectedRoute>
            </main>

            <footer className="bg-gray-800 text-white py-3 text-center">
              © 2025 LMS Portal. All Rights Reserved.
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
