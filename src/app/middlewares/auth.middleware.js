// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// // Define public routes that don't require authentication
// const publicRoutes = ["/auth/login", "/auth/register"];

// // Secret key for JWT verification
// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// export function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // Allow public routes to bypass the middleware
//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Get the token from cookies
//   const token = req.cookies.get("token")?.value;

//   // If no token is found, redirect to the login page
//   if (!token) {
//     const loginUrl = new URL("/auth/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   try {
//     // Verify the JWT token
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next(); // Allow access if the token is valid
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     const loginUrl = new URL("/auth/login", req.url);
//     return NextResponse.redirect(loginUrl); // Redirect if the token is invalid
//   }
// }

// // Apply the middleware to all routes
// export const config = {
//   matcher: "/((?!_next/static|_next/image|favicon.ico).*)", // Exclude static files
// };
