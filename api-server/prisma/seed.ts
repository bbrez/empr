import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/crypto";
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.create({
        data: {
            firstName: "Bruno",
            lastName: "Brezolin",
            email: "bbrezolin@hotmail.com",
            password: await hashPassword("batata123"),
            role: UserRole.Admin,
        }
    });
    console.log(admin);
}