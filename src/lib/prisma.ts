import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const prismaClientSingleton = () => {
  const pool = new Pool({
    connectionString,
    max: Number(process.env.DB_POOL_MAX ?? 10),
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

/** Satu instance per isolate (penting di Vercel/serverless + dev HMR) */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
globalForPrisma.prisma = prisma;

export { prisma };

