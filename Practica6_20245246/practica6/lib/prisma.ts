import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = (() => {
  return globalForPrisma.prisma ??
    new PrismaClient({
      adapter: new PrismaPg(
        new Pool({
          connectionString: process.env.DATABASE_URL,
        })
      ),
      log: ["query", "error", "warn"],
    });
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
