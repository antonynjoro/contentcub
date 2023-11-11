"use server";

import { Question } from '../(pages)/requests/(Single Request Page)/[requestId]/types';
import prisma from "../libs/prismadb.jsx";



export default async function saveQuestion(requestId: string, question: Question) {
    console.log("Saving questions for request");
    console.log("Request ID: " + requestId);
    console.log("Question: " + JSON.stringify(question));


    
    try {
        const savedQuestions = await prisma.request.update({
            where: {
                id: requestId,
            },
            
            data: {
                questions: {
                    push: {
                        type: question.type,
                        title: question.title,
                        description: question.description,


                    },
                },
            },
        });

        return savedQuestions;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
