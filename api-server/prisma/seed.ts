import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/crypto";
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "Adminson",
            email: "admin@admin.com",
            password: await hashPassword("admin"),
            role: UserRole.Admin,
        }
    });
    console.log(admin);

    const manager = await prisma.user.create({
        data: {
            firstName: "Manager",
            lastName: "Managerson",
            email: "manager@manager.com",
            password: await hashPassword("manager"),
            role: UserRole.Manager,
        }
    });
    console.log(manager);

    const guide = await prisma.user.create({
        data: {
            firstName: "Guide",
            lastName: "Guideson",
            email: "guide@guide.com",
            password: await hashPassword("guide"),
            role: UserRole.Guide,
        }
    });
    console.log(guide);

    const tourist = await prisma.user.create({
        data: {
            firstName: "Tourist",
            lastName: "Touristson",
            email: "tourist@tourist.com",
            password: await hashPassword("tourist"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});