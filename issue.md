# Documentation / PR Description
## Issue
- Prisma 7 introduced breaking changes for datasource configuration:
    - Schema Validation: The url property is no longer allowed within the datasource block in schema.prisma when using the new configuration style.
    - Client Initialization: The PrismaClient constructor now enforces passing configuration arguments (like datasourceUrl or an adapter) explicitly, whereas previously it could infer them or default to empty.

## Fix Implemented
Client Initialization (lib/db.ts): Updated the PrismaClient instantiation to explicitly provide the connection string from environment variables:
```typescript
new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});
```
Schema Configuration (prisma/schema.prisma): Ensured the datasource block only defines the provider, deferring URL configuration to prisma.config.ts (for CLI/Migrate) and the client constructor (for Runtime).

## Verification
    - Build: `npx prisma generate` should now succeed without P1012 validation errors.
    - Runtime: The application should successfully connect to the database without throwing "Expected 1 arguments, but got 0"