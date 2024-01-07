import { RequestModel } from "./requestTypes";
import { User } from "./userTypes";
import { Client } from "./clientTypes";
import { comment } from "./commentTypes";

export type Question = {
    id: string;
    requestId?: string;
    request?: RequestModel; // To be defined
    type: PrismaQuestionType;
    title: string;
    description?: string;
    multiAnswer?: boolean;
    answers: string[]; // Adjust if needed
    comments: comment[]; // Already defined
    createdAt: Date;
  };
  



enum PrismaQuestionType {
    TEXT_SHORT = 'textShort',
    TEXT_LONG = 'textLong',
    IMAGE_UPLOAD = 'imageUpload',
    IMAGE_UPLOAD_MULTIPLE = 'imageUploadMultiple',
    FILE_UPLOAD = 'fileUpload',
}



