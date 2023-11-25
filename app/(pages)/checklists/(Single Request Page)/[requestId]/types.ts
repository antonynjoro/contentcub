export type Question = {
    id: string;
    type: PrismaQuestionType;
    title: string;
    description?: string;
    multiAnswer?: boolean;
    answers: string[];
    createdAt: Date;
};



enum PrismaQuestionType {
    TEXT_SHORT = 'textShort',
    TEXT_LONG = 'textLong',
    IMAGE_UPLOAD = 'imageUpload',
    IMAGE_UPLOAD_MULTIPLE = 'imageUploadMultiple',
    FILE_UPLOAD = 'fileUpload',
}



