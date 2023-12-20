"use server";
import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

export default async function submitAnswer(
  requestId: string,
  questionId: string,
  answers: string[], // Array of answers
  metadataObjects: JSON[]  // Array of metadata objects (one for each answer)
) {
  console.log("submitAnswer", requestId, questionId, answers, metadataObjects);

  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (question.multiAnswer) {
      const answerObjectsWithMetadata = answers.map((answer, index) => ({
        value: answer,
        metadata: metadataObjects[index] || {},
      }));
      console.log("answerObjectsWithMetadata", answerObjectsWithMetadata);

      const savedAnswer = await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          answers: {
            set: answerObjectsWithMetadata,
          },
        },
      });

      console.log("savedAnswer", savedAnswer);
      return savedAnswer;
    } else {
      const singleAnswer = {
        value: answers.length > 0 ? answers[0] : "",
        metadata: metadataObjects.length > 0 ? metadataObjects[0] : {},
      };

      const savedAnswer = await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          answers: {
            set: [singleAnswer],
          },
        },
      });

      console.log("savedAnswer", savedAnswer);
      return savedAnswer;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
