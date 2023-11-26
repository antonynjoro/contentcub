"use server";

import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

/*
    * Remove a client from a request
*/
export default async function removeClientFromRequest(
  requestId: string,
  clientId: string
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    console.log(`Removing client ${clientId} from request ${requestId}`);
    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        requests: {
          disconnect: {
            id: requestId,
          },
        },
      },
    });
    return client;
  } catch (error) {
    console.error(error);
    return null;
  }
}