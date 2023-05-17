import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/util/crypto";
const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({});
    await prisma.trip.deleteMany({});
    await prisma.usersOnTrips.deleteMany({});

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

    const company = await prisma.company.create({
        data: {
            name: "Empresa de Turismo",
            users: {
                connect: [
                    { id: admin.id },
                    { id: manager.id },
                    { id: guide.id },
                ]
            }
        }
    });

    const trip = await prisma.trip.create({
        data: {
            name: "Compras em NYC",
            place: "5th Avenue e arredores",
            startDate: new Date("2021-10-01, 10:00:00"),
            endDate: new Date("2021-10-01, 18:00:00"),
            UsersOnTrips: {
                create: [
                    {
                        userId: tourist.id,
                    }
                ]
            },

            company: {
                connect: { id: company.id }
            }
        }
    });
    console.log(trip);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});