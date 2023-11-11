export type Question = {
    id: string;
    type: QuestionType;
    title: string;
    description?: string;
    answers: string[];
    createdAt: Date;
};

type QuestionType = keyof typeof PrismaQuestionType;


enum PrismaQuestionType {
    TEXT_SHORT = 'textShort',
    TEXT_LONG = 'textLong',
    IMAGE_UPLOAD = 'imageUpload',
    IMAGE_UPLOAD_MULTIPLE = 'imageUploadMultiple',
    FILE_UPLOAD = 'fileUpload',
}



