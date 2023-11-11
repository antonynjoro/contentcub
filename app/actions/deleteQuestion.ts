"use server";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function deleteQuestion(requestId, questionId) {
  try {
    const request = await prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return null;

    // Remove the question and ensure each question has a valid 'answers' array
    const updatedQuestions = request.questions
      .filter(q => q.id !== questionId)
      .map(q => ({ ...q, answers: q.answers || [] })); // Provide a default empty array if answers is null

    // Update the request with the new questions array
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { questions: updatedQuestions },
    });

    return updatedRequest;
  } catch (error) {
    console.error(error);
    return null;
  }
}
