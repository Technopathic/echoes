import type { NextConfig } from "next";

const env = {
  PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL
}

const nextConfig: NextConfig = {
  env,
  async headers() {
    return [{
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
      ]
    }]
  }
};

export default nextConfig;
