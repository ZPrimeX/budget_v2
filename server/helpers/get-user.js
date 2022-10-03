import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export const getUser = async (req) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, serverRuntimeConfig.secret)

    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            include: {
                Wallet: true
            }
        })
        return { user: foundUser, token: token }
    } catch (error) {
        return { message: "error", description: error }
    }
}