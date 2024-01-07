

"use server"
import prisma from "../libs/prismadb"
import { comment } from "../types/commentTypes"
import { fetchComments } from "./fetchComments"

type commentInput = {
    commentText: string;
    senderId: string;
    senderType: "client" | "user";
    questionId: string;
};

/**
 * Posts a comment to the server.
 * 
 * @param comment - The comment object containing the text, senderId, senderType, and questionId.
 * @returns A Promise that resolves to an array of comments including the newly posted comment.
 */
export default async function postCommentToServer(comment: commentInput) {
    console.log("Posting comment:")
    console.log(comment)
    const newComment:comment = await prisma.comment.create({
        data: {
            commentText: comment.commentText,
            senderId: comment.senderId,
            senderType: comment.senderType,
            questionId: comment.questionId,
        },
    })

    console.log("New comment:")
    console.log(newComment)

    // fetch the comments again to get the new comment
    const comments = await fetchComments(comment.questionId)

    return comments
}