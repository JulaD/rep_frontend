import { IFAQ } from '../interfaces/faq.interface';

export class FAQ implements IFAQ {
  id: number;

  question: string;

  answer: string;

  createdAt: Date;
}
