import { PrismaClient } from "@prisma/client";

let prisma;
const _global = global

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!_global.prisma) {
        _global.prisma = new PrismaClient()
    }
    prisma = _global.prisma
}

export default prisma;