"use server"
import prisma from "../libs/prismadb";

export default async function fetchAnswer(requestId:string, questionId:string) {
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