"use server";
import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";
import { sendEmail } from "./sendEmail";
import { InviteEmailTemplate } from "../components/emailTemplates";

export default async function sendRequest(
  requestId: string,
  clientEmail: string,
) {
  try{
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
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
    
    //check if client is already in the request
    const clientIds = request.clientIds;
    if (clientIds.includes(client.id)) {
      throw new Error(`Client ${client.id} of email ${client.email} is already in the request ${requestId}`);
    } else {
    // Update request by adding this client to its client list
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        clientIds: {
          push: client.id,
        },
        status: {
          set: "sent",
        },
      },
    });
    }

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

  // Send email to client
  await sendEmail(
    clientEmail,
    "ContentCub <hi@contentcub.co>",
    "You've been invited to ContentCub",
    InviteEmailTemplate,
    {
      userFirstName: user.firstName,
      requestTitle: request.title,
      inviteLink: `${process.env.NEXT_PUBLIC_BASE_URL}/checklists/${requestId}/submit`,
    }
  );

  return "OK";

  } catch (error) {
    console.error("Failed to send request:", error);
    throw error;
  }
  
}
