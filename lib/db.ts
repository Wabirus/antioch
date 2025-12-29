import { PrismaClient } from "@/lib/generated/prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
