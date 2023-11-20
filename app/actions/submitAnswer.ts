"use server";
import prisma from "../libs/prismadb";

export default async function submitAnswer(
  requestId: string,
  questionId: string,
  answers: string[], // Array of answers
) {
  console.log("submitAnswer", requestId, questionId, answers);
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (question.multiAnswer) {
      // Construct an array of answer objects
      const answerObjects = answers.map((answer) => ({ value: answer }));
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
      // Update the single answer (set the first answer in the array)
      const savedAnswer = await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          answers: {
            set: [{ value: answers[answers.length - 1] }], // Set the last answer in the array
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
