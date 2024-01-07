
import { Client } from "./clientTypes";
import { RequestModel } from "./requestTypes";
export type User = {
    id: string;
    externalId: string;
    email: string;
    firstName: string;
    lastName: string;
    clients: Client[]; // To be defined
    requests: RequestModel[]; // To be defined
    attributes: any; // Replace with the correct type if needed
    createdAt: Date;
    updatedAt: Date;
  };
  