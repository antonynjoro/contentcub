export type comment = {
    id: string;
    commentText: string;
    createdAt: Date;
    updatedAt: Date;
    senderId: string;
    senderFullName: string;
    senderImageUrl: string;
    senderType: "client" | "user"; 
    questionId: string;
    question: any; // Replace with the correct type for Question
};
