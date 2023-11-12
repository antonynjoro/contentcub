"use server";

import prisma from "../../../../libs/prismadb.jsx";


/**
 * Fetches a single request by ID and ensures that it is accessible 
 * only by the associated User or Client.
 * @param requestId - The ID of the request to fetch.
 * @param userID - The ID of the user attempting to access the request.
 * @returns A Promise that resolves to the fetched Request object, or null if not found or not accessible.
 */
export default async function fetchRequest(
  requestId: string,
  userID: string,
): Promise<Request | null> {



  try {
    console.log("Fetching request:", requestId);
    console.log("User ID:", userID);
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
        client: {
          select: {
            id: true,
            externalId: true,
          },
        }
      },
    });

    console.log("Request:", JSON.stringify(request));

    // Check if the request exists and if the accessing user is the associated user or client
    if (!request || (request.user.externalId !== userID && request.client?.externalId !== userID)) {
      return null;
    }

    return request;
  } catch (error) {
    console.error("Error fetching request:", error);
    return null;
  }
}
