"use server"
import prisma from "../libs/prismadb";

export default async function submitAnswer(
  requestId: string,
  questionId: string,
  answer: string,
) {
    console.log("submitAnswer", requestId, questionId, answer)
    try {

        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            }
        });

        //if its a multianswer push, if its a single answer set
        if (question.multiAnswer) {
            const savedAnswer = await prisma.question.update({
                where: {
                    id: questionId,
                },
                data: {
                    answers: {
                        push : {
                            value: answer,
                        },
                    }
                },
            });
            console.log("savedAnswer", savedAnswer)
            console.log("Answer added to question: ", questionId)

            return savedAnswer;

        } else {
            const savedAnswer = await prisma.question.update({
                where: {
                    id: questionId,
                },
                data: {
                    answers: {
                        set : {
                            value: answer,
                        },
                    }
                },
            });

            console.log("savedAnswer", savedAnswer)
            console.log("Answer set as only answer to question: ", questionId)

            return savedAnswer;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }

}
