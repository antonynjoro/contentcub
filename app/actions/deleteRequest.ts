"use server";

import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

/*
 * Deletes a request
 */
export default async function deleteRequest(requestId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    console.log("Deleting request", requestId);
    const request = await prisma.request.delete({
      where: {
        id: requestId,
      },
    });
    return request;
  } catch (error) {
    console.error(error);
    return null;
  }
}