import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3002,
  apiServiceUrl: process.env.API_SERVICE_URL || "http://localhost:3001",
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  nodeEnv: process.env.NODE_ENV || "development",
};