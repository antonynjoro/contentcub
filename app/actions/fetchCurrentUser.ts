"use server"

import prisma from "../libs/prismadb"


/**
 * Fetches the current user or client based on the provided external ID.
 * 
 * @param externalId - The external ID of the user or client.
 * @returns The user or client object containing type and id if found, otherwise null.
 */
export default async function fetchCurrentUser(externalId: string) {
    const user = await prisma.user.findUnique({
        where: {
            externalId: externalId,
        },
        select : {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },

    })

    if (user) {
        return {
            type: "user",
            ...user,
        }
    }

    const client = await prisma.client.findUnique({
        where: {
            externalId: externalId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    })

    if (client) {
        return {
            type: "client",
            ...client,
            
        }
    }

    return null
}