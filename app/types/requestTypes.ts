import { Question } from './questionTypes';
import { User } from './userTypes';
import { Client } from './clientTypes';

export type RequestModel = {
    id: string;
    title: string;
    status: 'draft' | 'sent' | 'answered' | 'closed';
    questions: Question[]; // Already defined
    user: User; // Already defined
    userId: string;
    clientIds: string[];
    clients: Client[]; // Already defined
    createdAt: Date;
    updatedAt: Date;
  };
  