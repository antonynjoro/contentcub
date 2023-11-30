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

    // Prisma transaction to delete questions then the request
    await prisma.$transaction(async (prisma) => {
      // Delete the questions associated with the request
      await prisma.question.deleteMany({
        where: {
          requestId,
        },
      });

      // Remove request from client
      // model Client {
      //   id        String   @id @default(auto()) @map("_id") @db.ObjectId
      //   externalId String?   @unique
      //   email     String   @unique
      //   firstName      String?
      //   lastName       String?
      //   requestIds  String[]  @db.ObjectId
      //   requests    Request[] @relation(fields: [requestIds], references: [id])
      //   user      User     @relation(fields: [userId], references: [id])
      //   userId    String   @map("userId") @db.ObjectId
      //   attributes Json?
      //   createdAt DateTime @default(now())
      //   updatedAt DateTime @updatedAt
      // }

      const client = await prisma.client.findFirst({
        where: {
          requestIds: {
            has: requestId
          }
        }
      });

      if (client) {
        await prisma.client.update({
          where: {
            id: client.id
          },
          data: {
            requestIds: {
              set: client.requestIds.filter((id) => id !== requestId)
            }
          }
        });
      }


      // Delete the request
      await prisma.request.delete({
        where: {
          id: requestId,
        },
      });

      return  
    }
    );
    
  } catch (error) {
    console.error(error);
    return null;
  }
}