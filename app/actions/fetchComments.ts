/**
 * Fetches comments for a given question ID.
 * 
 * @param questionId - The ID of the question.
 * @returns An array of comments.
 */
"use server"

import prisma from "../libs/prismadb"
import { comment } from "./types"



export async function fetchComments(questionId: string) {
    const comments: comment[] = await prisma.comment.findMany({
        where: {
            questionId: questionId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    
    console.log("Comments:")
    console.log(comments)

    // iterate Comments to add the sender info from the user or client table
    for (let i = 0; i < comments.length; i++) {
        const sender = await prisma[comments[i].senderType].findUnique({
            where: {
                id: comments[i].senderId,
            },
        })
        comments[i].senderFullName = sender.firstName + " " + sender.lastName
        comments[i].senderImageUrl = sender.attributes.image_url
    }

    console.log(comments)

    return comments
    
}
