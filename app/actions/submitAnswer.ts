"use server";
import prisma from "../libs/prismadb";
import { auth } from "@clerk/nextjs";

export default async function submitAnswer(
  requestId: string,
  questionId: string,
  answers: string[], // Array of answers
) {
  console.log("submitAnswer", requestId, questionId, answers);
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
      // Construct an array of answer objects
      const answerObjects = answers.length === 0 ? [] : answers.map((answer) => ({ value: answer }));
      console.log ("answerObjects", answerObjects);
      const savedAnswer = await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          // Use the 'push' operation to add new answers
          answers: {
            set: answerObjects,
          },
        },
      });
      console.log("savedAnswer", savedAnswer);
      console.log("Answers added to question: ", questionId);

      return savedAnswer;
    } else {

      // if the answer is empty, set the answers array to empty
      if (answers[0] === "") {
        answers = [];
      } else if (answers[0] === '{"type":"doc","content":[{"type":"paragraph"}]}') {
        // if the answer is empty, set the answers array to empty
        answers = [];
      }

      // Update the single answer (set the first answer in the array)
      const savedAnswer = await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          answers: {
            set: answers.length === 0 ? [] : [{ value: answers[0] }],
          },
        },
      });

      console.log("savedAnswer", savedAnswer);
      console.log(
        "Answer set as the most recent answer to question: ",
        questionId,
      );

      return savedAnswer;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
