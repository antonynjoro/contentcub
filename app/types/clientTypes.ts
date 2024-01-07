import { User } from "./userTypes";
import { RequestModel } from "./requestTypes";

export type Client = {
    id: string;
    externalId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    requestIds: string[];
    requests: RequestModel[]; // To be defined
    user: User; // Already defined
    userId: string;
    attributes?: any; // Replace with the correct type if needed
    createdAt: Date;
    updatedAt: Date;
  };
  