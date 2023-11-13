"use server";
import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

export default async function sendRequest(
  requestId: string,
  clientEmail: string,
) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // find user
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  // Check if user exists
  if (!user) {
    throw new Error("User not found");
  }

  // find request
  const request = await prisma.request.findUnique({
    where: {
      id: requestId,
      user: {
        externalId: userId,
      },
    },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // find or create client
    let client = await prisma.client.findUnique({
      where: {
        email: clientEmail,
      },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          email: clientEmail,
          user: {
            connect: {
              externalId: userId,
            },
          },
        },
      });
    }

    // Add the client to the User's client list
    await prisma.user.update({
      where: {
        externalId: userId,
      },
      data: {
        clients: {
          connect: {
            id: client.id,
          },
        },
      },
    });
    

    // Update request by adding this client to its client list
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        clientIds: {
          push: client.id,
        },
      },
    });

    // Optionally, update client to link back to this request
    await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        requestIds: {
          push: requestId,
        },
      },
    });


  });

  // TODO: send email to client
}
