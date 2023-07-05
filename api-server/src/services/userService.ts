import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import { comparePassword, hashPassword } from "../util/crypto";
import { createAccessToken } from "../middleware/authentication";

const prisma = new PrismaClient();

type CreateUserPayload = Omit<Prisma.UserGetPayload<{}>, 'id' | 'role' | 'currentLocation' | 'createdAt' | 'updatedAt'>;
type LoginPayload = Pick<Prisma.UserGetPayload<{}>, 'email' | 'password'>;

export namespace UserService {
    export const createUser = async (user: CreateUserPayload) => {
        user.password = await hashPassword(user.password);

        const createdUser = await prisma.user.create({
            data: user,
        });

        return { ...createdUser, password: undefined };
    }

    export const createUserWithRole = async (user: CreateUserPayload & { role: UserRole }) => {
        user.password = await hashPassword(user.password);

        let createdUser = await prisma.user.create({
            data: {
                ...user,
                companyId: undefined,
                company: !!user.companyId ? {
                    connect: {
                        id: user.companyId,
                    }
                } : undefined,
            }
        })

        return { ...createdUser, password: undefined };
    }

    export const userByEmail = async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    export const login = async (info: LoginPayload) => {
        const user = await userByEmail(info.email);

        if (!user) {
            throw new Error('❌  Invalid email or password');
        }

        const isPasswordCorrect = await comparePassword(info.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('❌  Invalid email or password');
        }

        const token = createAccessToken(user);

        return { token, user: { ...user, password: undefined } };
    }
}