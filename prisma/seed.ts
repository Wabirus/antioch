import "dotenv/config";
import { PrismaClient, RoleName, PermissionKey } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log("🌱 Starting database seed...");

    // Create Roles
    const adminRole = await prisma.role.upsert({
        where: { id: "admin-role-id" },
        update: {},
        create: {
            id: "admin-role-id",
            name: RoleName.ADMIN,
        },
    });

    const staffRole = await prisma.role.upsert({
        where: { id: "staff-role-id" },
        update: {},
        create: {
            id: "staff-role-id",
            name: RoleName.STAFF,
        },
    });

    console.log("✅ Roles created:", { adminRole, staffRole });

    // Create Permissions
    const permissions = await Promise.all(
        Object.values(PermissionKey).map((key) =>
            prisma.permission.upsert({
                where: { id: `permission-${key}` },
                update: {},
                create: {
                    id: `permission-${key}`,
                    key: key,
                    description: `Permission to ${key.toLowerCase().replace(/_/g, " ")}`,
                },
            })
        )
    );

    console.log("✅ Permissions created:", permissions.length);

    // Assign all permissions to Admin role
    await Promise.all(
        permissions.map((permission) =>
            prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: adminRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            })
        )
    );

    console.log("✅ Admin role permissions assigned");

    // Create Admin User
    // IMPORTANT: This email MUST match the email you create in Supabase Auth
    const adminEmail = "admin@antioch.church"; // Change this to your admin email

    const adminUser = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: "Admin User",
            email: adminEmail,
            password: "supabase-managed", // Password is managed by Supabase Auth, not here
        },
    });

    // Assign Admin role to the user
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: adminUser.id,
                roleId: adminRole.id,
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            roleId: adminRole.id,
        },
    });

    console.log("✅ Admin user created:", adminUser.email);

    console.log("🎉 Database seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
