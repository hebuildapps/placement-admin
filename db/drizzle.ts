import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
config({ path: ".env" });
const databaseUrl = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";
export const db = drizzle(databaseUrl);
