import {PrismaClient} from'@prisma/client'

declare global {
    var prisma: PrismaClient |undefined
}


//used to prevent initializing of a new prisma client each time nextjs hot reloads
export const db = globalThis.prisma || new PrismaClient();


if(process.env.NODE_ENV !== 'production') globalThis.prisma = db