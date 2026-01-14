import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log("Testing database connection...");
    console.log("URL:", process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':***@'));

    try {
        await prisma.$connect();
        console.log("✅ Successfully connected to the database!");

        // Try to query something simple, or just check generic connectivity
        try {
            const count = await prisma.user.count();
            console.log(`Found ${count} users.`);
        } catch (e) {
            console.log("Could not count users (tables might not exist yet), but connection established.");
            console.error(e);
        }

    } catch (e: any) {
        console.error("❌ Connection failed!");
        console.error("Error Name:", e.name);
        console.error("Error Message:", e.message);
        console.error("Error Code:", e.code);
        if (e.meta) console.error("Meta:", e.meta);
    } finally {
        await prisma.$disconnect();
    }
}

main();
