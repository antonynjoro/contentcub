"use server";

import prisma from "../../../../libs/prismadb.jsx";
import { RequestModel } from "../../../../types/requestTypes";


/**
 * Fetches a single request by ID and ensures that it is accessible 
 * only by the associated User or Client.
 * @param requestId - The ID of the request to fetch.
 * @param userId - The ID of the user attempting to access the request.
 * @returns A Promise that resolves to the fetched Request object, or null if not found or not accessible.
 */
export default async function fetchRequest(
  requestId: string,
  userId: string,
): Promise<RequestModel | null> {



  try {
    console.log("Fetching request:", requestId);
    console.log("User ID:", userId);
    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      include: {
        user: {
          select: {
            id: true,
            externalId: true,
          },
        },
        clients: {
          select: {
            id: true,
            externalId: true,
          },
        }, 
        questions: true
      },
    });

    console.log("Request:", JSON.stringify(request));

    // Check if the request exists and if the accessing user is the associated user or client
    if (!request || (request.user.externalId !== userId && 
      request.clients.every((client) => client.externalId !== userId))) {
      return null;
    }

    return request;
  } catch (error) {
    console.error("Error fetching request:", error);
    return null;
  }
}
