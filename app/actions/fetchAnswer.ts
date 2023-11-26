"use server"
import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

export default async function fetchAnswer(requestId:string, questionId:string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    
    const question = await prisma.question.findUnique({
        where: {
            id: questionId,
        },
        select: {
            answers: {
            select: {
                value: true,
            },
            },
        },
        });
    return question;
  } catch (error) {
    console.error(error);
    return null;
  }
}