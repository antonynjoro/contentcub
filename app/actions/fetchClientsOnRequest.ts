"use server";

import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";


/*
    * Fetches all clients attached to a request
*/ 
export default async function fetchClientsOnRequest(requestId:string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }
    try {
        console.log(`Fetching clients on request ${requestId}`)
        const clients = await prisma.client.findMany({
            where: {
                requests: {
                    some: {
                        id: requestId,
                    },
                },
            },
        });
        return clients;
    } catch (error) {
        console.error(error);
        return null;
    }
}