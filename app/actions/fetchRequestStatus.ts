"use server";

import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

/*
 * Fetches the status of a request
 */
export default async function fetchRequestStatus(requestId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      select: {
        status: true,
      },
    });

    console.log("Fetching request status", request);

    if (!request) {
      throw new Error("Request not found");
    }

    return request.status;
  } catch (error) {
    console.error(error);
    return null;
  }
}
