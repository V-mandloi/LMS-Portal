/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    // API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
