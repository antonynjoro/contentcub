"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteQuestion(
  requestId: string,
  questionId: string,
) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.comment.deleteMany({
        where: {
          questionId: questionId,
        },
      });

      const deletedQuestion = await prisma.question.delete({
        where: {
          id: questionId,
        },
      });
      return deletedQuestion;
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
