"use server";

import prisma from "../../../../libs/prismadb.jsx";

/**
 * Fetches a single request by ID.
 * @param requestId - The ID of the request to fetch.
 * @returns A Promise that resolves to the fetched Request object, or null if not found.
 */
export default async function fetchRequest(requestId: string): Promise<Request | null> {
    try {
    const request = prisma.request.findUnique({
    where: {
      id: requestId,
    },
   
  });

    if (!request) {
      return null;
    }

    return request;
} catch (error) {
    console.error(error);
    return null;
  }
}
