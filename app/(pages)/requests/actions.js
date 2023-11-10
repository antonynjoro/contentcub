"use server";

import prisma from "../../libs/prismadb";
import { auth } from '@clerk/nextjs';


export async function fetchRequests() {
    const { userId } = auth();

  const userWithRequests = await prisma.user.findUnique({
    where : {
      externalId: userId,
    },
    include: {
      requests: true,
    },
  });

  return userWithRequests? userWithRequests.requests : [];
}

export async function createRequest(userId, title) {
  // Create a new user in the database
  const request = await prisma.request.create({
    data: {
      title,
      user: {
        connect: {
          externalId: userId,
        },
      },
    },
  });

  return request;
}