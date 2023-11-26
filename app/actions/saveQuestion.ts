"use server";

import { Question } from '../(pages)/checklists/(Single Request Page)/[requestId]/types';
import prisma from "../libs/prismadb.jsx";
import { auth } from "@clerk/nextjs";



export default async function saveQuestion(requestId: string, question: Question) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }
    
    console.log("Saving questions for request");
    console.log("Request ID: " + requestId);
    console.log("Question: " + JSON.stringify(question));

    if( question.type == "imageUploadMultiple") {
        question = { ...question, multiAnswer: true };
    }


    
    try {
        // Create the question
        const newQuestion = await prisma.question.create({
            data: {
                ...question,
                request: {
                    connect: { id: requestId },
                },
            },
        });

        console.log("Question created:", newQuestion);
        return newQuestion;
    } catch (error) {
        console.error("Error saving question:", error.message);
        return null;
    }
}