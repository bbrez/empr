import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/util/crypto";
const prisma = new PrismaClient();

async function main() {
    await prisma.usersOnTrips.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.trip.deleteMany({});
    await prisma.company.deleteMany({});

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

    const admin1 = await prisma.user.create({
        data: {
            firstName: "Bruno",
            lastName: "Castro",
            email: "bbrezolin@gmail.com",
            password: await hashPassword("abcdef"),
            role: UserRole.Admin,
        }
    });
    console.log(admin1);

    const admin2 = await prisma.user.create({
        data: {
            firstName: "Renan",
            lastName: "Hipolito",
            email: "rlhipolito@gmail.com",
            password: await hashPassword("ghijk"),
            role: UserRole.Admin,
        }
    });
    console.log(admin2);

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

    const manager1 = await prisma.user.create({
        data: {
            firstName: "Henrique",
            lastName: "Benitez",
            email: "henriquebf@hotmail.com",
            password: await hashPassword("geladeira1"),
            role: UserRole.Manager,
        }
    });
    console.log(manager1);

    const manager2 = await prisma.user.create({
        data: {
            firstName: "Marcelo",
            lastName: "Amador",
            email: "marceloamador@gmail.com",
            password: await hashPassword("geladeira2"),
            role: UserRole.Manager,
        }
    });
    console.log(manager2);

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

    const guide1 = await prisma.user.create({
        data: {
            firstName: "Igor",
            lastName: "Kohnlein",
            email: "igorturismo@gmail.com",
            password: await hashPassword("geladeira3"),
            role: UserRole.Guide,
        }
    });
    console.log(guide1);

    const guide2 = await prisma.user.create({
        data: {
            firstName: "Andreia",
            lastName: "Gomes",
            email: "agomes@hotmail.com",
            password: await hashPassword("geladeira4"),
            role: UserRole.Guide,
        }
    });
    console.log(guide2);

    const guide3 = await prisma.user.create({
        data: {
            firstName: "Luan",
            lastName: "Oliveira",
            email: "luanhos@gmail.com",
            password: await hashPassword("geladeira5"),
            role: UserRole.Guide,
        }
    });
    console.log(guide3);

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

    const tourist1 = await prisma.user.create({
        data: {
            firstName: "Leonardo",
            lastName: "Freitas",
            email: "leonardobfritas@gmail.com",
            password: await hashPassword("geladeira"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist1);

    const tourist2 = await prisma.user.create({
        data: {
            firstName: "Raphael",
            lastName: "Scherpinski",
            email: "raphaelbrandao@gmail.com",
            password: await hashPassword("geladeira6"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist2);

    const tourist3 = await prisma.user.create({
        data: {
            firstName: "Pedro",
            lastName: "Ricardo",
            email: "pedrinho@gmail.com",
            password: await hashPassword("geladeira7"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist3);

    const tourist4 = await prisma.user.create({
        data: {
            firstName: "Cesar",
            lastName: "Borba",
            email: "acegomes27@gmail.com",
            password: await hashPassword("geladeira8"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist4);

    const tourist5 = await prisma.user.create({
        data: {
            firstName: "Wesner",
            lastName: "Ferreira",
            email: "wesner@gmail.com",
            password: await hashPassword("geladeira9"),
            role: UserRole.Tourist,
        }
    });
    console.log(tourist5);

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

    const company1 = await prisma.company.create({
        data: {
            name: "Golfinho Tour",
            users: {
                connect: [
                    { id: admin1.id },
                    { id: manager2.id },
                    { id: guide1.id },
                    { id: guide2.id },
                ]
            }
        }
    });

    const company2 = await prisma.company.create({
        data: {
            name: "Empresa de Turismo",
            users: {
                connect: [
                    { id: admin2.id },
                    { id: manager1.id },
                    { id: guide3.id },
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

    const trip1 = await prisma.trip.create({
        data: {
            name: "Passeio no Centro de Foz do Iguacu",
            place: "Avenida Brasil",
            startDate: new Date("2023-05-02, 10:00:00"),
            endDate: new Date("2023-05-02, 18:00:00"),
            UsersOnTrips: {
                create: [
                    { userId: tourist1.id },
                    { userId: tourist2.id },
                    { userId: tourist3.id },
                    { userId: guide1.id },
                ]
            },

            company: {
                connect: { id: company1.id }
            }
        }
    });
    console.log(trip1);

    const trip2 = await prisma.trip.create({
        data: {
            name: "Passeio Livre nas Cataratas do Iguaçu",
            place: "Cataratas do Iguaçu",
            startDate: new Date("2021-10-01, 10:00:00"),
            endDate: new Date("2021-10-01, 18:00:00"),
            UsersOnTrips: {
                create: [
                    { userId: tourist3.id },
                    { userId: tourist4.id },
                    { userId: tourist5.id },
                    { userId: guide1.id },
                    { userId: guide2.id },
                ]
            },

            company: {
                connect: { id: company1.id }
            }
        }
    });
    console.log(trip2);

    const trip3 = await prisma.trip.create({
        data: {
            name: "Passeio Livre no Magic Kingdom",
            place: "Disney World - Orlando",
            startDate: new Date("2021-10-01, 10:00:00"),
            endDate: new Date("2021-10-01, 18:00:00"),
            UsersOnTrips: {
                create: [
                    { userId: tourist1.id },
                    { userId: tourist3.id },
                    { userId: tourist5.id },
                    { userId: guide3.id },
                ]
            },

            company: {
                connect: { id: company2.id }
            }
        }
    });
    console.log(trip3);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});